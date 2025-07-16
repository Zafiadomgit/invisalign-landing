import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, token, password } = await req.json();
  if (!email || !token || !password) return NextResponse.json({ message: "Datos incompletos" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.status?.startsWith("reset:")) return NextResponse.json({ message: "Enlace inválido o expirado" }, { status: 400 });
  const [, savedToken, expires] = user.status.split(":");
  if (savedToken !== token) return NextResponse.json({ message: "Enlace inválido" }, { status: 400 });
  if (new Date() > new Date(expires)) return NextResponse.json({ message: "El enlace ha expirado" }, { status: 400 });
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashed, status: null },
  });
  return NextResponse.json({ message: "Contraseña cambiada con éxito" });
} 