/* ------------------------------------------------------------------ */
/*  OpenAI client — the ONLY place the `openai` SDK is instantiated.   */
/*  Server-only. Never import this from a "use client" module.         */
/* ------------------------------------------------------------------ */

import OpenAI from "openai";

/**
 * A current-generation text model, as a single constant. Model ids move
 * fast — override with the OPENAI_MODEL env var without touching code.
 * `gpt-5.6-luna` is the GPT-5.6 family's entry tier (cheapest, fastest);
 * swap to `-terra` or `-sol` for more reasoning capability at higher cost.
 */
export const OPENAI_MODEL =
  process.env.OPENAI_MODEL?.trim() || "gpt-5.6-luna";

let client: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. It is a server-only secret — never prefix it with NEXT_PUBLIC_.",
    );
  }
  client ??= new OpenAI({ apiKey });
  return client;
}

/**
 * Generation caps. Also the hard cost ceiling on a public endpoint.
 * No `temperature` here — the gpt-5.x family only supports the default
 * value (1) and rejects any other value with `unsupported_value`.
 */
export const GEN_LIMITS = {
  chat: { maxOutputTokens: 800 },
  // JD 落差大時（例如職缺要求的技能棧跟履歷差很多），summary/gaps/pitch 會寫得比較
  // 長，1200 曾經在這種情況下截斷輸出、讓 JSON 解析失敗，故留較高的安全邊界。
  jd: { maxOutputTokens: 2500 },
} as const;
