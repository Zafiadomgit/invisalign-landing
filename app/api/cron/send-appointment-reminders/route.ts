import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const pendientes = await prisma.appointment.findMany({
    where: {
      estado: 'pendiente',
      recordatorioEnviado: false,
      createdAt: { lte: twoHoursAgo },
    },
  });

  if (pendientes.length === 0) {
    return NextResponse.json({ message: 'No hay citas pendientes para enviar recordatorio.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let enviados = 0;
  for (const cita of pendientes) {
    const mailOptions = {
      from: `IPS Mónica Botero <${process.env.EMAIL_USER}>`,
      to: cita.email,
      subject: '¡No olvides completar tu agendamiento! IPS Mónica Botero',
      html: `
        <h2 style=\"color:#021D49;\">¡Estás a un paso de mejorar tu salud oral!</h2>
        <p>Hola <b>${cita.nombre} ${cita.apellido}</b>,</p>
        <p>Notamos que no completaste el pago para tu cita con el motivo: <b>${cita.motivo}</b>.</p>
        <p>¡Anímate! Solo falta un paso para asegurar tu espacio y transformar tu sonrisa.</p>
        <p><b>Fecha y hora solicitada:</b> ${new Date(cita.fecha).toLocaleString('es-CO')}</p>
        <p><b>Valor de la consulta:</b> $${cita.precio.toLocaleString('es-CO')} COP</p>
        <p>Si necesitas ayuda o tienes dudas, contáctanos.<br/>Te esperamos en IPS Mónica Botero S.A.S</p>
        <p style=\"color:#FFB4AB; font-weight:bold;\">¡No dejes pasar esta oportunidad!</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    await prisma.appointment.update({
      where: { id: cita.id },
      data: { recordatorioEnviado: true },
    });
    enviados++;
  }
  return NextResponse.json({ enviados });
} 