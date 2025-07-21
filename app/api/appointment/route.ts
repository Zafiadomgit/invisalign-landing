import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CLINIC_EMAIL = "odontoesteticabogota@gmail.com";
const CLINIC_PLACE = "Edificio Acocentro 118 - 18 piso 4, consultorio 406";

export async function POST(req: Request) {
  try {
    const { nombre, apellido, telefono, email, motivo, fecha } = await req.json();
    if (!nombre || !apellido || !telefono || !email || !motivo || !fecha) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Guardar en la base de datos
    await prisma.appointment.create({
      data: {
        nombre,
        apellido,
        telefono,
        email,
        motivo,
        fecha,
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

    // Email a la clínica
    const clinicMailOptions = {
      from: `IPS Mónica Botero <${process.env.EMAIL_USER}>`,
      to: CLINIC_EMAIL,
      subject: `Nueva cita agendada: ${nombre} ${apellido}`,
      html: `
        <h2 style="color:#021D49;">Nueva cita agendada</h2>
        <table style="border-collapse:collapse;">
          <tr><td><b>Nombre:</b></td><td>${nombre}</td></tr>
          <tr><td><b>Apellido:</b></td><td>${apellido}</td></tr>
          <tr><td><b>Email:</b></td><td>${email}</td></tr>
          <tr><td><b>Teléfono:</b></td><td>${telefono}</td></tr>
          <tr><td><b>Motivo:</b></td><td>${motivo}</td></tr>
          <tr><td><b>Fecha y hora:</b></td><td>${fecha}</td></tr>
          <tr><td><b>Lugar:</b></td><td>${CLINIC_PLACE}</td></tr>
        </table>
        <p style="color:#FFB4AB;">Por favor, confirme la cita con el paciente.</p>
      `,
    };

    // Email de confirmación al paciente
    const patientMailOptions = {
      from: `IPS Mónica Botero <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmación de tu cita - IPS Mónica Botero",
      html: `
        <h2 style="color:#021D49;">¡Gracias por agendar tu cita!</h2>
        <p>Hola <b>${nombre} ${apellido}</b>,</p>
        <p>Tu cita ha sido registrada exitosamente. Estos son los detalles:</p>
        <table style="border-collapse:collapse;">
          <tr><td><b>Fecha y hora:</b></td><td>${fecha}</td></tr>
          <tr><td><b>Lugar:</b></td><td>${CLINIC_PLACE}</td></tr>
        </table>
        <p>Motivo de la consulta: <b>${motivo}</b></p>
        <p style="margin-top:16px;">Te esperamos en nuestra clínica.<br/>Cualquier duda, contáctanos.<br/><br/>IPS Mónica Botero S.A.S</p>
      `,
    };

    // Enviar emails
    await transporter.sendMail(clinicMailOptions);
    await transporter.sendMail(patientMailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en /api/appointment:", error);
    return NextResponse.json({ error: "Error al agendar la cita" }, { status: 500 });
  }
} 