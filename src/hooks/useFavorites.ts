"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "electric-cooker-favorites";

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
 * お気に入り機能のカスタムフック
 * localStorageを使用して製品IDを永続化
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(loadFromStorage);
  // "use client" コンポーネントは常にクライアントで初期化されるため true
  const isLoaded = true;

  // favoritesが変更されたらlocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch {
        console.error("Failed to save favorites to localStorage");
      }
    }
  }, [favorites, isLoaded]);

  // お気に入りに追加
  const addFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  }, []);

  // お気に入りから削除
  const removeFavorite = useCallback((productId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== productId));
  }, []);

  // お気に入りの切り替え
  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  // お気に入りかどうかを確認
  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
