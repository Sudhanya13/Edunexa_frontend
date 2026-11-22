import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth, db } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

const successfulSubscriptionStatuses = new Set(["active", "trialing"]);

export async function GET(request) {
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!authSession) {
    return NextResponse.redirect(new URL("/signin", request.url), 303);
  }

  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing Stripe Checkout Session ID." },
      { status: 400 },
    );
  }

  try {
    const checkoutSession =
      await stripe.checkout.sessions.retrieve(sessionId);
    const role = authSession.user.role?.toLowerCase();

    if (
      checkoutSession.client_reference_id !== authSession.user.id ||
      checkoutSession.mode !== "subscription" ||
      !["paid", "no_payment_required"].includes(
        checkoutSession.payment_status,
      ) ||
      !["student", "tutor"].includes(role) ||
      checkoutSession.metadata?.role !== role ||
      !checkoutSession.subscription
    ) {
      return NextResponse.json(
        { error: "This checkout session is not valid for this account." },
        { status: 403 },
      );
    }

    const subscriptionId =
      typeof checkoutSession.subscription === "string"
        ? checkoutSession.subscription
        : checkoutSession.subscription.id;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (!successfulSubscriptionStatuses.has(subscription.status)) {
      return NextResponse.json(
        { error: "The subscription is not active yet." },
        { status: 409 },
      );
    }

    const userId = authSession.user.id;
    const userFilter = ObjectId.isValid(userId)
      ? { _id: new ObjectId(userId) }
      : { _id: userId };
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    const userUpdate = await db.collection("user").updateOne(userFilter, {
      $set: {
        plan: "pro",
        subscriptionStatus: subscription.status,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
        updatedAt: new Date(),
      },
    });

    if (userUpdate.matchedCount !== 1) {
      throw new Error("The signed-in user was not found in the database.");
    }

    await db.collection("payments").updateOne(
      { stripeSessionId: checkoutSession.id },
      {
        $setOnInsert: {
          userId,
          role,
          stripeSessionId: checkoutSession.id,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscription.id,
          amount: (checkoutSession.amount_total || 0) / 100,
          currency: checkoutSession.currency,
          status: checkoutSession.payment_status,
          paymentDate: new Date(),
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    const successUrl = new URL("/payments/checkout/success", request.url);
    successUrl.searchParams.set("session_id", checkoutSession.id);
    return NextResponse.redirect(successUrl, 303);
  } catch (error) {
    console.error("Failed to confirm Stripe Checkout Session.", error);
    return NextResponse.json(
      { error: "Payment confirmation failed. Please contact support." },
      { status: 500 },
    );
  }
}
