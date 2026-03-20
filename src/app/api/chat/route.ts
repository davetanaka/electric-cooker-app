import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { generateSystemPrompt } from "@/lib/chat-prompt";

/** メッセージの最大文字数 */
const MAX_MESSAGE_LENGTH = 5000;
/** 会話履歴の最大件数 */
const MAX_MESSAGES = 50;

/** システムプロンプトのキャッシュ（リクエスト毎の再生成を回避） */
let cachedSystemPrompt: string | null = null;
function getSystemPrompt(): string {
  if (!cachedSystemPrompt) {
    cachedSystemPrompt = generateSystemPrompt();
  }
  return cachedSystemPrompt;
}

/** リクエストボディのバリデーション */
function validateMessages(
  body: unknown
): { valid: true; messages: Array<{ role: "user" | "assistant"; content: string }> } | { valid: false; error: string } {
  if (!body || typeof body !== "object" || !("messages" in body)) {
    return { valid: false, error: "リクエスト形式が不正です。" };
  }

  const { messages } = body as { messages: unknown };
  if (!Array.isArray(messages)) {
    return { valid: false, error: "messages は配列である必要があります。" };
  }
  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `メッセージ数が上限（${MAX_MESSAGES}件）を超えています。` };
  }

  for (const msg of messages) {
    if (!msg || typeof msg !== "object") {
      return { valid: false, error: "不正なメッセージ形式です。" };
    }
    const { role, content } = msg as { role: unknown; content: unknown };
    if (role !== "user" && role !== "assistant") {
      return { valid: false, error: "role は user または assistant のみ許可されます。" } as const;
    }
    if (typeof content !== "string" || content.length === 0) {
      return { valid: false, error: "content は空でない文字列である必要があります。" };
    }
    if (content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `メッセージが長すぎます（上限: ${MAX_MESSAGE_LENGTH}文字）。` };
    }
  }

  return { valid: true, messages: messages as Array<{ role: "user" | "assistant"; content: string }> };
}

/** 簡易レート制限（IPベースでメモリ管理） */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count++;
  return true;
}

/**
 * AIチャットAPIルート
 * Claude APIを使用してストリーミング応答を返す
 */
export async function POST(req: Request) {
  try {
    // レート制限チェック
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "リクエスト頻度が高すぎます。しばらく待ってから再試行してください。" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // リクエストボディのバリデーション
    const body = await req.json();
    const validation = validateMessages(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Claude APIでストリーミング応答を生成
    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: getSystemPrompt(),
      messages: validation.messages,
    });

    // ストリーミングレスポンスを返す
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);

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
