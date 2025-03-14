import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing Stripe webhook secret");
}

export async function POST(request: Request) {
  const event = stripe.webhooks.constructEvent(
    await request.text(),
    request.headers.get("stripe-signature") || "",
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "checkout.session.completed") {
    // Atualize o status da assinatura no banco de dados
  }

  return NextResponse.json({ received: true });
}
