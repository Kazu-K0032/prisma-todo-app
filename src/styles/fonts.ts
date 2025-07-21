import { Geist, Geist_Mono } from "next/font/google";

// Googleフォント「Geist Sans」と「Geist Mono」を読み込み、CSSカスタムプロパティに設定
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
