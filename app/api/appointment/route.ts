import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PrismaClient, EstadoCita } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { nombre, apellido, telefono, email, motivo, fecha, precio } = await req.json();
    if (!nombre || !apellido || !telefono || !email || !motivo || !fecha || !precio) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Guardar en la base de datos como pendiente
    const cita = await prisma.appointment.create({
      data: {
        nombre,
        apellido,
        telefono,
        email,
        motivo,
        fecha: new Date(fecha),
        precio,
        estado: "pendiente",
        recordatorioEnviado: false,
      },
    });

    // Configurar transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email de confirmación de solicitud (pendiente de pago)
    const userMailOptions = {
      from: `IPS Mónica Botero <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Solicitud de cita recibida - Pendiente de pago",
      html: `
        <h2 style="color:#021D49;">¡Gracias por tu interés en IPS Mónica Botero!</h2>
        <p>Hola <b>${nombre} ${apellido}</b>,</p>
        <p>Hemos recibido tu solicitud para agendar una cita con el motivo: <b>${motivo}</b>.</p>
        <p><b>Fecha y hora solicitada:</b> ${new Date(fecha).toLocaleString("es-CO")}</p>
        <p><b>Valor de la consulta:</b> $${precio.toLocaleString("es-CO")} COP</p>
        <p><b>Estado:</b> <span style="color:#FFB4AB;">Pendiente de pago</span></p>
        <p>Para confirmar tu cita, por favor completa el pago. Te enviaremos el enlace de pago en breve.</p>
        <p style="margin-top:16px;">Si tienes dudas, contáctanos.<br/>IPS Mónica Botero S.A.S</p>
      `,
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en /api/appointment:", error);
    return NextResponse.json({ error: "Error al agendar la cita" }, { status: 500 });
  }
} 