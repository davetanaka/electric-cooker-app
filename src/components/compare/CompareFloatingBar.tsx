"use client";

import { useCompare } from "@/hooks/useCompare";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { GitCompare, X } from "lucide-react";

/**
 * 比較リストのフローティングバー
 * 製品が選択されている場合に画面下部に表示
 */
export function CompareFloatingBar() {
  const { compareList, removeFromCompare, clearCompare, isLoaded } = useCompare();

  // ローディング中または比較リストが空の場合は表示しない
  if (!isLoaded || compareList.length === 0) {
    return null;
  }

  // 比較対象の製品データを取得
  const compareProducts = products.filter((p) => compareList.includes(p.id));

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <div className="bg-background border rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <GitCompare className="h-5 w-5 text-blue-500 shrink-0" />
            <span className="text-sm font-medium">
              {compareList.length}/3 製品選択中
            </span>
            <div className="flex items-center gap-2">
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
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clearCompare}>
              クリア
            </Button>
            <LinkButton size="sm" href="/side-by-side">
              <GitCompare className="h-4 w-4 mr-2" />
              比較する
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
