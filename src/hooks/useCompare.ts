"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "electric-cooker-compare";
const MAX_COMPARE_ITEMS = 3;

/**
 * 製品比較機能のカスタムフック
 * localStorageを使用して比較対象の製品IDを永続化
 */
export function useCompare() {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初期化時にlocalStorageから読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompareList(JSON.parse(stored));
      }
    } catch {
      console.error("Failed to load compare list from localStorage");
    }
    setIsLoaded(true);
  }, []);

  // compareListが変更されたらlocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
      } catch {
        console.error("Failed to save compare list to localStorage");
      }
    }
  }, [compareList, isLoaded]);

  // 比較リストに追加
  const addToCompare = useCallback((productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) return prev;
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      return [...prev, productId];
    });
  }, []);

  // 比較リストから削除
  const removeFromCompare = useCallback((productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
  }, []);

  // 比較リストの切り替え
  const toggleCompare = useCallback((productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      return [...prev, productId];
    });
  }, []);

  // 比較リストにあるかどうかを確認
  const isInCompare = useCallback(
    (productId: string) => compareList.includes(productId),
    [compareList]
  );

  // 比較リストをクリア
  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  // 追加可能かどうか
  const canAdd = compareList.length < MAX_COMPARE_ITEMS;

  return {
    compareList,
    isLoaded,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    isInCompare,
    clearCompare,
    canAdd,
    maxItems: MAX_COMPARE_ITEMS,
  };
}
