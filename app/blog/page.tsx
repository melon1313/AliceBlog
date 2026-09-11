import type { Metadata } from "next";
import Link from "next/link";
import { Chevron } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { PROFILE, WRITING } from "@/lib/resume";

export const metadata: Metadata = {
  title: `文章｜${PROFILE.name} ${PROFILE.nameEn}`,
  description: `${PROFILE.name}（${PROFILE.nameEn}）的技術文章，涵蓋 C#、.NET、RESTful API、gRPC 等主題。`,
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="flex items-baseline gap-3">
        <Chevron className="animate-chev shrink-0 text-cyan" />
        <h1 className="tracking-title text-2xl font-bold">
          <span className="text-gradient">文章</span>
        </h1>
        <span className="font-display text-[11px] font-medium tracking-[0.25em] text-fg-faint">
          WRITING
        </span>
      </div>
      <p className="mt-4 max-w-xl text-[15px] leading-7 text-fg-dim">
        紀錄開發過程中的學習筆記與踩坑經驗，主題涵蓋 C#、.NET、RESTful API 設計、gRPC 與 Docker。
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {WRITING.map((w, i) => (
          <Reveal key={w.slug} delay={i * 60}>
            <Link
              href={`/blog/${w.slug}`}
              className="glass group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 sm:p-8"
            >
              <h2 className="text-lg font-bold text-fg group-hover:text-cyan">
                {w.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-fg-dim">{w.summary}</p>
              {w.tags && w.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {w.tags.map((tag) => (
                    <span key={tag} className="chip rounded-full px-2.5 py-1 text-[12px] text-fg-dim">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
