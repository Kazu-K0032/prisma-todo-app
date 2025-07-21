import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
    },
  });
  return NextResponse.json(todo);
}
