import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email e senha são obrigatórios" },
      { status: 400 }
    );
  }

  const existingUser: User | null = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ message: "Usuário já existe" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
