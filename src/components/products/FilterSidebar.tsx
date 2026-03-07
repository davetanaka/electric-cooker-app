"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";

/**
 * フィルターサイドバーコンポーネント
 * 製品の絞り込み条件を設定するUI
 * 注：実際のフィルタリングロジックは次のステップで実装
 */
export function FilterSidebar() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Filter className="h-4 w-4" />
          絞り込み条件
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 予算範囲 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">予算（税込）</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="下限"
              className="w-full"
              disabled
            />
            <span className="text-muted-foreground">〜</span>
            <Input
              type="number"
              placeholder="上限"
              className="w-full"
              disabled
            />
          </div>
          <p className="text-xs text-muted-foreground">
            ※ フィルタリング機能は次のステップで実装予定
          </p>
        </div>

        {/* 調理容量 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">調理容量</label>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="容量を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.5">1.5L以上（1〜2人分）</SelectItem>
              <SelectItem value="2.0">2.0L以上（2〜4人分）</SelectItem>
              <SelectItem value="2.5">2.5L以上（4〜6人分）</SelectItem>
              <SelectItem value="3.0">3.0L以上（大家族向け）</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 必須機能 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">必須機能</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="pressure" disabled />
              <label
                htmlFor="pressure"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                圧力調理
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="stirring" disabled />
              <label
                htmlFor="stirring"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                かきまぜ機能
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="wifi" disabled />
              <label
                htmlFor="wifi"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wi-Fi / アプリ連携
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="dishwasher" disabled />
              <label
                htmlFor="dishwasher"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                食洗機対応
              </label>
            </div>
          </div>
        </div>

        {/* メーカー */}
        <div className="space-y-3">
          <label className="text-sm font-medium">メーカー</label>
          <div className="space-y-2">
            {[
              "シャープ",
              "パナソニック",
              "ティファール",
              "アイリスオーヤマ",
              "シロカ",
              "象印",
            ].map((maker) => (
              <div key={maker} className="flex items-center space-x-2">
                <Checkbox id={maker} disabled />
                <label
                  htmlFor={maker}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {maker}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* リセットボタン */}
        <Button variant="outline" className="w-full" disabled>
          <RotateCcw className="h-4 w-4 mr-2" />
          条件をリセット
        </Button>
      </CardContent>
    </Card>
  );
}
