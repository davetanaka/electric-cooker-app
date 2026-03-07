"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  productId: string;
  size?: "sm" | "default" | "lg" | "icon";
  showLabel?: boolean;
  className?: string;
}

/**
 * お気に入りボタンコンポーネント
 * クリックでお気に入りの追加/削除を切り替え
 */
export function FavoriteButton({
  productId,
  size = "icon",
  showLabel = false,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  const favorite = isFavorite(productId);

  // ハイドレーション対策: ロード前は空の状態を表示
  if (!isLoaded) {
    return (
      <Button
        variant="ghost"
        size={size}
        className={cn("text-muted-foreground", className)}
        disabled
      >
        <Heart className="h-4 w-4" />
        {showLabel && <span className="ml-2">お気に入り</span>}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(
        favorite
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-red-500",
        className
      )}
      onClick={() => toggleFavorite(productId)}
      aria-label={favorite ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <Heart
        className={cn("h-4 w-4", favorite && "fill-current")}
      />
      {showLabel && (
        <span className="ml-2">
          {favorite ? "お気に入り済み" : "お気に入り"}
        </span>
      )}
    </Button>
  );
}
