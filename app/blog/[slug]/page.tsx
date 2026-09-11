import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFILE, WRITING } from "@/lib/resume";

export function generateStaticParams() {
  return WRITING.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = WRITING.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title}｜${PROFILE.name} ${PROFILE.nameEn}`,
    description: item.summary,
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const item = WRITING.find((w) => w.slug === slug);
  if (!item) notFound();

  const { default: Body } = await import(`@/content/writing/${slug}.mdx`);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <Link
        href="/blog"
        className="text-sm text-fg-dim transition-colors hover:text-cyan"
      >
        ← 回文章列表
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-fg sm:text-3xl">
        {item.title}
      </h1>

      {item.tags && item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="chip rounded-full px-2.5 py-1 text-[12px] text-fg-dim">
              {tag}
            </span>
          ))}
        </div>
      )}

      <article className="mt-8">
        <Body />
      </article>

      <p className="mt-12 border-t border-hair pt-6 text-[13px] text-fg-faint">
        原文出處：{" "}
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan"
        >
          在 Notion 閱讀原文
        </a>
      </p>
    </div>
  );
}
