"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "electric-cooker-chat-history";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/**
 * チャット履歴管理のカスタムフック
 * localStorageを使用してメッセージを永続化
 */
export function useChatHistory() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初期化時にlocalStorageから読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // 古いデータ形式にも対応（id がない場合は生成）
        const messagesWithId = parsed.map((m: ChatMessage, index: number) => ({
          ...m,
          id: m.id || `${Date.now()}-${index}`,
        }));
        setMessages(messagesWithId);
      }
    } catch {
      console.error("Failed to load chat history from localStorage");
    }
    setIsLoaded(true);
  }, []);

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
