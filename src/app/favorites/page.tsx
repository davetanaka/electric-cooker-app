import { FavoritesPageContent } from "@/components/favorites/FavoritesPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お気に入り",
  description:
    "保存した電気調理鍋をまとめて確認できます。気になる製品を比較検討する際にご活用ください。",
  openGraph: {
    title: "お気に入り | 電気調理鍋 比較ガイド",
    description: "保存した電気調理鍋をまとめて確認できます。",
    type: "website",
    locale: "ja_JP",
  },
};

/**
 * お気に入りページ
 * localStorageに保存された製品一覧を表示
 */
export default function FavoritesPage() {
  return <FavoritesPageContent />;
}
