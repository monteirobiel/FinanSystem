import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Inicialize o Stripe com sua chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

// URL base para seu site - defina um valor padrão caso a variável de ambiente não esteja disponível
const BASE_URL = process.env.DOMAIN || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "PriceId é obrigatório" },
        { status: 400 }
      );
    }

    // Criação da sessão do checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      // URLs completas e fixas aqui
      success_url: `${BASE_URL}/subscription?success=true`,
      cancel_url: `${BASE_URL}/subscription?canceled=true`,
    });

    console.log("Sessão criada:", session.id); // Para debug

    // Retorna o sessionId para o frontend
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
