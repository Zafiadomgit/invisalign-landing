import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, nombre, apellido, phone, status } = await req.json();
    if (!email || !password || !nombre || !apellido || !phone) {
      return NextResponse.json({ message: "Faltan campos obligatorios" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashed,
        nombre,
        apellido,
        phone,
        status: status || null,
        role: "user",
      },
    });

    // Enviar correo de bienvenida
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "¡Gracias por registrarte!",
      html: `<p>¡Gracias por registrarte en IPS Mónica Botero! Pronto nos pondremos en contacto contigo.</p>`
    });

    return NextResponse.json({ message: "Usuario registrado correctamente" });
  } catch (e) {
    return NextResponse.json({ message: "Error en el registro" }, { status: 500 });
  }
} 