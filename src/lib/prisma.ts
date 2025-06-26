/**
 * PrismaClientのグローバルインスタンスを作成する
 * デフォルトでは、PrismaClientはデフォルトではシングルトンであるため、
 * 複数のインスタンスを作成することはできない。
 * そのため、グローバルインスタンスを作成することで、
 * 複数のインスタンスを作成することができる。
 * Next.jsの開発環境ではホットリロードが頻発し、
 * 毎回インスタンスが作られてDB接続が増えすぎる問題を防ぐために使う。
 */

import { PrismaClient } from "@prisma/client";

// globalThis: ブラウザでもNode.jsでも使えるグローバルスコープ
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

/**
 * 開発環境（dev）でのみグローバルにインスタンスを保持し、
 * ホットリロード時に再利用するようにしている。
 * 本番環境では意図しない状態保持を避けるためにグローバルには保存しない
 */
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
