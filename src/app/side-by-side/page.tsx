import { SideBySideContent } from "@/components/compare/SideBySideContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "製品を並べて比較",
  description:
    "選択した電気調理鍋を横並びで比較できます。最大3製品まで同時に比較可能です。",
  openGraph: {
    title: "製品を並べて比較 | 電気調理鍋 比較ガイド",
    description: "選択した電気調理鍋を横並びで比較できます。",
    type: "website",
    locale: "ja_JP",
  },
};

/**
 * 横並び比較ページ
 */
export default function SideBySidePage() {
  return <SideBySideContent />;
}
