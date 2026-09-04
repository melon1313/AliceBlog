/* ------------------------------------------------------------------ */
/*  In-memory fixed-window rate limiter.                               */
/*                                                                    */
/*  Trade-off: state lives in a single serverless instance's memory,  */
/*  so it resets on cold start / deploy and the effective ceiling is  */
/*  roughly `limit × live instances`. That is deliberately weak —     */
/*  enough to blunt a bored visitor, not a determined attacker. The   */
/*  real cost backstops are GEN_LIMITS.maxOutputTokens, the input     */
/*  CAPS, the cheap model, and a Google Cloud budget alert.           */
/*                                                                    */
/*  Upgrade path: swap the internals for Vercel KV / Upstash without  */
/*  touching call sites.                                              */
/* ------------------------------------------------------------------ */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult =
  | { ok: true; remaining: number; retryAfter: 0 }
  | { ok: false; remaining: 0; retryAfter: number };

export function checkRateLimit(
  key: string,
  opts: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, remaining: opts.limit - 1, retryAfter: 0 };
  }

  if (bucket.count >= opts.limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: opts.limit - bucket.count, retryAfter: 0 };
}

/* Periodic sweep of expired buckets so the Map cannot grow unbounded. */
const sweep = setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
}, 5 * 60_000);
// Don't keep the process alive just for the sweep (Node runtime).
sweep.unref?.();
