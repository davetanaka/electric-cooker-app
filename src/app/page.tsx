import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import {
  Search,
  MessageCircle,
  ShieldCheck,
  BarChart3,
  Users,
  Sparkles,
} from "lucide-react";

/**
 * トップページ
 * 電気調理鍋横断比較アプリのランディングページ
 */
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-linear-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* キャッチコピー */}
            <div className="mb-6 inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm">
              <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
              <span>アフィリエイトリンクなし・中立的な比較</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              カタログに載っていない情報も含めた、
              <span className="text-primary">消費者のための横断比較</span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              電気調理鍋6社の製品を、公式スペックとSNS・コミュニティの生の声、
              両面から比較。自分に合った1台を、納得して選べます。
            </p>

            {/* CTAボタン */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <LinkButton
                href="/compare"
                size="lg"
                className="h-12 px-8"
              >
                <Search className="mr-2 h-5 w-5" />
                条件で絞り込む
              </LinkButton>
              <LinkButton
                href="/chat"
                variant="outline"
                size="lg"
                className="h-12 px-8"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                AIに相談する
              </LinkButton>
            </div>
          </div>
        </div>

        {/* 装飾用のグラデーション */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
      </section>

      {/* 対象製品セクション */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
            比較対象 6社の電気調理鍋
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              "シャープ ヘルシオ（ホットクック）",
              "パナソニック ビストロ",
              "ティファール クックフォーミー",
              "アイリスオーヤマ ヘルシープラス",
              "象印 STAN.",
              "サーモス シャトルシェフ",
            ].map((brand) => (
              <span
                key={brand}
                className="text-sm font-medium text-muted-foreground md:text-base"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              このサイトでできること
            </h2>
            <p className="text-muted-foreground">
              店頭にカタログがない、ネットはアフィリエイト記事ばかり。
              そんな課題を解決する3つの機能を提供します。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 機能カード1: スペック横断比較 */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">スペック横断比較</h3>
                <p className="text-muted-foreground">
                  6社の公式スペック約30項目を統一フォーマットで表示。
                  圧力、容量、Wi-Fi、価格帯などで簡単に比較できます。
                </p>
              </CardContent>
            </Card>

            {/* 機能カード2: 生の声 */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  SNS・コミュニティの生の声
                </h3>
                <p className="text-muted-foreground">
                  カタログに載っていない購入後の情報。メンテナンス実態、
                  よくある不満点、ユーザーコミュニティの規模など。
                </p>
              </CardContent>
            </Card>

            {/* 機能カード3: AIチャット */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">AIに相談</h3>
                <p className="text-muted-foreground">
                  「3人家族で圧力必須、予算3万円」のような自然言語で質問。
                  6社のデータを踏まえて、あなたに合う候補を提示します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 情報ポリシーセクション */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-green-600" />
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              中立的な情報をお届けします
            </h2>
            <p className="mb-8 text-muted-foreground">
              このサイトは個人プロジェクトです。
              メーカーからの報酬や広告収入は一切受け取っていません。
            </p>

            <div className="grid gap-4 text-left md:grid-cols-3">
              <div className="rounded-lg border bg-background p-4">
                <p className="font-medium">公開情報のみ使用</p>
                <p className="text-sm text-muted-foreground">
                  各社公式サイト・公開スペック・公開SNS情報
                </p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <p className="font-medium">出典を明記</p>
                <p className="text-sm text-muted-foreground">
                  すべての数値にはデータの出所を記載
                </p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <p className="font-medium">アフィリエイトなし</p>
                <p className="text-sm text-muted-foreground">
                  購入リンクや広告は一切掲載しません
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最終CTAセクション */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            納得の1台を見つけよう
          </h2>
          <p className="mb-8 text-muted-foreground">
            条件で絞り込むか、AIに相談して、あなたにぴったりの電気調理鍋を探しましょう。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <LinkButton
              href="/compare"
              size="lg"
              className="h-12 px-8"
            >
              <Search className="mr-2 h-5 w-5" />
              製品を比較する
            </LinkButton>
            <LinkButton
              href="/chat"
              variant="outline"
              size="lg"
              className="h-12 px-8"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              AIに相談する
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
