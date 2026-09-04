/* ------------------------------------------------------------------ */
/*  Shared request guards for the AI route handlers.                  */
/* ------------------------------------------------------------------ */

import { headers } from "next/headers";

export const CAPS = {
  /** Max chat turns accepted in one request. */
  maxMessages: 12,
  /** Max characters per chat message. */
  maxChatCharsPerMessage: 2000,
  /** Max characters for a pasted job description. */
  maxJdChars: 8000,
} as const;

export function jsonError(
  status: number,
  message: string,
  extraHeaders: Record<string, string> = {},
): Response {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store", ...extraHeaders } },
  );
}

/**
 * Best-effort client IP from proxy headers. `request.ip` no longer exists
 * in Next 16; on Vercel `x-forwarded-for` is set. Verify on a preview
 * deploy — falls back to a shared "unknown" bucket if absent.
 */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return h.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Reject requests that aren't same-origin. `Origin` can be forged by
 * non-browser clients, so this only stops casual cross-site abuse from
 * real browsers — the rate limit + token caps are the real backstop.
 * Returns a 403 Response to short-circuit with, or null when allowed.
 */
export async function assertSameOrigin(request: Request): Promise<Response | null> {
  const host = request.headers.get("host");
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const hostMatches = (value: string | null): boolean => {
    if (!value) return true; // absent → can't disprove; let it through
    try {
      return new URL(value).host === host;
    } catch {
      return false;
    }
  };

  if (!hostMatches(origin)) return jsonError(403, "來源不被允許。");
  if (!origin && !hostMatches(referer)) return jsonError(403, "來源不被允許。");
  return null;
}
