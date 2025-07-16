import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ message: "Email requerido" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ message: "Si el email existe, recibirás un enlace de recuperación" });

  // Generar token y expiración (1 hora)
  const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  await prisma.user.update({
    where: { email },
    data: { status: `reset:${token}:${expires.toISOString()}` },
  });

  // Enviar email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });
  const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/reset?token=${token}&email=${encodeURIComponent(email)}`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Recupera tu contraseña",
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Este enlace expirará en 1 hora.</p>`
  });

  return NextResponse.json({ message: "Si el email existe, recibirás un enlace de recuperación" });
} 