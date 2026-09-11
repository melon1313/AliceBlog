/* ------------------------------------------------------------------ */
/*  POST /api/jd-match — paste a job description, get a structured     */
/*  fit analysis against Alice's résumé. Non-streaming JSON.          */
/*  Node runtime (no `runtime` export); POST is never cached.         */
/* ------------------------------------------------------------------ */

import { getOpenAI, OPENAI_MODEL, GEN_LIMITS } from "@/lib/openai";
import { buildJdSystemPrompt, JD_MATCH_SCHEMA } from "@/lib/prompt";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  assertSameOrigin,
  getClientIp,
  jsonError,
  CAPS,
} from "@/lib/request-guard";
import { isJdMatchResult } from "@/lib/types";

export async function POST(request: Request) {
  const originError = await assertSameOrigin(request);
  if (originError) return originError;

  const ip = await getClientIp();
  const rl = checkRateLimit(`jd:${ip}`, { limit: 6, windowMs: 10 * 60_000 });
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

  const jd = (body as { jobDescription?: unknown })?.jobDescription;
  if (typeof jd !== "string" || !jd.trim()) {
    return jsonError(400, "請提供職缺描述 jobDescription。");
  }
  if (jd.length > CAPS.maxJdChars) {
    return jsonError(400, `職缺描述最長 ${CAPS.maxJdChars} 字。`);
  }

  let text: string;
  try {
    const ai = getOpenAI();
    const res = await ai.chat.completions.create({
      model: OPENAI_MODEL,
      max_completion_tokens: GEN_LIMITS.jd.maxOutputTokens,
      reasoning_effort: "none",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "jd_match_result",
          schema: JD_MATCH_SCHEMA,
          strict: true,
        },
      },
      messages: [
        { role: "developer", content: buildJdSystemPrompt() },
        { role: "user", content: jd },
      ],
    });
    text = res.choices[0]?.message?.content ?? "";
  } catch (err) {
    console.error("[/api/jd-match] openai error", err);
    return jsonError(502, "AI 服務暫時無法使用，請稍後再試。");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    console.error("[/api/jd-match] model returned non-JSON:", text.slice(0, 500));
    return jsonError(502, "AI 回傳格式異常，請再試一次。");
  }

  if (!isJdMatchResult(parsed)) {
    console.error("[/api/jd-match] schema mismatch:", JSON.stringify(parsed).slice(0, 500));
    return jsonError(502, "AI 回傳格式異常，請再試一次。");
  }

  return Response.json(parsed, { headers: { "Cache-Control": "no-store" } });
}
