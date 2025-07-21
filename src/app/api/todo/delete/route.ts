import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const { ids } = await req.json();
  const idList = Array.isArray(ids) ? ids : [ids];
  await prisma.todo.deleteMany({
    where: { id: { in: idList } },
  });
  // 必ずJSONレスポンスを返す
  return NextResponse.json({ success: true });
}
