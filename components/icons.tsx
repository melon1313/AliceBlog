import type { ReactNode, SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="30" height="30" viewBox="0 0 34 34" fill="none" aria-hidden {...props}>
      <circle cx="11.5" cy="7" r="4.5" fill="#d3232a" stroke="#1b1b1b" strokeWidth="2" />
      <circle cx="22.5" cy="7" r="4.5" fill="#d3232a" stroke="#1b1b1b" strokeWidth="2" />
      <rect
        x="2.5"
        y="9.5"
        width="29"
        height="22"
        rx="3.5"
        fill="#d3232a"
        stroke="#1b1b1b"
        strokeWidth="2"
      />
      <circle cx="11.5" cy="20.5" r="3" fill="#1b1b1b" fillOpacity="0.18" />
      <circle cx="22.5" cy="20.5" r="3" fill="#1b1b1b" fillOpacity="0.18" />
    </svg>
  );
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.16 0 1.56-.02 2.82-.02 3.2 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export function PenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3ZM14 6.5l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.25 1.05l-2.2 2.18Z" />
    </svg>
  );
}

export const CONTACT_ICONS = {
  github: GithubIcon,
  blog: PenIcon,
  mail: MailIcon,
  phone: PhoneIcon,
} as const;

/* Code editor panel — the hero visual (replaces the profile photo). */
export function CodePanel() {
  const k = "text-[#e2a06a]"; // keyword
  const t = "text-[#7fd6c0]"; // type
  const m = "text-[#e9e5f4]"; // identifier / member
  const p = "text-[#a9a3c4]"; // punctuation
  const cm = "text-[#847ea6] italic"; // comment

  const lines: ReactNode[] = [
    <>
      <span className={k}>public sealed class </span>
      <span className={t}>Wallet</span>
      <span className={p}> : </span>
      <span className={t}>AggregateRoot</span>
    </>,
    <span className={p}>{"{"}</span>,
    <>
      {"  "}
      <span className={k}>public</span> <span className={t}>Money</span>{" "}
      <span className={m}>Balance</span>{" "}
      <span className={p}>{"{ get; private set; }"}</span>
    </>,
    <>{" "}</>,
    <>
      {"  "}
      <span className={cm}>{"// 提領：餘額不足就拒絕，並發出領域事件"}</span>
    </>,
    <>
      {"  "}
      <span className={k}>public void</span> <span className={m}>Withdraw</span>
      <span className={p}>(</span>
      <span className={t}>Money</span> <span className={m}>amount</span>
      <span className={p}>)</span>
    </>,
    <>
      {"  "}
      <span className={p}>{"{"}</span>
    </>,
    <>
      {"    "}
      <span className={k}>if</span> <span className={p}>(</span>
      <span className={m}>amount</span> <span className={p}>{">"}</span>{" "}
      <span className={m}>Balance</span>
      <span className={p}>)</span>
    </>,
    <>
      {"      "}
      <span className={k}>throw new</span>{" "}
      <span className={t}>InsufficientFundsException</span>
      <span className={p}>(</span>
      <span className={m}>Id</span>
      <span className={p}>, </span>
      <span className={m}>amount</span>
      <span className={p}>);</span>
    </>,
    <>{" "}</>,
    <>
      {"    "}
      <span className={m}>Apply</span>
      <span className={p}>(</span>
      <span className={k}>new</span> <span className={t}>FundsWithdrawn</span>
      <span className={p}>(</span>
      <span className={m}>Id</span>
      <span className={p}>, </span>
      <span className={m}>amount</span>
      <span className={p}>));</span>
      <span className="caret" aria-hidden />
    </>,
    <>
      {"  "}
      <span className={p}>{"}"}</span>
    </>,
    <span className={p}>{"}"}</span>,
  ];

  return (
    <div
      className="studs relative mx-auto mt-3 w-full max-w-md lg:max-w-lg"
      style={{ ["--stud" as string]: "#3a3a3a" }}
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-amber/25 blur-2xl"
      />

      <div className="overflow-hidden rounded-2xl border-[3px] border-black bg-[#1b1b1b] shadow-[0_10px_0_rgba(0,0,0,0.25),0_28px_44px_-20px_rgba(0,0,0,0.5)]">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span
            className="ml-3 text-xs text-[#b7b1d0]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Wallet.cs
          </span>
          <span
            className="ml-auto rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#7fd6c0]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            C#
          </span>
        </div>

        {/* code body */}
        <pre
          className="overflow-x-auto px-4 py-4 text-[12.5px] leading-6 text-[#e9e5f4] sm:text-[13px]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <code className="grid grid-cols-[1.4rem_1fr] gap-x-4">
            {lines.map((line, i) => (
              <div key={i} className="contents">
                <span className="select-none text-right text-[#6f6a8f]">
                  {i + 1}
                </span>
                <span className="whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* floating status badge */}
      <div className="animate-floaty glass absolute -bottom-6 -left-3 flex items-center gap-2 px-3 py-2 text-xs sm:-left-8">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-lego-green text-white">
          ✓
        </span>
        <span className="font-semibold text-fg">
          單元測試 <b className="text-lego-green">87 passing</b>
        </span>
      </div>
    </div>
  );
}

/* Playful pink cat batting a ball of yarn — pure CSS animation. */
export function CatPlay(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 220 170"
      fill="none"
      aria-hidden
      className={`cat-play ${props.className ?? ""}`}
      {...props}
    >
      {/* ground shadow */}
      <ellipse cx="104" cy="152" rx="92" ry="8" fill="#f0b350" fillOpacity="0.13" />

      {/* tail (left side) */}
      <path
        className="cat-tail"
        d="M60 140C30 138 22 108 34 90c6-9 18-7 18 5"
        stroke="#efe4cf"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* body */}
      <ellipse cx="82" cy="132" rx="31" ry="21" fill="#efe4cf" />
      <ellipse cx="88" cy="104" rx="22" ry="25" fill="#efe4cf" />

      {/* resting front paws */}
      <ellipse cx="78" cy="147" rx="8" ry="5.5" fill="#dccdb2" />
      <ellipse cx="94" cy="147" rx="8" ry="5.5" fill="#dccdb2" />

      {/* raised paw that taps the yarn */}
      <g className="cat-paw">
        <path
          d="M94 108q18 4 30 16"
          stroke="#efe4cf"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <ellipse cx="126" cy="126" rx="9" ry="7" fill="#dccdb2" />
      </g>

      {/* head */}
      <g className="cat-head">
        <path className="cat-ear-l" d="M80 62 72 38 98 56z" fill="#efe4cf" />
        <path className="cat-ear-l" d="M82 56 78 43 92 54z" fill="#f0b350" />
        <path className="cat-ear-r" d="M118 62 126 38 100 56z" fill="#efe4cf" />
        <path className="cat-ear-r" d="M116 56 120 43 106 54z" fill="#f0b350" />
        <circle cx="99" cy="78" r="24" fill="#efe4cf" />
        <ellipse className="cat-eye" cx="91" cy="77" rx="3" ry="4.6" fill="#2b2320" />
        <ellipse className="cat-eye" cx="107" cy="77" rx="3" ry="4.6" fill="#2b2320" />
        <path d="M96 87h6l-3 4z" fill="#f0b350" />
        <g stroke="#c7b79c" strokeWidth="1.5" strokeLinecap="round">
          <path d="M82 84 66 82M82 89 67 92M116 84 132 82M116 89 131 92" />
        </g>
      </g>

      {/* yarn ball (right side, on the ground) */}
      <g className="cat-yarn">
        <g className="cat-yarn-spin">
          <circle cx="150" cy="138" r="13" fill="#5fd6c4" />
          <g stroke="#a9e8dd" strokeWidth="1.8" fill="none">
            <path d="M140 133c6 3 13 10 16 17M143 127c8 3 16 13 18 21M150 126c3 7 8 18 6 25" />
          </g>
        </g>
        <path
          d="M163 137c12 2 18-5 16-14"
          stroke="#5fd6c4"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

/* Decorative botanical sprig, echoing the reference's leaf line-art. */
export function LeafSprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 200" fill="none" aria-hidden {...props}>
      <path
        d="M20 190C20 120 40 60 110 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[
        "M46 132c-14-6-24-2-30 10 13 5 24 2 30-10Z",
        "M58 104c-15-4-25 1-29 14 14 3 24-2 29-14Z",
        "M74 78c-15-2-24 5-27 18 14 1 23-5 27-18Z",
        "M92 54c-14 0-23 8-24 21 14-1 21-8 24-21Z",
        "M62 120c14-7 19-17 16-30-13 6-19 17-16 30Z",
        "M76 92c13-8 17-19 13-31-12 7-17 18-13 31Z",
        "M92 66c12-9 15-20 10-32-11 8-15 20-10 32Z",
      ].map((d, i) => (
        <path key={i} d={d} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
