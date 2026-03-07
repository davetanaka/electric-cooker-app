import { ComparePageContent } from "@/components/products/ComparePageContent";

export const metadata = {
  title: "製品比較 | 電気調理鍋 比較ガイド",
  description:
    "電気調理鍋6社の製品を横断比較。価格、容量、機能、コミュニティ評価を一覧で確認できます。",
};

/**
 * 製品比較・フィルター画面
 * PRD 8.2 に基づく実装
 */
export default function ComparePage() {
  return <ComparePageContent />;
}
