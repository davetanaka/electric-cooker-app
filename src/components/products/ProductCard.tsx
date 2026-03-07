"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import {
  Flame,
  Droplets,
  Wifi,
  Star,
  Users,
  Sparkles,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

/**
 * 製品カードコンポーネント
 * 製品の主要情報をコンパクトに表示
 */
export function ProductCard({ product }: ProductCardProps) {
  const { specs, community } = product;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-muted-foreground">
              {specs.basic.manufacturer}
            </p>
            <h3 className="text-lg font-semibold leading-tight">
              {specs.basic.productName}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {specs.basic.modelNumber}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {specs.basic.productType.includes("圧力") ? "圧力対応" : "非圧力"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 価格・容量 */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">参考価格</p>
            <p className="font-medium">{specs.basic.priceRange}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">調理容量</p>
            <p className="font-medium">{specs.capacity.cookingCapacity}L</p>
          </div>
        </div>

        {/* 主要機能バッジ */}
        <div className="flex flex-wrap gap-1.5">
          {specs.features.pressureCooking.supported && (
            <Badge variant="outline" className="text-xs">
              <Flame className="h-3 w-3 mr-1" />
              圧力調理
            </Badge>
          )}
          {specs.features.stirring.supported && (
            <Badge variant="outline" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              かきまぜ
            </Badge>
          )}
          {specs.features.waterless && (
            <Badge variant="outline" className="text-xs">
              <Droplets className="h-3 w-3 mr-1" />
              無水調理
            </Badge>
          )}
          {specs.convenience.wifi.supported && (
            <Badge variant="outline" className="text-xs">
              <Wifi className="h-3 w-3 mr-1" />
              Wi-Fi
            </Badge>
          )}
        </div>

        {/* Layer 2 評価（コミュニティ・SNS） */}
        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              コミュニティ
            </span>
            <RatingStars rating={community.officialCommunity.rating} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              購入後サポート
            </span>
            <RatingStars rating={community.postPurchaseSupport.rating} />
          </div>
        </div>

        {/* 総合コメント（1行に短縮） */}
        <p className="text-xs text-muted-foreground line-clamp-2 border-t pt-3">
          {community.overallComment}
        </p>
      </CardContent>
    </Card>
  );
}

/**
 * 星評価の表示コンポーネント
 */
function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
