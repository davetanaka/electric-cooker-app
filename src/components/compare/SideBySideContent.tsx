"use client";

import Link from "next/link";
import { useCompare } from "@/hooks/useCompare";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GitCompare,
  Search,
  X,
  Check,
  Minus,
  Star,
  Flame,
  Sparkles,
  Wifi,
  Droplets,
} from "lucide-react";
import type { Product } from "@/lib/types";

/**
 * 横並び比較ページのコンテンツ
 */
export function SideBySideContent() {
  const { compareList, removeFromCompare, clearCompare, isLoaded } = useCompare();

  // 比較対象の製品データを取得
  const compareProducts = products.filter((p) => compareList.includes(p.id));

  // ローディング中
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center text-muted-foreground">
            読み込み中...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <GitCompare className="h-8 w-8 text-blue-500" />
            製品を並べて比較
          </h1>
          <p className="text-muted-foreground mt-2">
            選択した製品を横並びで比較できます（最大3製品）
          </p>
        </div>
        {compareProducts.length > 0 && (
          <Button variant="outline" onClick={clearCompare}>
            <X className="h-4 w-4 mr-2" />
            すべてクリア
          </Button>
        )}
      </div>

      {/* 比較対象が空の場合 */}
      {compareProducts.length === 0 && (
        <div className="text-center py-16 border rounded-lg bg-muted/30">
          <GitCompare className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            比較する製品がありません
          </h2>
          <p className="text-muted-foreground mb-6">
            製品一覧から比較したい製品を選択してください
          </p>
          <LinkButton href="/compare">
            <Search className="mr-2 h-4 w-4" />
            製品を探す
          </LinkButton>
        </div>
      )}

      {/* 比較テーブル */}
      {compareProducts.length > 0 && (
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* スティッキー製品名バー */}
            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b mb-4 -mx-4 px-4 py-3">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareProducts.length}, 1fr)` }}>
                {compareProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">
                        {product.specs.basic.manufacturer}
                      </p>
                      <p className="font-semibold truncate">
                        {product.specs.basic.productName}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => removeFromCompare(product.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* 製品ヘッダー（詳細カード） */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareProducts.length}, 1fr)` }}>
              {compareProducts.map((product) => (
                <Card key={product.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => removeFromCompare(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardHeader className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      {product.specs.basic.manufacturer}
                    </p>
                    <CardTitle className="text-lg pr-8">
                      {product.specs.basic.productName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {product.specs.basic.modelNumber}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      <Badge>{product.specs.basic.priceRange}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 比較セクション */}
            <div className="mt-6 space-y-6">
              {/* 基本スペック */}
              <CompareSection title="基本スペック">
                <CompareRow
                  label="調理容量"
                  products={compareProducts}
                  getValue={(p) => `${p.specs.capacity.cookingCapacity}L`}
                />
                <CompareRow
                  label="量の目安"
                  products={compareProducts}
                  getValue={(p) => p.specs.capacity.servingSize}
                />
                <CompareRow
                  label="本体サイズ"
                  products={compareProducts}
                  getValue={(p) =>
                    `${p.specs.capacity.dimensions.width}×${p.specs.capacity.dimensions.depth}×${p.specs.capacity.dimensions.height}mm`
                  }
                />
                <CompareRow
                  label="重量"
                  products={compareProducts}
                  getValue={(p) => `約${p.specs.capacity.weight}kg`}
                />
              </CompareSection>

              {/* 調理機能 */}
              <CompareSection title="調理機能">
                <CompareRowBoolean
                  label="圧力調理"
                  icon={<Flame className="h-4 w-4" />}
                  products={compareProducts}
                  getValue={(p) => p.specs.features.pressureCooking.supported}
                  getDetails={(p) => p.specs.features.pressureCooking.details}
                />
                <CompareRowBoolean
                  label="かきまぜ機能"
                  icon={<Sparkles className="h-4 w-4" />}
                  products={compareProducts}
                  getValue={(p) => p.specs.features.stirring.supported}
                  getDetails={(p) => p.specs.features.stirring.details}
                />
                <CompareRowBoolean
                  label="無水調理"
                  icon={<Droplets className="h-4 w-4" />}
                  products={compareProducts}
                  getValue={(p) => p.specs.features.waterless}
                />
                <CompareRowBoolean
                  label="低温調理"
                  products={compareProducts}
                  getValue={(p) => p.specs.features.lowTemp.supported}
                  getDetails={(p) => p.specs.features.lowTemp.tempRange}
                />
                <CompareRowBoolean
                  label="炒め調理"
                  products={compareProducts}
                  getValue={(p) => p.specs.features.stirFry}
                />
                <CompareRowBoolean
                  label="発酵調理"
                  products={compareProducts}
                  getValue={(p) => p.specs.features.fermentation}
                />
                <CompareRowBoolean
                  label="炊飯"
                  products={compareProducts}
                  getValue={(p) => p.specs.features.riceCooking.supported}
                  getDetails={(p) => p.specs.features.riceCooking.capacity}
                />
              </CompareSection>

              {/* 便利機能 */}
              <CompareSection title="便利機能">
                <CompareRowBoolean
                  label="Wi-Fi/アプリ連携"
                  icon={<Wifi className="h-4 w-4" />}
                  products={compareProducts}
                  getValue={(p) => p.specs.convenience.wifi.supported}
                  getDetails={(p) => p.specs.convenience.wifi.appName}
                />
                <CompareRowBoolean
                  label="予約調理"
                  products={compareProducts}
                  getValue={(p) => p.specs.convenience.reservation.supported}
                  getDetails={(p) =>
                    p.specs.convenience.reservation.maxHours
                      ? `最大${p.specs.convenience.reservation.maxHours}時間`
                      : null
                  }
                />
                <CompareRowBoolean
                  label="保温機能"
                  products={compareProducts}
                  getValue={(p) => p.specs.convenience.keepWarm}
                />
                <CompareRow
                  label="自動メニュー数"
                  products={compareProducts}
                  getValue={(p) => p.specs.menu.autoMenuCount}
                />
              </CompareSection>

              {/* コミュニティ評価 */}
              <CompareSection title="コミュニティ評価">
                <CompareRowRating
                  label="公式コミュニティ"
                  products={compareProducts}
                  getValue={(p) => p.community.officialCommunity.rating}
                />
                <CompareRowRating
                  label="SNS活発度"
                  products={compareProducts}
                  getValue={(p) => p.community.snsActivity.rating}
                />
                <CompareRowRating
                  label="お手入れ評判"
                  products={compareProducts}
                  getValue={(p) => p.community.maintenanceReputation.rating}
                />
                <CompareRowRating
                  label="購入後サポート"
                  products={compareProducts}
                  getValue={(p) => p.community.postPurchaseSupport.rating}
                />
              </CompareSection>

              {/* 詳細リンク */}
              <div className="grid gap-4 pt-4" style={{ gridTemplateColumns: `repeat(${compareProducts.length}, 1fr)` }}>
                {compareProducts.map((product) => (
                  <LinkButton key={product.id} variant="outline" className="w-full" href={`/products/${product.id}`}>
                    詳細を見る
                  </LinkButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 製品追加の案内 */}
      {compareProducts.length > 0 && compareProducts.length < 3 && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            あと{3 - compareProducts.length}製品追加できます
          </p>
          <LinkButton variant="outline" href="/compare">
            <Search className="mr-2 h-4 w-4" />
            製品を追加
          </LinkButton>
        </div>
      )}
    </div>
  );
}

/**
 * 比較セクションコンポーネント
 */
function CompareSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted px-4 py-2">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="divide-y">{children}</div>
    </div>
  );
}

/**
 * 比較行コンポーネント（テキスト値）
 */
function CompareRow({
  label,
  products,
  getValue,
}: {
  label: string;
  products: Product[];
  getValue: (product: Product) => string;
}) {
  return (
    <div
      className="grid gap-4 px-4 py-3 items-center"
      style={{ gridTemplateColumns: `120px repeat(${products.length}, 1fr)` }}
    >
      <div className="text-sm text-muted-foreground">{label}</div>
      {products.map((product) => (
        <div key={product.id} className="text-sm">
          {getValue(product)}
        </div>
      ))}
    </div>
  );
}

/**
 * 比較行コンポーネント（対応/非対応）
 */
function CompareRowBoolean({
  label,
  icon,
  products,
  getValue,
  getDetails,
}: {
  label: string;
  icon?: React.ReactNode;
  products: Product[];
  getValue: (product: Product) => boolean;
  getDetails?: (product: Product) => string | null | undefined;
}) {
  return (
    <div
      className="grid gap-4 px-4 py-3 items-center"
      style={{ gridTemplateColumns: `120px repeat(${products.length}, 1fr)` }}
    >
      <div className="text-sm text-muted-foreground flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      {products.map((product) => {
        const supported = getValue(product);
        const details = getDetails?.(product);
        return (
          <div key={product.id} className="flex items-center gap-2 text-sm">
            {supported ? (
              <Check className="h-4 w-4 text-green-600 shrink-0" />
            ) : (
              <Minus className="h-4 w-4 text-gray-400 shrink-0" />
            )}
            <span className={supported ? "" : "text-muted-foreground"}>
              {supported ? (details || "対応") : "非対応"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * 比較行コンポーネント（星評価）
 */
function CompareRowRating({
  label,
  products,
  getValue,
}: {
  label: string;
  products: Product[];
  getValue: (product: Product) => number;
}) {
  return (
    <div
      className="grid gap-4 px-4 py-3 items-center"
      style={{ gridTemplateColumns: `120px repeat(${products.length}, 1fr)` }}
    >
      <div className="text-sm text-muted-foreground">{label}</div>
      {products.map((product) => {
        const rating = getValue(product);
        return (
          <div key={product.id} className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
