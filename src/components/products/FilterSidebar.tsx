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
import type { FilterState } from "@/hooks/useProductFilter";

interface FilterSidebarProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  toggleManufacturer: (manufacturer: string) => void;
  resetFilters: () => void;
  isDefaultFilter: boolean;
  resultCount: number;
}

const MANUFACTURERS = [
  "シャープ",
  "パナソニック",
  "ティファール",
  "アイリスオーヤマ",
  "シロカ",
  "象印",
];

const CAPACITY_OPTIONS = [
  { value: "0", label: "指定なし" },
  { value: "1.5", label: "1.5L以上（1〜2人分）" },
  { value: "2.0", label: "2.0L以上（2〜4人分）" },
  { value: "2.5", label: "2.5L以上（4〜6人分）" },
  { value: "3.0", label: "3.0L以上（大家族向け）" },
];

/**
 * フィルターサイドバーコンポーネント
 * 製品の絞り込み条件を設定するUI
 */
export function FilterSidebar({
  filters,
  updateFilter,
  toggleManufacturer,
  resetFilters,
  isDefaultFilter,
  resultCount,
}: FilterSidebarProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            絞り込み条件
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            {resultCount}件
          </span>
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
              value={filters.budgetMin ?? ""}
              onChange={(e) =>
                updateFilter(
                  "budgetMin",
                  e.target.value ? Number(e.target.value) : null
                )
              }
            />
            <span className="text-muted-foreground shrink-0">〜</span>
            <Input
              type="number"
              placeholder="上限"
              className="w-full"
              value={filters.budgetMax ?? ""}
              onChange={(e) =>
                updateFilter(
                  "budgetMax",
                  e.target.value ? Number(e.target.value) : null
                )
              }
            />
          </div>
          <p className="text-xs text-muted-foreground">
            例: 30000〜50000
          </p>
        </div>

        {/* 調理容量 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">調理容量</label>
          <Select
            value={filters.minCapacity?.toString() ?? "0"}
            onValueChange={(value) =>
              updateFilter(
                "minCapacity",
                value === "0" ? null : Number(value)
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="容量を選択" />
            </SelectTrigger>
            <SelectContent>
              {CAPACITY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 必須機能 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">必須機能</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pressure"
                checked={filters.requirePressure}
                onCheckedChange={(checked) =>
                  updateFilter("requirePressure", checked === true)
                }
              />
              <label
                htmlFor="pressure"
                className="text-sm leading-none cursor-pointer"
              >
                圧力調理
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stirring"
                checked={filters.requireStirring}
                onCheckedChange={(checked) =>
                  updateFilter("requireStirring", checked === true)
                }
              />
              <label
                htmlFor="stirring"
                className="text-sm leading-none cursor-pointer"
              >
                かきまぜ機能
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wifi"
                checked={filters.requireWifi}
                onCheckedChange={(checked) =>
                  updateFilter("requireWifi", checked === true)
                }
              />
              <label
                htmlFor="wifi"
                className="text-sm leading-none cursor-pointer"
              >
                Wi-Fi / アプリ連携
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dishwasher"
                checked={filters.requireDishwasher}
                onCheckedChange={(checked) =>
                  updateFilter("requireDishwasher", checked === true)
                }
              />
              <label
                htmlFor="dishwasher"
                className="text-sm leading-none cursor-pointer"
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
            {MANUFACTURERS.map((maker) => (
              <div key={maker} className="flex items-center space-x-2">
                <Checkbox
                  id={maker}
                  checked={filters.selectedManufacturers.includes(maker)}
                  onCheckedChange={() => toggleManufacturer(maker)}
                />
                <label
                  htmlFor={maker}
                  className="text-sm leading-none cursor-pointer"
                >
                  {maker}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* リセットボタン */}
        <Button
          variant="outline"
          className="w-full"
          onClick={resetFilters}
          disabled={isDefaultFilter}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          条件をリセット
        </Button>
      </CardContent>
    </Card>
  );
}
