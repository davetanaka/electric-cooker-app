import Link from "next/link";

/**
 * フッターコンポーネント
 * サイトの情報ポリシーと透明性を明示
 */
export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* サイト情報 */}
          <div>
            <h3 className="text-sm font-semibold mb-3">電気調理鍋 比較ガイド</h3>
            <p className="text-sm text-muted-foreground">
              消費者のための中立的な横断比較サイト。
              アフィリエイトリンクは一切使用していません。
            </p>
          </div>

          {/* ナビゲーション */}
          <div>
            <h3 className="text-sm font-semibold mb-3">ナビゲーション</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/compare" className="hover:text-foreground transition-colors">
                  製品比較
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-foreground transition-colors">
                  AIに相談
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  このサイトについて
                </Link>
              </li>
            </ul>
          </div>

          {/* 情報ポリシー */}
          <div>
            <h3 className="text-sm font-semibold mb-3">情報ポリシー</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>各社公式サイトの公開情報を使用</li>
              <li>数値には出典を明記</li>
              <li>特定メーカーの優遇・批判なし</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} 電気調理鍋 比較ガイド.
            このサイトは個人プロジェクトです。
          </p>
        </div>
      </div>
    </footer>
  );
}
