import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia", // Você pode especificar a versão da API aqui
});

interface RequestBody {
  priceId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { priceId } = (await request.json()) as RequestBody;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.DOMAIN}/subscription?success=true`,
      cancel_url: `${process.env.DOMAIN}/subscription?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
