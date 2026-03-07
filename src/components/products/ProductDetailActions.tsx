"use client";

import { FavoriteButton } from "@/components/favorite-button";
import { CompareButton } from "@/components/compare-button";
import { ShareButtons } from "@/components/share-buttons";

interface ProductDetailActionsProps {
  productId: string;
  productName: string;
}

/**
 * 製品詳細ページのアクションボタン（クライアントコンポーネント）
 * お気に入りボタン、比較ボタン、シェアボタンなど
 */
export function ProductDetailActions({ productId, productName }: ProductDetailActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <CompareButton productId={productId} showLabel size="default" />
      <FavoriteButton productId={productId} showLabel size="default" />
      <ShareButtons title={`${productName} | 電気調理鍋 比較ガイド`} />
    </div>
  );
}
