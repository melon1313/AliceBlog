import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_TC, Poppins } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "鐘怡茜 Alice Chung ｜ 資深後端工程師",
  description:
    "資深後端工程師鐘怡茜（Alice Chung）的個人部落格與自我介紹：專注於 DDD、CQRS、系統重構與工程品質。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${notoTC.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
