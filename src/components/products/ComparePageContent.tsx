"use client";

import { products } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, TableIcon, Check, X } from "lucide-react";
import { useProductFilter } from "@/hooks/useProductFilter";
import Link from "next/link";

/**
 * 比較ページのメインコンテンツ（クライアントコンポーネント）
 * フィルタリング機能を含む
 */
export function ComparePageContent() {
  const {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
    toggleManufacturer,
    isDefaultFilter,
  } = useProductFilter(products);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ページヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">製品比較</h1>
        <p className="text-muted-foreground">
          電気調理鍋6社の製品を横断比較。条件で絞り込んで、あなたに合った1台を見つけましょう。
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="outline">
            {filteredProducts.length} / {products.length}製品
          </Badge>
          <span className="text-sm text-muted-foreground">
            データ出典：各社公式サイト・価格.com・家電量販店サイト（2026年2月時点）
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* サイドバー（フィルター） */}
        <aside className="w-full lg:w-72 shrink-0">
          <FilterSidebar
            filters={filters}
            updateFilter={updateFilter}
            toggleManufacturer={toggleManufacturer}
            resetFilters={resetFilters}
            isDefaultFilter={isDefaultFilter}
            resultCount={filteredProducts.length}
          />
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 min-w-0">
          <Tabs defaultValue="card" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="card" className="gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  カード表示
                </TabsTrigger>
                <TabsTrigger value="table" className="gap-2">
                  <TableIcon className="h-4 w-4" />
                  テーブル表示
                </TabsTrigger>
              </TabsList>
            </div>

            {/* カード表示 */}
            <TabsContent value="card" className="mt-0">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg mb-2">条件に一致する製品がありません</p>
                  <p className="text-sm">フィルター条件を変更してください</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="block hover:no-underline"
                    >
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* テーブル表示 */}
            <TabsContent value="table" className="mt-0">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg mb-2">条件に一致する製品がありません</p>
                  <p className="text-sm">フィルター条件を変更してください</p>
                </div>
              ) : (
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[180px]">製品名</TableHead>
                        <TableHead className="min-w-[120px]">参考価格</TableHead>
                        <TableHead className="text-center">容量</TableHead>
                        <TableHead className="text-center">圧力</TableHead>
                        <TableHead className="text-center">かきまぜ</TableHead>
                        <TableHead className="text-center">Wi-Fi</TableHead>
                        <TableHead className="text-center">コミュニティ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow
                          key={product.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => {
                            window.location.href = `/products/${product.id}`;
                          }}
                        >
                          <TableCell>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                {product.specs.basic.manufacturer}
                              </p>
                              <p className="font-medium">
                                {product.specs.basic.productName}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {product.specs.basic.priceRange}
                          </TableCell>
                          <TableCell className="text-center">
                            {product.specs.capacity.cookingCapacity}L
                          </TableCell>
                          <TableCell className="text-center">
                            <FeatureIcon
                              supported={
                                product.specs.features.pressureCooking.supported
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <FeatureIcon
                              supported={
                                product.specs.features.stirring.supported
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <FeatureIcon
                              supported={
                                product.specs.convenience.wifi.supported
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <RatingBadge
                              rating={
                                product.community.officialCommunity.rating
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

/**
 * 機能対応アイコン
 */
function FeatureIcon({ supported }: { supported: boolean }) {
  if (supported) {
    return <Check className="h-5 w-5 mx-auto text-green-600" />;
  }
  return <X className="h-5 w-5 mx-auto text-gray-300" />;
}

/**
 * 評価バッジ
 */
function RatingBadge({ rating }: { rating: number }) {
  const variant =
    rating >= 4 ? "default" : rating >= 3 ? "secondary" : "outline";
  return (
    <Badge variant={variant} className="text-xs">
      {rating}/5
    </Badge>
  );
}
