import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Define rotas públicas que não precisam de autenticação
const isPublicRoute = createRouteMatcher(["/", "/home", "/login", "/signup"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Força o middleware a permitir acesso direto às rotas públicas sem verificação
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const { userId } = await auth();

  // Para rotas não-públicas, verifica se o usuário está autenticado
  if (!userId) {
    const signInUrl = new URL("/login", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Usuário autenticado, permite acesso às rotas protegidas
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
