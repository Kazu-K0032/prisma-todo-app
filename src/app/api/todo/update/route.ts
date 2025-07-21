import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { id, title, description } = await req.json();
  const todo = await prisma.todo.update({
    where: { id },
    data: {
      title,
      description,
      updated_at: new Date(),
    },
  });
  return NextResponse.json(todo);
}
