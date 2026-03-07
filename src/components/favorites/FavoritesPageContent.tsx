"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { FavoriteButton } from "@/components/favorite-button";
import { LinkButton } from "@/components/ui/link-button";
import { Heart, Search } from "lucide-react";

/**
 * お気に入りページのコンテンツ
 * localStorageから読み込んだ製品を表示
 */
export function FavoritesPageContent() {
  const { favorites, isLoaded } = useFavorites();

  // お気に入りの製品データを取得
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  // ローディング中
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center text-muted-foreground">
            読み込み中...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500" />
          お気に入り
        </h1>
        <p className="text-muted-foreground mt-2">
          保存した製品をまとめて確認できます
        </p>
      </div>

      {/* お気に入りが空の場合 */}
      {favoriteProducts.length === 0 && (
        <div className="text-center py-16 border rounded-lg bg-muted/30">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            お気に入りがまだありません
          </h2>
          <p className="text-muted-foreground mb-6">
            気になる製品を保存して、後でまとめて比較できます
          </p>
          <LinkButton href="/compare">
            <Search className="mr-2 h-4 w-4" />
            製品を探す
          </LinkButton>
        </div>
      )}

      {/* お気に入り一覧 */}
      {favoriteProducts.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {favoriteProducts.length}件の製品
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="relative">
                <Link href={`/products/${product.id}`} className="block">
                  <ProductCard product={product} />
                </Link>
                <div className="absolute top-2 right-2">
                  <FavoriteButton productId={product.id} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
