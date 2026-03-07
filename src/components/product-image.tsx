"use client";

import { useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  productId: string;
  productName: string;
  manufacturer: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * 製品画像コンポーネント
 * 画像がない場合はプレースホルダーを表示
 */
export function ProductImage({
  productId,
  productName,
  manufacturer,
  className,
  size = "md",
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  // サイズに応じたクラス
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-32 w-32",
    lg: "h-48 w-48",
  };

  // 画像パス
  const imagePath = `/images/products/${productId}.png`;

  // エラー時またはプレースホルダー
  if (hasError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-lg bg-muted",
          sizeClasses[size],
          className
        )}
      >
        <Package className="h-8 w-8 text-muted-foreground mb-1" />
        <span className="text-xs text-muted-foreground text-center px-2 line-clamp-2">
          {manufacturer}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={imagePath}
        alt={`${manufacturer} ${productName}`}
        fill
        className="object-contain p-2"
        onError={() => setHasError(true)}
        sizes={size === "lg" ? "192px" : size === "md" ? "128px" : "64px"}
      />
    </div>
  );
}

/**
 * 製品画像プレースホルダー（画像なしバージョン）
 */
export function ProductImagePlaceholder({
  productName,
  manufacturer,
  className,
  size = "md",
}: Omit<ProductImageProps, "productId">) {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-32 w-32",
    lg: "h-48 w-48",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg bg-muted",
        sizeClasses[size],
        className
      )}
    >
      <Package className="h-8 w-8 text-muted-foreground mb-1" />
      <span className="text-xs text-muted-foreground text-center px-2 line-clamp-2">
        {manufacturer}
      </span>
    </div>
  );
}
