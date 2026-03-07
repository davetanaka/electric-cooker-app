"use client";

import { useState, useMemo, useCallback } from "react";
import type { Product } from "@/lib/types";

/**
 * フィルター状態の型定義
 */
export interface FilterState {
  /** 予算下限 */
  budgetMin: number | null;
  /** 予算上限 */
  budgetMax: number | null;
  /** 最小調理容量 */
  minCapacity: number | null;
  /** 圧力調理必須 */
  requirePressure: boolean;
  /** かきまぜ機能必須 */
  requireStirring: boolean;
  /** Wi-Fi必須 */
  requireWifi: boolean;
  /** 食洗機対応必須 */
  requireDishwasher: boolean;
  /** 選択メーカー（空配列 = 全メーカー） */
  selectedManufacturers: string[];
}

/**
 * フィルター初期状態
 */
const initialFilterState: FilterState = {
  budgetMin: null,
  budgetMax: null,
  minCapacity: null,
  requirePressure: false,
  requireStirring: false,
  requireWifi: false,
  requireDishwasher: false,
  selectedManufacturers: [],
};

/**
 * 製品フィルタリング用カスタムフック
 */
export function useProductFilter(products: Product[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  /**
   * フィルター条件を更新
   */
  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  /**
   * フィルターをリセット
   */
  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  /**
   * メーカーの選択/解除をトグル
   */
  const toggleManufacturer = useCallback((manufacturer: string) => {
    setFilters((prev) => {
      const current = prev.selectedManufacturers;
      if (current.includes(manufacturer)) {
        return {
          ...prev,
          selectedManufacturers: current.filter((m) => m !== manufacturer),
        };
      }
      return {
        ...prev,
        selectedManufacturers: [...current, manufacturer],
      };
    });
  }, []);

  /**
   * フィルタリングされた製品リスト
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const { specs } = product;

      // 予算フィルター
      if (filters.budgetMin !== null && specs.basic.priceMax < filters.budgetMin) {
        return false;
      }
      if (filters.budgetMax !== null && specs.basic.priceMin > filters.budgetMax) {
        return false;
      }

      // 容量フィルター
      if (
        filters.minCapacity !== null &&
        specs.capacity.cookingCapacity < filters.minCapacity
      ) {
        return false;
      }

      // 圧力調理フィルター
      if (filters.requirePressure && !specs.features.pressureCooking.supported) {
        return false;
      }

      // かきまぜ機能フィルター
      if (filters.requireStirring && !specs.features.stirring.supported) {
        return false;
      }

      // Wi-Fiフィルター
      if (filters.requireWifi && !specs.convenience.wifi.supported) {
        return false;
      }

      // 食洗機対応フィルター
      if (
        filters.requireDishwasher &&
        specs.convenience.dishwasherSafe === "unsupported"
      ) {
        return false;
      }

      // メーカーフィルター
      if (
        filters.selectedManufacturers.length > 0 &&
        !filters.selectedManufacturers.includes(specs.basic.manufacturer)
      ) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  /**
   * 現在のフィルターが初期状態かどうか
   */
  const isDefaultFilter = useMemo(() => {
    return (
      filters.budgetMin === null &&
      filters.budgetMax === null &&
      filters.minCapacity === null &&
      !filters.requirePressure &&
      !filters.requireStirring &&
      !filters.requireWifi &&
      !filters.requireDishwasher &&
      filters.selectedManufacturers.length === 0
    );
  }, [filters]);

  return {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
    toggleManufacturer,
    isDefaultFilter,
  };
}
