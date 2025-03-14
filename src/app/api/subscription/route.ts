import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
});

export async function GET() {
  try {
    const customer = await stripe.customers.retrieve("customer_id");
    if (customer.deleted) {
      throw new Error("Customer is deleted");
    }

    const subscriptions = (customer as Stripe.Customer).subscriptions;
    if (!subscriptions || !subscriptions.data[0]) {
      throw new Error("No subscriptions found for the customer");
    }
    const subscription = await stripe.subscriptions.retrieve(
      subscriptions.data[0].id
    );

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
