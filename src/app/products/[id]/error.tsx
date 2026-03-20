"use client";

import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

/**
 * 製品詳細ページ用 Error Boundary
 */
export default function ProductError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 mb-6">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold mb-2">製品情報の読み込みに失敗しました</h2>
      <p className="text-muted-foreground mb-6">
        製品データの取得中にエラーが発生しました。
      </p>
      <div className="flex gap-3 justify-center">
        <Button onClick={reset}>
          <RefreshCw className="h-4 w-4 mr-2" />
          再試行
        </Button>
        <LinkButton variant="outline" href="/compare">
          <ArrowLeft className="h-4 w-4 mr-2" />
          製品一覧に戻る
        </LinkButton>
      </div>
    </div>
  );
}
