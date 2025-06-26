import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";  // グローバルスタイルを適用

// Googleフォント「Geist Sans」と「Geist Mono」を読み込み、CSSカスタムプロパティに設定
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// メタデータの定義（ページタイトルや説明）
export const metadata: Metadata = {
  title: "Todoアプリ",
  description: "PrismaとNext.jsで作成したTodoアプリ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
