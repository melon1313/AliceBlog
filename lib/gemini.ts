/* ------------------------------------------------------------------ */
/*  Gemini client — the ONLY place @google/genai is instantiated.      */
/*  Server-only. Never import this from a "use client" module.         */
/* ------------------------------------------------------------------ */

import { GoogleGenAI } from "@google/genai";

/**
 * One cheap Flash model, as a single constant. AI Studio model ids move
 * fast — override with the GEMINI_MODEL env var without touching code.
 * `gemini-flash-lite-latest` is the cheapest current tier; swap to
 * `gemini-flash-latest` if answer quality needs a bump.
 */
export const GEMINI_MODEL =
  process.env.GEMINI_MODEL?.trim() || "gemini-flash-lite-latest";

let client: GoogleGenAI | null = null;

export function getGemini(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. It is a server-only secret — never prefix it with NEXT_PUBLIC_.",
    );
  }
  client ??= new GoogleGenAI({ apiKey });
  return client;
}

/** Generation caps. Also the hard cost ceiling on a public endpoint. */
export const GEN_LIMITS = {
  chat: { maxOutputTokens: 800, temperature: 0.3 },
  jd: { maxOutputTokens: 1200, temperature: 0.2 },
} as const;
