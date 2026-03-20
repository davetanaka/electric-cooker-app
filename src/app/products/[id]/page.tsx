import { notFound } from "next/navigation";
import { products, getProductById } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { LinkButton } from "@/components/ui/link-button";
import {
  ArrowLeft,
  Check,
  X,
  Minus,
  Star,
  Users,
  MessageCircle,
  Wrench,
  Instagram,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { ProductImage } from "@/components/product-image";
import type { Metadata } from "next";
import type { FeatureSupport, RatingLevel } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * 動的メタデータ生成
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "製品が見つかりません" };
  }

  const title = product.specs.basic.productName;
  const description = `${product.specs.basic.manufacturer} ${product.specs.basic.productName}の詳細スペック（${product.specs.basic.priceRange}）とユーザー評価。${product.community.overallComment}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | 電気調理鍋 比較ガイド`,
      description,
      type: "website",
      locale: "ja_JP",
    },
  };
}

/**
 * 静的パス生成（SSG用）
 */
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

/**
 * 製品詳細ページ
 * PRD 8.4 に基づく実装
 */
export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const { specs, community } = product;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずナビ */}
      <LinkButton
        href="/compare"
        variant="ghost"
        size="sm"
        className="mb-6 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        製品比較に戻る
      </LinkButton>

      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* 製品画像 */}
          <ProductImage
            productId={product.id}
            productName={specs.basic.productName}
            manufacturer={specs.basic.manufacturer}
            size="lg"
            className="mx-auto sm:mx-0"
          />

          {/* 製品情報 */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-muted-foreground mb-1">
                  {specs.basic.manufacturer}
                </p>
                <h1 className="text-3xl font-bold mb-2">
                  {specs.basic.productName}
                </h1>
                <p className="text-muted-foreground mb-4">
                  型番: {specs.basic.modelNumber}
                </p>
              </div>
              <ProductDetailActions productId={product.id} productName={specs.basic.productName} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{specs.basic.productType}</Badge>
              <Badge variant="outline">{specs.basic.priceRange}</Badge>
              <Badge variant="outline">{specs.basic.releaseDate}発売</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* メインコンテンツ（左2カラム） */}
        <div className="lg:col-span-2 space-y-8">
          {/* Layer 1: スペック詳細 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                スペック詳細（Layer 1）
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 基本情報 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                  基本情報
                </h3>
                <Table>
                  <TableBody>
                    <SpecRow label="参考価格（税込）" value={specs.basic.priceRange} />
                    <SpecRow label="発売日" value={specs.basic.releaseDate} />
                    <SpecRow label="カラー" value={specs.basic.colors.join("、")} />
                  </TableBody>
                </Table>
              </div>

              {/* 容量・サイズ */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                  容量・サイズ
                </h3>
                <Table>
                  <TableBody>
                    <SpecRow label="調理容量" value={`${specs.capacity.cookingCapacity}L`} />
                    <SpecRow
                      label="満水容量"
                      value={specs.capacity.fullCapacity ? `${specs.capacity.fullCapacity}L` : "記載なし"}
                    />
                    <SpecRow label="量の目安" value={specs.capacity.servingSize} />
                    <SpecRow
                      label="本体サイズ"
                      value={`${specs.capacity.dimensions.width}×${specs.capacity.dimensions.depth}×${specs.capacity.dimensions.height}mm`}
                    />
                    <SpecRow label="重量" value={`約${specs.capacity.weight}kg`} />
                  </TableBody>
                </Table>
              </div>

              {/* 調理機能 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                  調理機能
                </h3>
                <Table>
                  <TableBody>
                    <SpecRowWithIcon
                      label="圧力調理"
                      supported={specs.features.pressureCooking.supported}
                      details={specs.features.pressureCooking.details}
                    />
                    <SpecRowWithIcon
                      label="かきまぜ機能"
                      supported={specs.features.stirring.supported}
                      details={specs.features.stirring.details}
                    />
                    <SpecRowWithIcon label="無水調理" supported={specs.features.waterless} />
                    <SpecRowWithIcon
                      label="低温調理"
                      supported={specs.features.lowTemp.supported}
                      details={specs.features.lowTemp.tempRange}
                    />
                    <SpecRowWithIcon label="炒め調理" supported={specs.features.stirFry} />
                    <SpecRowWithIcon label="揚げ物" supported={specs.features.deepFry} />
                    <SpecRowFeatureSupport label="蒸し調理" status={specs.features.steaming} />
                    <SpecRowWithIcon label="発酵調理" supported={specs.features.fermentation} />
                    <SpecRowWithIcon
                      label="炊飯"
                      supported={specs.features.riceCooking.supported}
                      details={specs.features.riceCooking.capacity}
                    />
                  </TableBody>
                </Table>
              </div>

              {/* メニュー・レシピ */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                  メニュー・レシピ
                </h3>
                <Table>
                  <TableBody>
                    <SpecRow label="自動メニュー数" value={specs.menu.autoMenuCount} />
                    <SpecRow
                      label="レシピブック"
                      value={specs.menu.recipeBookDetails || (specs.menu.recipeBook ? "付属" : "なし")}
                    />
                  </TableBody>
                </Table>
              </div>

              {/* 便利機能 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                  便利機能
                </h3>
                <Table>
                  <TableBody>
                    <SpecRowWithIcon
                      label="予約調理"
                      supported={specs.convenience.reservation.supported}
                      details={
                        specs.convenience.reservation.maxHours
                          ? `最大${specs.convenience.reservation.maxHours}時間`
                          : null
                      }
                    />
                    <SpecRowWithIcon label="保温機能" supported={specs.convenience.keepWarm} />
                    <SpecRowWithIcon
                      label="Wi-Fi/アプリ連携"
                      supported={specs.convenience.wifi.supported}
                      details={specs.convenience.wifi.appName}
                    />
                    <SpecRowFeatureSupport
                      label="食洗機対応"
                      status={specs.convenience.dishwasherSafe}
                      details={specs.convenience.dishwasherDetails}
                    />
                  </TableBody>
                </Table>
              </div>

              {/* 電源・その他 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                  電源・その他
                </h3>
                <Table>
                  <TableBody>
                    <SpecRow label="消費電力" value={`${specs.power.wattage}W`} />
                    <SpecRow label="電源コード" value={specs.power.cordLength} />
                    <SpecRow label="設定温度範囲" value={specs.power.tempRange || "記載なし"} />
                  </TableBody>
                </Table>
              </div>

              {/* 独自特徴 */}
              <div>
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                  独自技術・特徴
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {specs.uniqueFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Layer 2: コミュニティ情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                コミュニティ・SNS情報（Layer 2）
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 公式コミュニティ */}
              <CommunitySection
                icon={<Users className="h-4 w-4" />}
                title="公式コミュニティ"
                rating={community.officialCommunity.rating}
                description={community.officialCommunity.description}
                points={community.officialCommunity.points}
              />

              {/* SNS活発度 */}
              <CommunitySection
                icon={<MessageCircle className="h-4 w-4" />}
                title="SNS活発度（ユーザー発信）"
                rating={community.snsActivity.rating}
                description={community.snsActivity.description}
                points={community.snsActivity.points}
              />

              {/* インスタ映え度 */}
              <CommunitySection
                icon={<Instagram className="h-4 w-4" />}
                title="インスタ映え度"
                rating={community.instagrammability.rating}
                description={community.instagrammability.description}
                points={community.instagrammability.points}
              />

              {/* お手入れ評判 */}
              <CommunitySection
                icon={<Wrench className="h-4 w-4" />}
                title="お手入れ評判"
                rating={community.maintenanceReputation.rating}
                description={community.maintenanceReputation.description}
                points={community.maintenanceReputation.points}
              />

              {/* 購入後サポート */}
              <CommunitySection
                icon={<Star className="h-4 w-4" />}
                title="購入後サポート・情報量"
                rating={community.postPurchaseSupport.rating}
                description={community.postPurchaseSupport.description}
                points={community.postPurchaseSupport.points}
              />
            </CardContent>
          </Card>
        </div>

        {/* サイドバー（右1カラム） */}
        <div className="space-y-6">
          {/* 総合コメント */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">総合コメント</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {community.overallComment}
              </p>
            </CardContent>
          </Card>

          {/* ターゲットユーザー */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">こんな人におすすめ</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {community.targetUsers.map((user, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
                    <span>{user}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 出典・注意事項 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">データ出典</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Layer 1（スペック）: 各社公式サイト、価格.com、家電量販店サイト
              </p>
              <p>
                Layer 2（評価）: 公開SNS・コミュニティ情報、メディアレビュー
              </p>
              <p className="text-xs">
                ※ 価格・仕様は2026年2月時点の情報です。最新情報は公式サイトをご確認ください。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * スペック行コンポーネント
 */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <TableRow>
      <TableCell className="font-medium w-40">{label}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}

/**
 * スペック行（対応/非対応アイコン付き）
 */
function SpecRowWithIcon({
  label,
  supported,
  details,
}: {
  label: string;
  supported: boolean;
  details?: string | null;
}) {
  return (
    <TableRow>
      <TableCell className="font-medium w-40">{label}</TableCell>
      <TableCell className="flex items-center gap-2">
        {supported ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <X className="h-4 w-4 text-gray-400" />
        )}
        <span>{supported ? (details || "対応") : "非対応"}</span>
      </TableCell>
    </TableRow>
  );
}

/**
 * スペック行（3段階対応）
 */
function SpecRowFeatureSupport({
  label,
  status,
  details,
}: {
  label: string;
  status: FeatureSupport;
  details?: string | null;
}) {
  const getIcon = () => {
    switch (status) {
      case "supported":
        return <Check className="h-4 w-4 text-green-600" />;
      case "partial":
        return <Minus className="h-4 w-4 text-yellow-600" />;
      case "unsupported":
        return <X className="h-4 w-4 text-gray-400" />;
    }
  };

  const getText = () => {
    switch (status) {
      case "supported":
        return details || "対応";
      case "partial":
        return details || "一部対応";
      case "unsupported":
        return details || "非対応";
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium w-40">{label}</TableCell>
      <TableCell className="flex items-center gap-2">
        {getIcon()}
        <span>{getText()}</span>
      </TableCell>
    </TableRow>
  );
}

/**
 * コミュニティセクションコンポーネント
 */
function CommunitySection({
  icon,
  title,
  rating,
  description,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  rating: RatingLevel;
  description: string;
  points: string[];
}) {
  return (
    <div className="border-b pb-6 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-4 w-4",
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>
      </div>
      <p className="text-sm font-medium mb-2">{description}</p>
      <ul className="space-y-1">
        {points.map((point, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-muted-foreground">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
