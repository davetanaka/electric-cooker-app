"use client";

import { useCompare } from "@/hooks/useCompare";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { GitCompare, X, Plus } from "lucide-react";

/**
 * 比較リストのフローティングバー
 * 常に表示され、製品選択状態をリアルタイム反映
 */
export function CompareFloatingBar() {
  const { compareList, removeFromCompare, clearCompare, maxItems } = useCompare();

  // 比較対象の製品データを取得
  const compareProducts = products.filter((p) => compareList.includes(p.id));
  const emptySlots = maxItems - compareList.length;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <div className="bg-background border rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <GitCompare className="h-5 w-5 text-blue-500 shrink-0" />
            <span className="text-sm font-medium">
              {compareList.length}/{maxItems} 製品選択中
            </span>
            <div className="flex items-center gap-2">
              {/* 選択済み製品 */}
              {compareProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-1 bg-muted rounded-full px-2 py-1 text-xs"
                >
                  <span className="truncate max-w-[100px]">
                    {product.specs.basic.productName}
                  </span>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="hover:text-red-500 transition-colors"
                    aria-label={`${product.specs.basic.productName}を削除`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {/* 空きスロット */}
              {Array.from({ length: emptySlots }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="flex items-center gap-1 border border-dashed rounded-full px-2 py-1 text-xs text-muted-foreground"
                >
                  <Plus className="h-3 w-3" />
                  <span>選択</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                クリア
              </Button>
            )}
            <LinkButton
              size="sm"
              href="/side-by-side"
              disabled={compareList.length < 2}
            >
              <GitCompare className="h-4 w-4 mr-2" />
              比較する
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
