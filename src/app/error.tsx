"use client";

import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { AlertCircle, RefreshCw } from "lucide-react";

/**
 * グローバル Error Boundary
 * ページレベルのエラーをキャッチしてフォールバックUIを表示
 */
export default function Error({
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
      <h2 className="text-2xl font-bold mb-2">エラーが発生しました</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        ページの読み込み中に問題が発生しました。再試行するか、トップページに戻ってください。
      </p>
      <div className="flex gap-3 justify-center">
        <Button onClick={reset}>
          <RefreshCw className="h-4 w-4 mr-2" />
          再試行
        </Button>
        <LinkButton variant="outline" href="/">
          トップに戻る
        </LinkButton>
      </div>
    </div>
  );
}
