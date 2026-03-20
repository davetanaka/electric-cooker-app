"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const STORAGE_KEY = "electric-cooker-compare";
const MAX_COMPARE_ITEMS = 3;

interface CompareContextType {
  compareList: string[];
  isLoaded: boolean;
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  canAdd: boolean;
  maxItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

/** localStorageから安全に読み込む */
function loadFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * 比較機能のプロバイダー
 * アプリ全体で比較リストの状態を共有
 */
export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>(loadFromStorage);
  // "use client" コンポーネントは常にクライアントで初期化されるため true
  const isLoaded = true;

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

  return (
    <CompareContext.Provider
      value={{
        compareList,
        isLoaded,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        canAdd,
        maxItems: MAX_COMPARE_ITEMS,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

/**
 * 比較機能を使用するためのフック
 */
export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
