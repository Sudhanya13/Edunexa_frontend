// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
// import { db } from "@/lib/auth";
// import { stripe } from "@/lib/stripe";

// const grantedStatuses = new Set(["active", "trialing"]);
// const revokedStatuses = new Set([
//   "canceled",
//   "incomplete_expired",
//   "paused",
//   "unpaid",
// ]);

// async function syncSubscription(subscription, fallbackUserId) {
//   const userId = subscription.metadata?.userId || fallbackUserId;

//   if (!userId || !ObjectId.isValid(userId)) {
//     throw new Error("Stripe subscription is missing a valid Edunexa user ID.");
//   }

//   const update = {
//     subscriptionStatus: subscription.status,
//     stripeCustomerId:
//       typeof subscription.customer === "string"
//         ? subscription.customer
//         : subscription.customer.id,
//     stripeSubscriptionId: subscription.id,
//   };

//   if (grantedStatuses.has(subscription.status)) {
//     update.plan = "pro";
//   } else if (revokedStatuses.has(subscription.status)) {
//     update.plan = "free";
//   }

//   const result = await db.collection("user").updateOne(
//     { _id: new ObjectId(userId) },
//     { $set: update },
//   );

//   if (result.matchedCount !== 1) {
//     throw new Error(`No Edunexa user found for Stripe user ID ${userId}.`);
//   }
// }

// export async function POST(request) {
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
//   if (!webhookSecret) {
//     console.error("STRIPE_WEBHOOK_SECRET is not configured.");
//     return NextResponse.json(
//       { error: "Stripe webhook is not configured." },
//       { status: 500 },
//     );
//   }

//   const signature = request.headers.get("stripe-signature");
//   if (!signature) {
//     return NextResponse.json(
//       { error: "Missing Stripe signature." },
//       { status: 400 },
//     );
//   }

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       await request.text(),
//       signature,
//       webhookSecret,
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: `Invalid Stripe webhook signature: ${error.message}` },
//       { status: 400 },
//     );
//   }

//   try {
//     if (event.type === "checkout.session.completed") {
//       const checkoutSession = event.data.object;
//       if (
//         checkoutSession.mode === "subscription" &&
//         checkoutSession.subscription
//       ) {
//         const subscriptionId =
//           typeof checkoutSession.subscription === "string"
//             ? checkoutSession.subscription
//             : checkoutSession.subscription.id;
//         const subscription =
//           await stripe.subscriptions.retrieve(subscriptionId);
//         await syncSubscription(
//           subscription,
//           checkoutSession.client_reference_id ||
//             checkoutSession.metadata?.userId,
//         );
//       }
//     } else if (
//       event.type === "customer.subscription.updated" ||
//       event.type === "customer.subscription.deleted"
//     ) {
//       const eventSubscription = event.data.object;
//       const subscription = await stripe.subscriptions.retrieve(
//         eventSubscription.id,
//       );
//       await syncSubscription(subscription);
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Failed to process Stripe webhook event.", error);
//     return NextResponse.json(
//       { error: "Failed to process Stripe webhook event." },
//       { status: 500 },
//     );
//   }
// }

import { ObjectId } from "mongodb";
import { db } from "@/lib/auth";

const grantedStatuses = new Set(["active", "trialing"]);

const revokedStatuses = new Set([
  "canceled",
  "incomplete_expired",
  "paused",
  "unpaid",
]);

async function syncSubscription(subscription, fallbackUserId) {
  const userId = subscription.metadata?.userId || fallbackUserId;

  if (!userId) {
    throw new Error("User ID not found in subscription metadata");
  }

  const userFilter = ObjectId.isValid(userId)
    ? {
        $or: [{ _id: new ObjectId(userId) }, { _id: userId }],
      }
    : { _id: userId };

  const updateFields = {
    subscriptionStatus: subscription.status,
    stripeCustomerId: subscription.customer,
    stripeSubscriptionId: subscription.id,
  };

  if (grantedStatuses.has(subscription.status)) {
    updateFields.plan = "pro";
  } else if (revokedStatuses.has(subscription.status)) {
    updateFields.plan = "free";
  }

  const result = await db
    .collection("user")
    .updateOne(userFilter, { $set: updateFields });

  if (result.matchedCount === 0) {
    throw new Error(`User not found for ID: ${userId}`);
  }
}
