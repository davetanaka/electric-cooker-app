"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User,
  Loader2,
  AlertCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useChatHistory } from "@/hooks/useChatHistory";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const EXAMPLE_QUESTIONS = [
  "3人家族で圧力必須、予算3万円以内で探しています",
  "かきまぜ機能がある製品を比較してください",
  "Wi-Fi対応でアプリ連携できる製品はどれですか？",
  "一人暮らしにおすすめの製品を教えてください",
];

/**
 * AIチャット画面のメインコンテンツ
 */
export function ChatPageContent() {
  const {
    messages,
    isLoaded,
    addMessage,
    updateMessage,
    clearHistory,
    setMessages,
  } = useChatHistory();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // メッセージが追加されたらスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // メッセージ送信処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("APIエラーが発生しました");
      }

      // ストリーミングレスポンスを処理
      const reader = response.body?.getReader();
      if (!reader) throw new Error("レスポンスの読み取りに失敗しました");

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let content = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        content += chunk;

        updateMessage(assistantMessage.id, content);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 例の質問をクリックしたときの処理
  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  // 再試行
  const handleRetry = () => {
    if (messages.length === 0) return;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMessage) {
      setMessages((prev) => prev.filter((m) => m.id !== lastUserMessage.id));
      setInput(lastUserMessage.content);
      setError(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">AIに相談</h1>
          <p className="text-muted-foreground">
            電気調理鍋選びの相談をAIにできます。6社のデータに基づいて、
            あなたに合った製品を提案します。
          </p>
        </div>
        {/* 履歴クリアボタン */}
        {messages.length > 0 && isLoaded && (
          <div className="flex justify-end mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-muted-foreground"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              履歴をクリア
            </Button>
          </div>
        )}
      </div>

      {/* チャットエリア */}
      <Card className="mb-4">
        <CardContent className="p-0">
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {/* ローディング中 */}
            {!isLoaded && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                読み込み中...
              </div>
            )}

            {/* 初期メッセージ（会話がない場合） */}
            {isLoaded && messages.length === 0 && (
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="text-sm">
                      こんにちは！電気調理鍋選びのお手伝いをします。
                      以下のような質問ができます：
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 「3人家族で圧力必須、予算3万円以内」</li>
                      <li>• 「かきまぜ機能がある製品を比較して」</li>
                      <li>• 「デザインがおしゃれな製品はどれ？」</li>
                      <li>• 「コミュニティが充実している製品は？」</li>
                    </ul>
                    <p className="text-sm">
                      なんでもお気軽にお聞きください！
                    </p>
                  </div>
                </div>

                {/* 例の質問 */}
                <div className="pl-11">
                  <p className="text-xs text-muted-foreground mb-2">
                    例の質問をクリックして試す:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_QUESTIONS.map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleExampleClick(question)}
                      >
                        {question.length > 20
                          ? question.slice(0, 20) + "..."
                          : question}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* メッセージ一覧 */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div
                  className={cn(
                    "flex-1 rounded-lg px-4 py-3 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-12"
                      : "bg-muted mr-12"
                  )}
                >
                  {message.role === "user" ? (
                    <p>{message.content}</p>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* ローディング表示 */}
            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 rounded-lg bg-muted px-4 py-3 mr-12">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    考え中...
                  </div>
                </div>
              </div>
            )}

            {/* エラー表示 */}
            {error && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1 rounded-lg bg-destructive/10 px-4 py-3 mr-12">
                  <p className="text-sm text-destructive mb-2">
                    エラーが発生しました: {error}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="text-destructive border-destructive/50 hover:bg-destructive/10"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    再試行
                  </Button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* 入力フォーム */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力してください..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span className="ml-2 hidden sm:inline">送信</span>
        </Button>
      </form>

      {/* 注意事項 */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          ※ AIの回答は参考情報です。最新の価格・仕様は各社公式サイトをご確認ください。
        </p>
      </div>
    </div>
  );
}
