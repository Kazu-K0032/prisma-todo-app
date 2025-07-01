import { PrismaClient } from "@prisma/client";

// DBに接続したPrismaインスタンスの生成
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// グローバル変数に保存することで、ホットリロード時にインスタンスが再生成されるのを防ぐ
export default prisma;
