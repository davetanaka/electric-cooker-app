import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import {
  ShieldCheck,
  Users,
  Database,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて | 電気調理鍋 比較ガイド",
  description:
    "電気調理鍋 比較ガイドの情報ポリシーと運営について。アフィリエイトなし、中立的な比較情報を提供しています。",
  openGraph: {
    title: "このサイトについて | 電気調理鍋 比較ガイド",
    description:
      "カタログに載っていない情報も含めた、消費者のための横断比較",
    type: "website",
    locale: "ja_JP",
  },
};

/**
 * このサイトについてページ
 * 情報ポリシーと透明性の説明
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* ページヘッダー */}
      <div className="mb-12 text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-green-600 mb-4" />
        <h1 className="text-3xl font-bold mb-4 md:text-4xl">
          このサイトについて
        </h1>
        <p className="text-lg text-muted-foreground">
          消費者のための、中立的な電気調理鍋横断比較サイト
        </p>
      </div>

      {/* ミッション */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">サイトの目的</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              電気調理鍋を買おうとしたとき、こんな経験はありませんか？
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>家電量販店には全メーカーのカタログがない</li>
              <li>ネットの「おすすめ記事」はアフィリエイトリンクだらけ</li>
              <li>公式サイトでは自社製品の良いことしか書いていない</li>
              <li>購入後に「思っていたのと違った」と後悔</li>
            </ul>
            <p>
              このサイトは、そんな課題を解決するために作りました。
              <strong className="text-foreground">
                カタログに載っていない情報も含めた、消費者のための横断比較
              </strong>
              を提供します。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 情報ポリシー */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">情報ポリシー</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold">アフィリエイトなし</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                購入リンクや広告は一切掲載しません。
                特定の製品を買わせるインセンティブがないため、
                中立的な情報を提供できます。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold">公開情報のみ使用</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                各社公式サイト、価格.com、家電量販店サイト、
                公開SNSなど、誰でも確認できる情報のみを使用しています。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold">Layer 2情報の活用</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                公式スペック（Layer 1）だけでなく、
                SNSやコミュニティの評判（Layer 2）も掲載。
                購入後に気づく情報を事前に把握できます。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold">出典を明記</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                すべての数値・評価にはデータの出所を記載。
                情報の透明性を確保し、ユーザー自身で確認できるようにしています。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 対象製品 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">比較対象製品</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              現在、以下6社の電気調理鍋を比較対象としています。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "シャープ ヘルシオ（ホットクック）",
                "パナソニック ビストロ",
                "ティファール クックフォーミー",
                "アイリスオーヤマ ヘルシープラス",
                "シロカ おうちシェフ PRO",
                "象印 STAN.",
              ].map((brand) => (
                <div
                  key={brand}
                  className="text-sm font-medium p-3 rounded-lg bg-muted"
                >
                  {brand}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              ※ データは2026年2月時点の情報です。製品の追加・更新は随時行っています。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTAセクション */}
      <section className="text-center">
        <Card className="bg-muted/30">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-2">
              あなたに合った1台を見つけましょう
            </h2>
            <p className="text-muted-foreground mb-6">
              条件で絞り込むか、AIに相談して、
              納得の電気調理鍋を探しましょう。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <LinkButton href="/compare" size="lg">
                製品を比較する
                <ArrowRight className="ml-2 h-4 w-4" />
              </LinkButton>
              <LinkButton href="/chat" variant="outline" size="lg">
                AIに相談する
                <MessageCircle className="ml-2 h-4 w-4" />
              </LinkButton>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
