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

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// PrismaClientのインスタンスを作成（既にglobalに存在する場合はそれを再利用）
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // クエリをコンソールにログ出力（オプション）
  });

// 開発環境ではグローバル変数に保存して次回以降再利用、本番ではグローバルに保持しない
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
