import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

/* ------------------------------------------------------------------ */
/*  Global MDX element overrides for article bodies (`/blog/[slug]`). */
/*  Hand-rolled to match the site's existing design tokens instead of */
/*  pulling in @tailwindcss/typography — same approach as `.glass`/    */
/*  `.chip`/`.btn` in app/globals.css.                                */
/* ------------------------------------------------------------------ */

const components: MDXComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-10 font-display text-2xl font-bold text-fg sm:text-3xl" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 border-t border-hair pt-8 font-display text-xl font-bold text-fg sm:text-2xl"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 text-lg font-semibold text-fg" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 text-[15px] leading-7 text-fg-dim" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-fg-dim" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-fg-dim"
      {...props}
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => <li className="pl-1" {...props} />,
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-fg" {...props} />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-hair" {...props} />
  ),
  // Inline `code` (rehype-pretty-code leaves these untouched).
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[13px] text-cyan"
      {...props}
    />
  ),
  // Fenced code blocks: rehype-pretty-code wraps its own <pre><code>, whose
  // inline background/color styles we keep — this just adds layout/scroll.
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mt-4 overflow-x-auto rounded-xl border border-hair p-4 text-[13px] leading-6 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // Article bodies are static-content MDX, not next/image static imports.
    // eslint-disable-next-line @next/next/no-img-element
    <img className="mt-4 w-full rounded-xl border border-hair" alt="" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
