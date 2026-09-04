"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { ChatMessage, JdMatchResult } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Icons (inline, self-contained)                                    */
/* ------------------------------------------------------------------ */

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"
        fill="currentColor"
      />
      <path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8L19 14z" fill="currentColor" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden width="18" height="18">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden width="18" height="18">
      <path
        d="M4 12l16-7-7 16-2.5-6.5L4 12z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const MAX_CHAT_CHARS = 2000;
const MAX_JD_CHARS = 8000;

const SUGGESTIONS = [
  "她在永慶房屋做了哪些架構重構？",
  "Alice 的單元測試經驗是什麼？",
  "What is Alice's tech stack?",
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const VERDICT_LABEL: Record<JdMatchResult["verdict"], string> = {
  strong: "高度契合",
  partial: "部分契合",
  weak: "契合度低",
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function ResumeAssistant() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "jd">("chat");
  const [error, setError] = useState<string | null>(null);

  // chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);

  // jd state
  const [jd, setJd] = useState("");
  const [jdResult, setJdResult] = useState<JdMatchResult | null>(null);
  const [jdLoading, setJdLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const close = useCallback(() => {
    abortRef.current?.abort();
    setOpen(false);
  }, []);

  /* focus management + Esc + focus trap while open */
  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]),textarea,[href],[tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  /* lock body scroll on mobile while the sheet is open */
  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    if (!mobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* autoscroll chat log as it streams */
  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [messages, tab]);

  /* ---- chat send ---- */
  async function send() {
    const content = input.trim();
    if (!content || streaming) return;
    if (content.length > MAX_CHAT_CHARS) {
      setError(`訊息太長了（上限 ${MAX_CHAT_CHARS} 字）。`);
      return;
    }
    const history = [...messages, { role: "user", content } as ChatMessage];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setStreaming(true);
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12) }),
        signal: abortRef.current.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({ error: "發生錯誤，請再試一次。" }));
        throw new Error(data.error ?? "發生錯誤，請再試一次。");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((cur) => {
          const copy = cur.slice();
          const lastMsg = copy[copy.length - 1];
          copy[copy.length - 1] = {
            role: "assistant",
            content: lastMsg.content + text,
          };
          return copy;
        });
      }
      setMessages((cur) => {
        const copy = cur.slice();
        const lastMsg = copy[copy.length - 1];
        if (lastMsg.role === "assistant" && lastMsg.content === "") {
          copy[copy.length - 1] = {
            role: "assistant",
            content: "（沒有收到回覆，請再試一次。）",
          };
        }
        return copy;
      });
    } catch (e) {
      const err = e as Error;
      if (err.name === "AbortError") {
        setMessages((cur) => {
          const copy = cur.slice();
          const lastMsg = copy[copy.length - 1];
          if (lastMsg?.role === "assistant") {
            copy[copy.length - 1] = {
              role: "assistant",
              content: lastMsg.content + "\n\n（已停止）",
            };
          }
          return copy;
        });
      } else {
        setError(err.message || "發生錯誤，請再試一次。");
        setMessages((cur) => cur.filter((_, i) => i !== cur.length - 1));
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function onInputKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  /* ---- jd analyze ---- */
  async function analyzeJd() {
    const text = jd.trim();
    if (!text || jdLoading) return;
    if (text.length > MAX_JD_CHARS) {
      setError(`職缺描述太長了（上限 ${MAX_JD_CHARS} 字）。`);
      return;
    }
    setError(null);
    setJdLoading(true);
    setJdResult(null);
    try {
      const res = await fetch("/api/jd-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: text }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        throw new Error(data?.error ?? "發生錯誤，請再試一次。");
      }
      setJdResult(data as JdMatchResult);
    } catch (e) {
      setError((e as Error).message || "發生錯誤，請再試一次。");
    } finally {
      setJdLoading(false);
    }
  }

  async function copyPitch() {
    if (!jdResult) return;
    try {
      await navigator.clipboard.writeText(jdResult.pitch);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("複製失敗，請手動選取。");
    }
  }

  /* ------------------------------------------------------------------ */

  if (!open) {
    return (
      <button
        ref={triggerRef}
        type="button"
        className="assistant-fab"
        aria-label="開啟 Alice 的履歷 AI 助理"
        aria-expanded={false}
        aria-controls="resume-assistant-panel"
        onClick={() => setOpen(true)}
      >
        <SparkIcon />
        問我的履歷
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      id="resume-assistant-panel"
      className="assistant-panel glass"
      data-tab={tab}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-assistant-title"
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-hair px-4 py-3">
        <h2
          id="resume-assistant-title"
          className="text-sm font-bold tracking-wide text-gradient"
        >
          Alice 履歷 AI 助理
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="關閉助理"
          className="rounded-full p-1 text-fg-dim transition-colors hover:text-fg"
        >
          <CloseIcon />
        </button>
      </div>

      {/* tabs */}
      <div
        role="tablist"
        aria-label="助理功能"
        className="flex gap-2 border-b border-hair px-4 py-2.5"
      >
        {(
          [
            ["chat", "問答"],
            ["jd", "JD 比對"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`assistant-tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`assistant-panel-${id}`}
            className="chip rounded-full px-3 py-1 text-[13px]"
            style={
              tab === id
                ? { borderColor: "rgba(95,214,196,0.6)", color: "#fff" }
                : { color: "var(--fg-dim)" }
            }
            onClick={() => {
              setTab(id);
              setError(null);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <p
          role="alert"
          className="mx-4 mt-3 rounded-lg border border-l-2 border-hair border-l-cyan bg-white/5 px-3 py-2 text-[13px] text-fg-dim"
        >
          {error}
        </p>
      )}

      {/* ---- CHAT TAB ---- */}
      {tab === "chat" && (
        <div
          id="assistant-panel-chat"
          role="tabpanel"
          aria-labelledby="assistant-tab-chat"
          className="flex min-h-0 flex-1 flex-col"
        >
          <div
            ref={logRef}
            className="assistant-log flex flex-col gap-3 px-4 py-4"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.length === 0 && (
              <div className="text-[13px] leading-6 text-fg-dim">
                <p>問我關於 Alice 的經歷、專案、技術。試試看：</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="chip rounded-lg px-2.5 py-1.5 text-left text-[13px] text-fg-dim"
                      onClick={() => {
                        setInput(s);
                        inputRef.current?.focus();
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              const pending = isLast && m.role === "assistant" && m.content === "";
              return (
                <div
                  key={i}
                  className={`assistant-bubble ${
                    m.role === "user"
                      ? "assistant-bubble-user"
                      : "assistant-bubble-ai"
                  }`}
                  aria-busy={pending || (isLast && streaming)}
                >
                  {pending ? (
                    <span className="assistant-dots" aria-label="思考中">
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : (
                    m.content
                  )}
                </div>
              );
            })}
          </div>

          {/* composer */}
          <div className="border-t border-hair p-3">
            <label htmlFor="assistant-input" className="sr-only">
              輸入你的問題
            </label>
            <div className="flex items-end gap-2">
              <textarea
                id="assistant-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_CHAT_CHARS + 200}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="輸入問題，Enter 送出、Shift+Enter 換行"
                className="max-h-28 min-h-[2.4rem] flex-1 resize-none rounded-xl border border-hair bg-white/5 px-3 py-2 text-sm text-fg outline-none placeholder:text-fg-faint focus:border-cyan/50"
              />
              {streaming ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  className="btn btn-ghost shrink-0 !px-3 !py-2 text-[13px]"
                >
                  停止
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void send()}
                  disabled={!input.trim()}
                  aria-label="送出"
                  className="btn btn-primary shrink-0 !px-3 !py-2 disabled:opacity-40"
                >
                  <SendIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---- JD TAB ---- */}
      {tab === "jd" && (
        <div
          id="assistant-panel-jd"
          role="tabpanel"
          aria-labelledby="assistant-tab-jd"
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4"
        >
          <label htmlFor="assistant-jd" className="text-[13px] font-medium text-violet">
            貼上職缺描述（JD），比對 Alice 的契合度
          </label>
          <textarea
            id="assistant-jd"
            value={jd}
            maxLength={MAX_JD_CHARS + 200}
            onChange={(e) => setJd(e.target.value)}
            rows={5}
            placeholder="例：我們正在找一位資深後端工程師，需熟悉 .NET、DDD、CQRS、Elasticsearch…"
            className="mt-2 min-h-[7rem] w-full resize-y rounded-xl border border-hair bg-white/5 px-3 py-2 text-sm text-fg outline-none placeholder:text-fg-faint focus:border-cyan/50"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-fg-faint">
              {jd.length}/{MAX_JD_CHARS}
            </span>
            <button
              type="button"
              onClick={() => void analyzeJd()}
              disabled={!jd.trim() || jdLoading}
              className="btn btn-primary !px-4 !py-2 text-[13px] disabled:opacity-40"
            >
              {jdLoading ? "分析中…" : "開始比對"}
            </button>
          </div>

          {jdLoading && (
            <div className="mt-4">
              <span className="assistant-dots" aria-label="分析中">
                <span />
                <span />
                <span />
              </span>
            </div>
          )}

          {jdResult && (
            <div className="mt-4 flex flex-col gap-4 text-[13px] leading-6">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-fg">
                    {VERDICT_LABEL[jdResult.verdict]}
                  </span>
                  <span className="text-gradient font-bold">{jdResult.score}/100</span>
                </div>
                <div className="assistant-meter mt-1.5">
                  <span style={{ width: `${Math.max(0, Math.min(100, jdResult.score))}%` }} />
                </div>
                <p className="mt-2 text-fg-dim">{jdResult.summary}</p>
              </div>

              {jdResult.matchPoints.length > 0 && (
                <div>
                  <p className="mb-1.5 font-semibold text-violet">符合的地方</p>
                  <ul className="flex flex-col gap-2">
                    {jdResult.matchPoints.map((p, i) => (
                      <li key={i} className="rounded-lg bg-white/[0.03] p-2.5">
                        <p className="font-medium text-fg">{p.jdRequirement}</p>
                        <p className="mt-0.5 text-fg-dim">{p.evidence}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {jdResult.gaps.length > 0 && (
                <div>
                  <p className="mb-1.5 font-semibold text-violet">可能的落差</p>
                  <ul className="flex flex-col gap-2">
                    {jdResult.gaps.map((g, i) => (
                      <li key={i} className="rounded-lg bg-white/[0.03] p-2.5">
                        <p className="font-medium text-fg">{g.jdRequirement}</p>
                        <p className="mt-0.5 text-fg-dim">{g.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="font-semibold text-violet">給招募方的一段話</p>
                  <button
                    type="button"
                    onClick={() => void copyPitch()}
                    className="chip rounded-full px-2.5 py-1 text-[12px] text-fg-dim"
                  >
                    {copied ? "已複製" : "複製"}
                  </button>
                </div>
                <p className="rounded-lg border border-hair bg-white/[0.03] p-2.5 text-fg">
                  {jdResult.pitch}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* disclosure */}
      <p className="border-t border-hair px-4 py-2 text-center text-[11px] text-fg-faint">
        由 Gemini 生成，僅根據本網站的履歷內容，可能有誤。
      </p>
    </div>
  );
}
