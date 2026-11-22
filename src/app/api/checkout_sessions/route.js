import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const authSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!authSession) {
      return NextResponse.redirect(new URL("/signin", request.url), 303);
    }

    const role = authSession.user.role?.toLowerCase();
    const priceIdByRole = {
      tutor: "price_1Ueah9KzlM8KjuJizex5J6CH",
      student: "price_1UeahaKzlM8KjuJiRy9PeSIw",
    };
    const priceId = priceIdByRole[role];

    if (!priceId) {
      return NextResponse.json(
        { error: "Only student and tutor accounts can purchase Pro." },
        { status: 403 },
      );
    }

    const origin = new URL(request.url).origin;

    const checkoutSession = await stripe.checkout.sessions.create({
      client_reference_id: authSession.user.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: authSession.user.id,
        role,
      },
      mode: "subscription",
      subscription_data: {
        metadata: {
          userId: authSession.user.id,
          role,
        },
      },
      success_url: `${origin}/api/checkout_sessions/confirm?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payments/checkout/cancel?role=${role}`,
    });
    return NextResponse.redirect(checkoutSession.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
