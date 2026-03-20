"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "electric-cooker-chat-history";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/** localStorageから安全に読み込む */
function loadFromStorage(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((m: ChatMessage, index: number) => ({
      ...m,
      id: m.id || `${Date.now()}-${index}`,
    }));
  } catch {
    return [];
  }
}

/**
 * チャット履歴管理のカスタムフック
 * localStorageを使用してメッセージを永続化
 */
export function useChatHistory() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadFromStorage);
  // "use client" コンポーネントは常にクライアントで初期化されるため true
  const isLoaded = true;

  // messagesが変更されたらlocalStorageに保存
  useEffect(() => {
    if (isLoaded && messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        console.error("Failed to save chat history to localStorage");
      }
    }
  }, [messages, isLoaded]);

  // メッセージを追加
  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // メッセージを更新（ストリーミング用）
  const updateMessage = useCallback((id: string, content: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content } : m))
    );
  }, []);

  // 最後のメッセージを削除
  const removeLastMessage = useCallback(() => {
    setMessages((prev) => prev.slice(0, -1));
  }, []);

  // 特定のメッセージを削除
  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // 履歴をクリア
  const clearHistory = useCallback(() => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.error("Failed to clear chat history from localStorage");
    }
  }, []);

  return {
    messages,
    isLoaded,
    addMessage,
    updateMessage,
    removeMessage,
    removeLastMessage,
    clearHistory,
    setMessages,
  };
}
