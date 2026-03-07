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

  // プレースホルダーの背景色（製品IDに基づいて一意の色を生成）
  const getBackgroundColor = (id: string) => {
    const colors = [
      "bg-blue-100 dark:bg-blue-900/30",
      "bg-green-100 dark:bg-green-900/30",
      "bg-purple-100 dark:bg-purple-900/30",
      "bg-orange-100 dark:bg-orange-900/30",
      "bg-pink-100 dark:bg-pink-900/30",
      "bg-teal-100 dark:bg-teal-900/30",
    ];
    const index = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  // エラー時またはプレースホルダー
  if (hasError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-lg",
          sizeClasses[size],
          getBackgroundColor(productId),
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
        getBackgroundColor(productId),
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
