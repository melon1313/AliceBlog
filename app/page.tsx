import { CodePanel } from "@/components/icons";
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
          {/* big translucent bricks, slowest */}
          <Parallax speed={-0.26} className="absolute inset-0">
            <div className="absolute -left-24 -top-24 h-64 w-96 -rotate-6 rounded-2xl bg-amber/25" />
            <div className="absolute -bottom-28 right-[8%] h-56 w-80 rotate-6 rounded-2xl bg-lego-red/12" />
          </Parallax>
          {/* medium bricks */}
          <Parallax speed={-0.14} className="absolute inset-0">
            <div className="absolute left-[38%] top-[8%] h-40 w-56 rotate-3 rounded-2xl bg-cyan/12" />
            <div className="absolute bottom-[14%] left-[4%] h-36 w-48 -rotate-6 rounded-2xl bg-lego-green/12" />
          </Parallax>
          {/* stud dot layer, foreground drift */}
          <Parallax speed={0.12} className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle 5px at 12px 12px, rgba(27,27,27,0.06) 0 4px, transparent 5px)",
                backgroundSize: "44px 44px",
                WebkitMaskImage:
                  "radial-gradient(circle at 62% 28%, #000 14%, transparent 66%)",
                maskImage:
                  "radial-gradient(circle at 62% 28%, #000 14%, transparent 66%)",
              }}
            />
          </Parallax>
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-28 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-36 lg:pt-24">
          <div>
            <p className="hero-in inline-flex items-center gap-2 rounded-md border-2 border-hair bg-white/[0.04] px-3 py-1 font-display text-[11px] font-extrabold tracking-[0.28em] text-cyan">
              <span className="h-2 w-2 animate-pulse-glow rounded-[3px] bg-cyan" />
              BACKEND ENGINEER
            </p>
            <h1
              className="hero-in mt-5 text-4xl font-black leading-[1.2] text-fg sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              嗨，我是 <span className="text-lego-yellow">鐘怡茜</span>
              <br />
              <span className="text-lego-blue">資深後端工程師</span>
              <span className="caret" aria-hidden />
            </h1>
            <p
              className="hero-in mt-3 font-display text-sm font-bold tracking-[0.3em] text-fg"
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
              {STATS.map((s, i) => {
                const tone = ["text-lego-yellow", "text-lego-blue", "text-lego-green"][i];
                return (
                  <div key={s.label}>
                    <dt className={`text-base font-black sm:text-2xl ${tone}`}>
                      {s.target != null ? (
                        <CountUp target={s.target} suffix={s.suffix} />
                      ) : (
                        s.value
                      )}
                    </dt>
                    <dd className="mt-1 text-[11px] leading-5 text-fg-dim sm:text-xs">
                      {s.label}
                    </dd>
                  </div>
                );
              })}
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
            <SectionHeading eyebrow="About Me" title="關於我" tone="text-lego-red" />
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
                <div className="glass rounded-2xl border-l-2 border-l-accent p-5 text-[15px] leading-7 text-fg">
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
            <SectionHeading eyebrow="Projects" title="專案經驗" tone="text-accent" />
          </Reveal>
          <div className="mt-10 space-y-8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.org} delay={i * 90}>
                <ProjectCard project={p} index={i} />
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
          <div className="absolute left-[6%] top-[8%] h-64 w-64 rounded-full bg-lego-green/12 blur-3xl" />
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
                className={`animate-twinkle absolute h-1 w-1 rounded-full bg-amber ${pos}`}
                style={{ animationDelay: `${i * 0.7}s` }}
              />
            ),
          )}
        </Parallax>

        {/* content — slight counter-parallax */}
        <Parallax speed={0.06} className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <Reveal>
            <p className="font-display text-xs font-semibold tracking-[0.4em] text-accent">
              PHILOSOPHY
            </p>
            <p className="mt-7 text-3xl font-black leading-[1.5] text-fg sm:text-4xl lg:text-5xl">
              「堅持把事情做<span className="text-gradient">對</span>做
              <span className="text-gradient">好</span>，
              <br className="hidden sm:block" />
              而不是做完！」
            </p>
            <span className="mx-auto mt-8 block h-px w-16 bg-gradient-to-r from-accent to-lego-red" />
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
            <SectionHeading eyebrow="Experience &amp; Education" title="經歷" tone="text-lego-green" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
            <Reveal delay={60}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] text-accent">
                  工作經歷
                </h3>
                <Timeline items={WORK} />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] text-accent">
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
            <SectionHeading eyebrow="Tech Stack" title="使用技術" tone="text-accent" />
          </Reveal>
          <Reveal delay={80}>
            <dl className="glass mt-10 divide-y divide-hair rounded-2xl">
              {SKILLS.map((group, gi) => {
                const dot = [
                  "bg-lego-red",
                  "bg-accent",
                  "bg-lego-green",
                  "bg-lego-green",
                  "bg-lego-red",
                ][gi];
                return (
                  <div
                    key={group.label}
                    className="gap-3 p-5 sm:grid sm:grid-cols-[8rem_1fr] sm:p-6"
                  >
                    <dt className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wide text-fg sm:mb-0 sm:pt-1">
                      <span className={`h-3 w-3 rounded-[3px] ${dot}`} />
                      {group.label}
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="chip rounded-md px-3 py-1 text-[13px]"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* =========================== CONTACT ========================= */}
      <section id="contact" className="relative overflow-hidden border-t border-hair">
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="font-display text-xs font-extrabold tracking-[0.3em] text-accent">
                FINAL MODULE · CONTACT
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
                Let&apos;s build
                <br />
                something solid.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-7 text-fg-dim">
                歡迎談談團隊正在面對的技術挑戰，或直接約一場 Code Review。
                我準備了一個支付錢包的 POC，運用了 OOP、DDD 等架構與技術。
              </p>
              <p className="mt-4 max-w-md text-[14px] leading-7 text-fg-faint">
                想知道這份履歷跟你的 JD 合不合？右下角的 AI 助理可以幫你比對，或直接問它任何關於我的問題。
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CONTACTS.map((c, i) => {
                  const tone = ["brick-blue", "brick-green", "brick-red", "brick-yellow"][i];
                  const name = ["GitHub", "技術 Blog", "Email", "0975-741-513"][i];
                  return (
                    <li key={c.key}>
                      <a
                        href={c.href}
                        className={`${tone} flex min-h-[112px] flex-col justify-between rounded-xl p-5`}
                        {...(c.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <span aria-hidden className="self-end text-base font-black opacity-45">
                          ↗
                        </span>
                        <span className="text-lg font-black">{name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  tone = "text-accent",
}: {
  eyebrow: string;
  title: string;
  tone?: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className={`h-3 w-3 shrink-0 self-center rounded-[2px] bg-current ${tone}`} />
      <h2 className="tracking-title text-2xl font-black text-fg">{title}</h2>
      <span className="font-display text-[11px] font-medium tracking-[0.25em] text-fg-faint">
        {eyebrow.toUpperCase()}
      </span>
    </div>
  );
}

/* Small square marker tones, cycled per group. */
const DOT_TONE = ["bg-lego-red", "bg-lego-blue", "bg-lego-green", "bg-lego-yellow"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tagSquare = index % 2 === 0 ? "bg-lego-red" : "bg-lego-blue";
  const cols =
    project.groups.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <article className="glass p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className={`h-3.5 w-3.5 shrink-0 rounded-[2px] ${tagSquare}`} />
        <h3 className="text-xl font-black tracking-wide text-fg">{project.org}</h3>
        <span className="text-sm font-medium text-accent">{project.role}</span>
      </header>

      {project.summary && (
        <p className="mt-3 border-b border-hair pb-4 text-sm font-medium text-fg-dim">
          {project.summary}
        </p>
      )}

      <div className={`mt-5 grid auto-rows-fr gap-3 ${cols}`}>
        {project.groups.map((g, gi) => (
          <div
            key={g.label}
            className="flex flex-col border-2 border-hair bg-black/25 p-4 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-[2px] ${
                  DOT_TONE[gi % DOT_TONE.length]
                }`}
              />
              <p className="text-[13px] font-bold leading-tight text-fg">{g.label}</p>
            </div>

            {g.points.length > 0 ? (
              <ul className="mt-3 space-y-2.5">
                {g.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[12.5px] leading-6 text-fg-dim"
                  >
                    <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-fg-faint" />
                    {pt}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 flex flex-1 items-center text-[12px] italic text-fg-faint">
                細節面談時分享
              </p>
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
          <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-accent to-lego-red" />
          <p className="text-[11px] tracking-wide text-fg-faint">{it.period}</p>
          <p className="mt-0.5 text-[15px] font-semibold text-fg">{it.title}</p>
          <p className="text-[13px] text-fg-dim">{it.org}</p>
        </li>
      ))}
    </ul>
  );
}
