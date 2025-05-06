import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature")!;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!endpointSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is missing" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid signature", details: err },
      { status: 400 }
    );
  }


  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            { expand: ["line_items", "customer"] } // Expand customer
        );

        if (!session.customer || !session.line_items?.data?.[0]?.price?.id) {
            console.error("Missing data in session:", session);
            break;
        }

        await handleCheckoutSessionCompleted({ session, stripe });
        break;

      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription deleted:", subscription);

        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted({ subscriptionId, stripe });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      {
        error: "Failed to trigger webhook",
        details: err,
      },
      {
        status: 500,
      }
    );
  }
};
