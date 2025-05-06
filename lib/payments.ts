import Stripe from "stripe";
import { getDBConnection } from "./db";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  console.log("Subscription deleted:", subscriptionId);
  
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDBConnection();

    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;

    console.log("User status updated to 'cancelled' for subscription:", subscriptionId);

  } catch (error) {
    console.error("Error handling subscription deletion:", error);
    throw error
  }

}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  console.log("Checkout session completed:", session);
  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  if (!customerId) {
    throw new Error("Customer ID is missing in the session data");
  }

  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && priceId) {
    const { email, name } = customer as Stripe.Customer;

    const sql = await getDBConnection();

    await createOrUpdateUser({
      sql,
      email: email as string,
      fullName: name as string,
      customerId,
      priceId: priceId as string,
      status: "active",
    });

    await createPayment({
      sql,
      session,
      priceId: priceId as string,
      userEmail: email as string,
    });
  }
}

async function createOrUpdateUser({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  sql: any;
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      // Create a new user
      const newUser =
        await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
      console.log("New user created:", newUser);
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  userEmail,
}: {
  sql: any;
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const { amount_total, id, customer_email, status } = session;
    const payment =
      await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
    console.log("Payment created:", payment);
  } catch (error) {
    console.error("Error creating payment:", error);
  }
}
