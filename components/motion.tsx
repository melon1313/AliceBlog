"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/*  Parallax — translates its child as it moves through the viewport   */
/* ------------------------------------------------------------------ */

export function Parallax({
  speed = -0.12,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(mid * speed).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} data-parallax className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal — fades + lifts into view once                             */
/* ------------------------------------------------------------------ */

export function Reveal({
  delay = 0,
  className = "",
  style,
  children,
}: {
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CountUp — animates a number when it scrolls into view             */
/* ------------------------------------------------------------------ */

export function CountUp({
  target,
  duration = 1500,
  prefix = "",
  suffix = "",
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (prefersReducedMotion()) {
          setValue(target);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Cursor — bold gold crosshair + trailing teal ring (reticle)       */
/* ------------------------------------------------------------------ */

const CURSOR_INTERACTIVE =
  'a, button, input, textarea, select, summary, label, [role="button"], .btn, .chip, .assistant-fab, [data-cursor="hover"]';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    root.dataset.customCursor = "true";

    const ease = prefersReducedMotion() ? 1 : 0.18;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let ready = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!ready) {
        ready = true;
        rx = mx;
        ry = my;
        document.body.classList.add("cursor-ready");
      }
      const target = e.target as Element | null;
      ring.classList.toggle(
        "is-hover",
        !!target?.closest?.(CURSOR_INTERACTIVE),
      );
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const onLeave = () => document.body.classList.remove("cursor-ready");
    const onEnter = () => {
      if (ready) document.body.classList.add("cursor-ready");
    };

    const tick = () => {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      delete root.dataset.customCursor;
      document.body.classList.remove("cursor-ready");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
