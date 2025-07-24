import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ appointments: [] }, { status: 401 });
  }
  const appointments = await prisma.appointment.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json({ appointments });
} 