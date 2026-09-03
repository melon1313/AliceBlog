import { Logo, CONTACT_ICONS } from "@/components/icons";
import { NAV, CONTACTS } from "@/components/site-data";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-hair bg-bg-alt/70">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-sm font-semibold tracking-[0.16em] text-fg">
                ALICE 程式簡單說
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-fg-dim">
              資深後端工程師 · 專注 DDD、CQRS 與系統重構。
              這裡分享後端架構與工程實踐的技術筆記。
            </p>
            <p className="mt-4 text-sm italic text-cyan/90">
              「堅持把事情做對做好，而不是做完！」
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-fg-faint">
              導覽
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-dim">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-cyan">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-fg-faint">
              聯絡
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-dim">
              {CONTACTS.map((c) => {
                const Icon = CONTACT_ICONS[c.key];
                return (
                  <li key={c.key}>
                    <a
                      href={c.href}
                      className="flex items-center gap-2.5 transition-colors hover:text-cyan"
                      {...(c.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <Icon className="shrink-0 opacity-70" />
                      <span className="truncate">{c.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hair pt-6 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} 鐘怡茜 Alice Chung</span>
          <span>Built with Next.js &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
