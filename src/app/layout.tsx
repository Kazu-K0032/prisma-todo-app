import type { Metadata } from "next";
import "@/styles/globals.css";
import { geistSans, geistMono } from "@/styles/fonts";

// メタデータの定義（ページタイトルや説明）
export const metadata: Metadata = {
  title: "Todoアプリ",
  description: "PrismaとNext.jsで作成したTodoアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
