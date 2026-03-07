import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@/components/google-analytics";
import { CompareProvider } from "@/contexts/CompareContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "電気調理鍋 比較ガイド | 6社横断比較",
    template: "%s | 電気調理鍋 比較ガイド",
  },
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
    siteName: "電気調理鍋 比較ガイド",
  },
  twitter: {
    card: "summary_large_image",
    title: "電気調理鍋 比較ガイド | 6社横断比較",
    description:
      "カタログに載っていない情報も含めた、消費者のための横断比較",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CompareProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
