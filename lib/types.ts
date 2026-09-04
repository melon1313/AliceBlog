/* Shared types for the résumé AI assistant. */

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type JdVerdict = "strong" | "partial" | "weak";

export type JdMatchPoint = { jdRequirement: string; evidence: string };
export type JdGap = { jdRequirement: string; note: string };

export type JdMatchResult = {
  verdict: JdVerdict;
  /** 0–100 overall fit estimate. */
  score: number;
  summary: string;
  matchPoints: JdMatchPoint[];
  gaps: JdGap[];
  /** Ready-to-send self-pitch paragraph. */
  pitch: string;
};

/** Runtime guard — the model output is untrusted until this passes. */
export function isJdMatchResult(x: unknown): x is JdMatchResult {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;

  const verdictOk =
    o.verdict === "strong" || o.verdict === "partial" || o.verdict === "weak";
  const scoreOk =
    typeof o.score === "number" &&
    Number.isFinite(o.score) &&
    o.score >= 0 &&
    o.score <= 100;
  const summaryOk = typeof o.summary === "string";
  const pitchOk = typeof o.pitch === "string";

  const matchOk =
    Array.isArray(o.matchPoints) &&
    o.matchPoints.every(
      (m) =>
        m &&
        typeof m === "object" &&
        typeof (m as JdMatchPoint).jdRequirement === "string" &&
        typeof (m as JdMatchPoint).evidence === "string",
    );
  const gapsOk =
    Array.isArray(o.gaps) &&
    o.gaps.every(
      (g) =>
        g &&
        typeof g === "object" &&
        typeof (g as JdGap).jdRequirement === "string" &&
        typeof (g as JdGap).note === "string",
    );

  return verdictOk && scoreOk && summaryOk && pitchOk && matchOk && gapsOk;
}
