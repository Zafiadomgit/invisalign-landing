import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ users: [] }, { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: {
      id: true,
      nombre: true,
      apellido: true,
      email: true,
      phone: true,
      role: true,
    },
    orderBy: { id: "asc" },
  });
  return NextResponse.json({ users });
} 