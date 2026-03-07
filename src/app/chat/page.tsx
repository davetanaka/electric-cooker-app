import { ChatPageContent } from "@/components/chat/ChatPageContent";

export const metadata = {
  title: "AIに相談 | 電気調理鍋 比較ガイド",
  description:
    "電気調理鍋選びの相談をAIにできます。「3人家族で圧力必須、予算3万円」のような自然言語で質問してください。",
};

/**
 * AIチャット画面
 * PRD 8.3 に基づく実装
 */
export default function ChatPage() {
  return <ChatPageContent />;
}
