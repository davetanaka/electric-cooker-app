import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "電気調理鍋 比較ガイド | 6社横断比較",
  description:
    "電気調理鍋6社（ホットクック、ビストロ、クックフォーミー等）を公式スペックとSNS・コミュニティの生の声で横断比較。アフィリエイトなしの中立的な情報で、納得の1台を選べます。",
  keywords: [
    "電気調理鍋",
    "ホットクック",
    "オートクッカー",
    "ビストロ",
    "クックフォーミー",
    "比較",
    "おすすめ",
  ],
  openGraph: {
    title: "電気調理鍋 比較ガイド | 6社横断比較",
    description:
      "カタログに載っていない情報も含めた、消費者のための横断比較",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
