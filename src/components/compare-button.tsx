"use client";

import { GitCompare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/hooks/useCompare";
import { cn } from "@/lib/utils";

interface CompareButtonProps {
  productId: string;
  size?: "sm" | "default" | "lg" | "icon";
  showLabel?: boolean;
  className?: string;
}

/**
 * 比較ボタンコンポーネント
 * クリックで比較リストへの追加/削除を切り替え
 */
export function CompareButton({
  productId,
  size = "icon",
  showLabel = false,
  className,
}: CompareButtonProps) {
  const { isInCompare, toggleCompare, canAdd, isLoaded } = useCompare();

  const inCompare = isInCompare(productId);
  const disabled = !inCompare && !canAdd;

  // ハイドレーション対策: ロード前は空の状態を表示
  if (!isLoaded) {
    return (
      <Button
        variant="ghost"
        size={size}
        className={cn("text-muted-foreground", className)}
        disabled
      >
        <GitCompare className="h-4 w-4" />
        {showLabel && <span className="ml-2">比較に追加</span>}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(
        inCompare
          ? "text-blue-500 hover:text-blue-600"
          : "text-muted-foreground hover:text-blue-500",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => toggleCompare(productId)}
      disabled={disabled}
      aria-label={inCompare ? "比較から削除" : "比較に追加"}
      title={disabled ? "比較は最大3製品までです" : undefined}
    >
      {inCompare ? (
        <Check className="h-4 w-4" />
      ) : (
        <GitCompare className="h-4 w-4" />
      )}
      {showLabel && (
        <span className="ml-2">
          {inCompare ? "比較中" : "比較に追加"}
        </span>
      )}
    </Button>
  );
}
