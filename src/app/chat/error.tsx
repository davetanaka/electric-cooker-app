"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

/**
 * チャットページ用 Error Boundary
 */
export default function ChatError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 mb-6">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold mb-2">チャットの読み込みに失敗しました</h2>
      <p className="text-muted-foreground mb-6">
        AIチャット機能の初期化中にエラーが発生しました。再試行してください。
      </p>
      <Button onClick={reset}>
        <RefreshCw className="h-4 w-4 mr-2" />
        再試行
      </Button>
    </div>
  );
}
