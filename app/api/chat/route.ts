/* ------------------------------------------------------------------ */
/*  POST /api/chat — streaming "ask my résumé" assistant.             */
/*                                                                    */
/*  Node runtime (no `runtime` export). Edge is deprecated in Next 16 */
/*  and the in-memory rate limiter needs a warm instance. POST is     */
/*  never cached, so no route-segment config is needed.               */
/* ------------------------------------------------------------------ */

import { getGemini, GEMINI_MODEL, GEN_LIMITS } from "@/lib/gemini";
import { buildChatSystemPrompt } from "@/lib/prompt";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  assertSameOrigin,
  getClientIp,
  jsonError,
  CAPS,
} from "@/lib/request-guard";
import type { ChatMessage } from "@/lib/types";

function normalizeMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const role = (m as ChatMessage).role;
    const content = (m as ChatMessage).content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    out.push({ role, content });
  }
  return out;
}

export async function POST(request: Request) {
  const originError = await assertSameOrigin(request);
  if (originError) return originError;

  const ip = await getClientIp();
  const rl = checkRateLimit(`chat:${ip}`, { limit: 20, windowMs: 10 * 60_000 });
  if (!rl.ok) {
    return jsonError(429, "太多請求了，請稍後再試。", {
      "Retry-After": String(rl.retryAfter),
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "Request body 不是合法的 JSON。");
  }

  const messages = normalizeMessages(body);
  if (!messages) return jsonError(400, "messages 格式錯誤。");
  if (messages.length > CAPS.maxMessages) {
    return jsonError(400, `一次最多 ${CAPS.maxMessages} 則訊息。`);
  }
  if (messages.some((m) => m.content.length > CAPS.maxChatCharsPerMessage)) {
    return jsonError(400, `單則訊息最長 ${CAPS.maxChatCharsPerMessage} 字。`);
  }
  const last = messages.at(-1);
  if (!last || last.role !== "user" || !last.content.trim()) {
    return jsonError(400, "最後一則訊息必須是使用者的提問。");
  }

  let iterable: AsyncGenerator<{ text?: string }>;
  try {
    const ai = getGemini();
    iterable = await ai.models.generateContentStream({
      model: GEMINI_MODEL,
      config: {
        systemInstruction: buildChatSystemPrompt(),
        maxOutputTokens: GEN_LIMITS.chat.maxOutputTokens,
        temperature: GEN_LIMITS.chat.temperature,
      },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    });
  } catch (err) {
    console.error("[/api/chat] gemini init error", err);
    return jsonError(502, "AI 服務暫時無法使用，請稍後再試。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of iterable) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch (err) {
        // Status is already sent; just stop. Client shows a "中斷" note.
        console.error("[/api/chat] stream aborted", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Accel-Buffering": "no",
    },
  });
}
