import { Chevron, CodePanel, CONTACT_ICONS } from "@/components/icons";
import { CONTACTS } from "@/components/site-data";
import { Parallax, Reveal, CountUp } from "@/components/motion";
import {
  ABOUT,
  STATS,
  PROJECTS,
  WORK,
  EDUCATION,
  SKILLS,
  HERO,
  PROFILE,
  type Project,
} from "@/lib/resume";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <span id="top" className="block" />

      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Parallax speed={-0.18} className="absolute inset-x-0 -inset-y-40">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(58% 48% at 10% 2%, rgba(95,214,196,0.16), transparent 60%), radial-gradient(52% 50% at 92% 100%, rgba(240,179,80,0.13), transparent 60%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(191,233,226,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(191,233,226,0.035) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
                WebkitMaskImage:
                  "radial-gradient(circle at 55% 22%, #000 22%, transparent 74%)",
                maskImage:
                  "radial-gradient(circle at 55% 22%, #000 22%, transparent 74%)",
              }}
            />
            <svg
              viewBox="0 0 600 600"
              className="absolute -right-40 -top-52 h-[150%] w-auto text-hair"
              fill="none"
              aria-hidden
            >
              {[150, 230, 320, 420].map((r) => (
                <circle
                  key={r}
                  cx="420"
                  cy="180"
                  r={r}
                  stroke="currentColor"
                  strokeOpacity="0.5"
                />
              ))}
            </svg>
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[24vw] font-black leading-none tracking-tight text-fg/[0.02]"
            >
              ALICE
            </span>
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
          <Parallax speed={0.14} className="absolute inset-0">
            {[
              "left-[12%] top-[22%]",
              "left-[28%] top-[64%]",
              "left-[47%] top-[16%]",
              "left-[63%] top-[48%]",
              "left-[78%] top-[28%]",
              "left-[88%] top-[70%]",
            ].map((pos, i) => (
              <span
                key={pos}
                className={`animate-twinkle absolute h-1 w-1 rounded-full bg-cyan ${pos}`}
                style={{ animationDelay: `${i * 0.6}s` }}
              />
            ))}
          </Parallax>
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-24">
          <div>
            <p className="hero-in inline-flex items-center gap-2 rounded-full border border-hair bg-white/5 px-3 py-1 font-display text-[11px] font-semibold tracking-[0.28em] text-cyan backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan" />
              BACKEND ENGINEER
            </p>
            <h1
              className="hero-in mt-5 text-4xl font-bold leading-[1.2] text-fg sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              嗨，我是 <span className="text-gradient">鐘怡茜</span>
              <br />
              資深後端工程師
              <span className="caret" aria-hidden />
            </h1>
            <p
              className="hero-in mt-3 font-display text-sm font-semibold tracking-[0.3em] text-fg-dim"
              style={{ animationDelay: "160ms" }}
            >
              ALICE CHUNG
            </p>

            <p
              className="hero-in mt-6 max-w-xl text-[17px] leading-8 text-fg-dim"
              style={{ animationDelay: "240ms" }}
            >
              {HERO.tagline}
            </p>
            <p
              className="hero-in mt-4 text-base font-medium text-fg"
              style={{ animationDelay: "320ms" }}
            >
              「{PROFILE.philosophy}」
            </p>

            <div
              className="hero-in mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "400ms" }}
            >
              <a href="#projects" className="btn btn-primary">
                查看專案經驗
              </a>
              <a href="#contact" className="btn btn-ghost">
                聯絡我
              </a>
            </div>

            <dl
              className="hero-in mt-12 grid max-w-lg grid-cols-3 gap-x-3 gap-y-6 border-t border-hair pt-8"
              style={{ animationDelay: "480ms" }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-base font-bold text-fg sm:text-2xl">
                    {s.target != null ? (
                      <span className="text-gradient">
                        <CountUp target={s.target} suffix={s.suffix} />
                      </span>
                    ) : (
                      <span className="text-gradient">{s.value}</span>
                    )}
                  </dt>
                  <dd className="mt-1 text-[11px] leading-5 text-fg-dim sm:text-xs">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* code editor panel */}
          <Parallax speed={0.05} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <CodePanel />
          </Parallax>
        </div>

      </section>

      {/* ============================ ABOUT ============================ */}
      <section id="about" className="relative border-y border-hair bg-bg-alt/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <SectionHeading eyebrow="About Me" title="關於我" />
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal delay={60}>
              <p className="text-xl font-bold leading-relaxed text-fg sm:text-2xl">
                把複雜的系統
                <span className="text-gradient">「化繁為簡」</span>，
                在架構與商業價值之間取得平衡。
              </p>
            </Reveal>
            <div className="space-y-5">
              <Reveal delay={120}>
                <div className="glass rounded-2xl border-l-2 border-l-cyan p-5 text-[15px] leading-7 text-fg">
                  {ABOUT[0]}
                </div>
              </Reveal>
              {ABOUT.slice(1).map((p, i) => (
                <Reveal key={i} delay={180 + i * 80}>
                  <p className="text-[15px] leading-7 text-fg-dim">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================== PROJECTS ========================== */}
      <section id="projects" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <SectionHeading eyebrow="Projects" title="專案經驗" />
          </Reveal>
          <div className="mt-10 space-y-8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.org} delay={i * 90}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= QUOTE BAND ======================== */}
      <section className="relative isolate flex min-h-[72vh] items-center justify-center overflow-hidden border-y border-hair bg-bg-alt">
        {/* layer 1 — giant bracket glyph, slowest */}
        <Parallax
          speed={-0.32}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="select-none font-display text-[42vw] font-black leading-none text-fg/[0.03] sm:text-[32vw] lg:text-[24vw]">
            「」
          </span>
        </Parallax>

        {/* layer 2 — thin ring, slow */}
        <Parallax speed={-0.2} className="pointer-events-none absolute inset-0">
          <svg
            viewBox="0 0 800 800"
            className="absolute left-1/2 top-1/2 h-[160%] w-auto -translate-x-1/2 -translate-y-1/2 text-hair"
            fill="none"
            aria-hidden
          >
            {[220, 320, 430].map((r) => (
              <circle
                key={r}
                cx="400"
                cy="400"
                r={r}
                stroke="currentColor"
                strokeOpacity="0.6"
                strokeDasharray={r === 320 ? "4 10" : undefined}
              />
            ))}
          </svg>
        </Parallax>

        {/* layer 3 — drifting glows, medium */}
        <Parallax speed={-0.12} className="pointer-events-none absolute inset-0">
          <div className="absolute left-[6%] top-[8%] h-64 w-64 rounded-full bg-violet/12 blur-3xl" />
          <div className="absolute bottom-[4%] right-[4%] h-72 w-72 rounded-full bg-cyan/12 blur-3xl" />
        </Parallax>

        {/* layer 4 — masked grid, static */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(191,233,226,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(191,233,226,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, #000 15%, transparent 68%)",
            maskImage:
              "radial-gradient(circle at 50% 50%, #000 15%, transparent 68%)",
          }}
        />

        {/* layer 5 — twinkle dots, faster */}
        <Parallax speed={0.16} className="pointer-events-none absolute inset-0">
          {["left-[16%] top-[26%]", "left-[80%] top-[30%]", "left-[70%] top-[74%]", "left-[24%] top-[70%]"].map(
            (pos, i) => (
              <span
                key={pos}
                className={`animate-twinkle absolute h-1 w-1 rounded-full bg-cyan ${pos}`}
                style={{ animationDelay: `${i * 0.7}s` }}
              />
            ),
          )}
        </Parallax>

        {/* content — slight counter-parallax */}
        <Parallax speed={0.06} className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <Reveal>
            <p className="font-display text-xs font-semibold tracking-[0.4em] text-cyan">
              PHILOSOPHY
            </p>
            <p className="mt-7 text-3xl font-black leading-[1.5] text-fg sm:text-4xl lg:text-5xl">
              「堅持把事情做<span className="text-gradient">對</span>做
              <span className="text-gradient">好</span>，
              <br className="hidden sm:block" />
              而不是做完！」
            </p>
            <span className="mx-auto mt-8 block h-px w-16 bg-gradient-to-r from-cyan to-violet" />
            <p className="mt-6 text-sm text-fg-dim">
              — 我對每一段程式碼、每一次架構決策的要求
            </p>
          </Reveal>
        </Parallax>
      </section>

      {/* ===================== EXPERIENCE / EDUCATION ================= */}
      <section id="experience" className="relative bg-bg-alt/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <SectionHeading eyebrow="Experience & Education" title="經歷" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
            <Reveal delay={60}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] text-cyan">
                  工作經歷
                </h3>
                <Timeline items={WORK} />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] text-cyan">
                  求學經歷
                </h3>
                <Timeline items={EDUCATION} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ SKILLS ========================== */}
      <section id="skills" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <SectionHeading eyebrow="Tech Stack" title="使用技術" />
          </Reveal>
          <Reveal delay={80}>
            <dl className="glass mt-10 divide-y divide-hair rounded-2xl">
              {SKILLS.map((group) => (
                <div
                  key={group.label}
                  className="gap-3 p-5 sm:grid sm:grid-cols-[8rem_1fr] sm:p-6"
                >
                  <dt className="mb-2 text-sm font-semibold tracking-wide text-fg-dim sm:mb-0 sm:pt-1">
                    {group.label}
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="chip rounded-full px-3 py-1 text-[13px] text-fg-dim"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* =========================== CONTACT ========================= */}
      <section id="contact" className="relative overflow-hidden border-t border-hair">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-cyan/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-violet/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <Reveal>
            <p className="font-display text-xs font-semibold tracking-[0.32em] text-cyan">
              LET&apos;S TALK
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-snug text-fg sm:text-4xl">
              想聊聊系統架構，或來場{" "}
              <span className="text-gradient">Code Review</span>？
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-fg-dim">
              我準備了一個支付錢包的 POC，運用了 OOP、DDD 等架構與技術，
              很樂意和你（貴公司）一起討論交流。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:alicechung135@gmail.com" className="btn btn-primary">
                寄信給我
              </a>
              <a
                href="https://github.com/melon1313"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                查看 GitHub
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-12 grid gap-3 border-t border-hair pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {CONTACTS.map((c) => {
                const Icon = CONTACT_ICONS[c.key];
                return (
                  <li key={c.key}>
                    <a
                      href={c.href}
                      className="glass flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm text-fg-dim transition-colors hover:text-cyan"
                      {...(c.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-cyan">
                        <Icon />
                      </span>
                      <span className="truncate">{c.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <Chevron className="animate-chev shrink-0 text-cyan" />
      <h2 className="tracking-title text-2xl font-bold">
        <span className="text-gradient">{title}</span>
      </h2>
      <span className="font-display text-[11px] font-medium tracking-[0.25em] text-fg-faint">
        {eyebrow.toUpperCase()}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 sm:p-8">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="h-2.5 w-2.5 shrink-0 translate-y-[-2px] rounded-full bg-gradient-to-br from-cyan to-violet" />
        <h3 className="text-lg font-bold text-fg">{project.org}</h3>
        <span className="text-sm font-medium text-cyan">{project.role}</span>
      </header>

      {project.summary && (
        <p className="mt-2 border-b border-hair pb-3 text-sm font-medium text-fg-dim">
          {project.summary}
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {project.groups.map((g) => (
          <div key={g.label} className="rounded-xl bg-white/[0.03] p-4">
            <p className="text-[13px] font-semibold text-violet">{g.label}</p>
            {g.points.length > 0 && (
              <ul className="mt-2 space-y-2">
                {g.points.map((pt, i) => (
                  <li
                    key={i}
                    className="relative pl-4 text-[13px] leading-6 text-fg-dim"
                  >
                    <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full border border-cyan" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function Timeline({
  items,
}: {
  items: { title: string; org: string; period: string }[];
}) {
  return (
    <ul className="space-y-5">
      {items.map((it) => (
        <li key={it.title} className="relative border-l-2 border-hair pl-5">
          <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-cyan to-violet" />
          <p className="text-[11px] tracking-wide text-fg-faint">{it.period}</p>
          <p className="mt-0.5 text-[15px] font-semibold text-fg">{it.title}</p>
          <p className="text-[13px] text-fg-dim">{it.org}</p>
        </li>
      ))}
    </ul>
  );
}
