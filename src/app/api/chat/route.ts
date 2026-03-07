import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { generateSystemPrompt } from "@/lib/chat-prompt";

/**
 * AIチャットAPIルート
 * Claude APIを使用してストリーミング応答を返す
 */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // システムプロンプトを生成（6社データを含む）
    const systemPrompt = generateSystemPrompt();

    // Claude APIでストリーミング応答を生成
    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: systemPrompt,
      messages,
    });

    // ストリーミングレスポンスを返す
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);

    // APIキーが設定されていない場合のエラーハンドリング
    if (error instanceof Error && error.message.includes("API key")) {
      return new Response(
        JSON.stringify({
          error: "APIキーが設定されていません。環境変数 ANTHROPIC_API_KEY を設定してください。",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "チャットの処理中にエラーが発生しました。" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
