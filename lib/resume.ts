/* ------------------------------------------------------------------ */
/*  Résumé content — single source of truth                            */
/*                                                                    */
/*  Pure data. No "use client", no Node APIs — imported by both the    */
/*  page (client render) and the AI route handlers (server).           */
/* ------------------------------------------------------------------ */

import { CONTACTS } from "@/components/site-data";

export const PROFILE = {
  name: "鐘怡茜",
  nameEn: "Alice Chung",
  title: "資深後端工程師",
  titleEn: "Senior Backend Engineer",
  yearsExperience: 6,
  focus: ["DDD", "CQRS", "Elasticsearch", "系統重構", "C# / .NET"],
  philosophy: "堅持把事情做對做好，而不是做完！",
} as const;

export const HERO = {
  tagline:
    "我熱愛拆解複雜的業務邏輯，用 DDD、CQRS 與紮實的測試，把高複雜度的系統化繁為簡，為團隊創造真正的商業價值。",
} as const;

export const ABOUT: string[] = [
  "我熱愛拆解複雜的業務邏輯，並專注於核心業務的優化與落地。在開發過程中，我享受將高複雜度的專案抽絲剝繭、化繁為簡的過程；在降低系統複雜度的同時，能更集中資源為公司創造商業價值。",
  "身為一名重視軟體品質與架構的工程師，我始終追求技術與商業目標的平衡。期待能加入重視工程文化、樂於技術交流的團隊，一起打造高效且具備高度可擴展性的系統。",
];

export type Stat = { value?: string; target?: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { target: 6, suffix: " 年+", label: "後端開發實務經驗" },
  { target: 1000, suffix: " 萬+", label: "筆資料清理與歸檔" },
  { value: "DDD · CQRS", label: "架構導入與重構實績" },
];

/** A link whose anchor text is a substring (`label`) of the point's text. */
export type ProjectLink = { label: string; href: string };
/** A bullet point — plain text, or text with one inline link on a substring. */
export type ProjectPoint = string | { text: string; link: ProjectLink };
/** A supporting image shown under a group; links to `href`, falling back to the group's `href`. */
export type ProjectImage = { src: string; alt: string; href?: string };
export type ProjectGroup = {
  label: string;
  /** When set, the group label renders as an external link. */
  href?: string;
  points: ProjectPoint[];
  image?: ProjectImage;
};
export type Project = {
  org: string;
  role: string;
  summary?: string;
  /** When set, the project summary renders as an external link. */
  href?: string;
  groups: ProjectGroup[];
  /** A supporting image shown under the whole card; links to `image.href ?? project.href`. */
  image?: ProjectImage;
};

/** 瑞竣科技「經濟地理資訊系統」報表 PDF（Google Drive）。 */
const EGIS_DOC_URL =
  "https://drive.google.com/file/d/1MtS1XQsdJsl3DW5sbZSYoNENYHLkR_yL/view";

/** 永慶房屋 好房網買屋頻道（房屋搜尋與排序）。 */
const HOUSEFUN_BUY_URL =
  "https://buy.housefun.com.tw/region/%e5%8f%b0%e5%8c%97%e5%b8%82-%e4%b8%ad%e6%ad%a3%e5%8d%80_c/?od=SeqUp";

/** Plain text of a bullet point, regardless of whether it carries a link. */
const pointText = (pt: ProjectPoint): string =>
  typeof pt === "string" ? pt : pt.text;

export const PROJECTS: Project[] = [
  {
    org: "永慶房屋",
    role: "資深軟體工程師",
    summary: "好房網買屋頻道「房屋搜尋與排序」優化",
    href: HOUSEFUN_BUY_URL,
    image: { src: "/housefun_search.png", alt: "好房網買屋頻道搜尋結果頁" },
    groups: [
      {
        label: "業務價值與協作",
        points: [
          "優化終端用戶的買屋搜尋體驗，獲 PM 高度評價，並有效帶動經紀人成交率。",
          "需求溝通與把關：避免拿到需求即無腦開發，透過與 PM 反覆迭代確認規格，在需求變動過程中有效降低系統複雜度。",
        ],
      },
      {
        label: "架構重構與技術導入",
        points: [
          "導入 DDD（Domain-Driven Design）與 Screaming Architecture（by Feature then by Layer），精準拆解複雜業務邏輯並清除冗餘程式碼，大幅提升系統可維護性。",
          "導入 Elasticsearch（ES）與 CQRS 架構，大幅縮短 API 回應時間與載入延遲，顯著提升系統穩定度與查詢效率。",
        ],
      },
      {
        label: "落實 Unit Test",
        points: [
          "建立完善的單元測試，為複雜的業務邏輯重構提供品質護城河，提升系統長期維護性與穩定度。",
        ],
      },
    ],
  },
  {
    org: "瑞竣科技",
    role: "全端工程師",
    groups: [
      {
        label: "台水資料清理",
        points: [
          {
            text: "處理上千萬筆的台水資料，利用 SQL Server 將水資料進行拆分歸檔，作為報表分析使用。",
            link: { label: "報表分析", href: EGIS_DOC_URL },
          },
        ],
        image: {
          src: "/egis_water_report.png",
          alt: "台水資料處理報表片段",
          href: EGIS_DOC_URL,
        },
      },
      {
        label: "經濟地理資訊系統",
        href: EGIS_DOC_URL,
        points: [],
        image: { src: "/egis_report.png", alt: "經濟地理資訊系統報表片段" },
      },
    ],
  },
];

export type WritingItem = {
  title: string;
  summary: string;
  /** 站內文章路由：/blog/{slug}（正文放在 content/writing/{slug}.mdx）。 */
  slug: string;
  /** 原文出處（Notion），文章頁底部歸屬連結用。 */
  sourceUrl: string;
  tags?: string[];
};

/** 技術文章精選 — 全文已轉載至站內 /blog，原文出處見各筆 sourceUrl。 */
export const WRITING: WritingItem[] = [
  {
    title: "在 LINQPad 上安裝測試框架：xUnit",
    summary:
      "記錄公司舊專案升級 .NET 6 過程中，如何在 LINQPad 安裝 xUnit，加快重構驗證的效率。",
    slug: "linqpad-xunit",
    sourceUrl: "https://aliceeazylearn.notion.site/LINQPad-xUnit-bd36b67f7c6e4c879cda9cd669d5f971",
    tags: ["xUnit", "Unit Test", "LINQPad"],
  },
  {
    title: "ASP.NET Core 建立設定檔管理員",
    summary:
      "說明如何建立強型別設定檔管理員取代 IConfiguration 字串索引寫法，提升設定維護性。",
    slug: "aspnet-core-settings-manager",
    sourceUrl: "https://aliceeazylearn.notion.site/ASP-NET-Core-f38d9dc8a95244428987c121fd506f6a",
    tags: ["ASP.NET Core", ".NET 5", "C#"],
  },
  {
    title: "C# 簡單說－泛型類(1)",
    summary:
      "以情境故事解釋泛型的設計動機，說明如何用泛型解決重複程式碼與型別安全問題。",
    slug: "csharp-generics-1",
    sourceUrl: "https://aliceeazylearn.notion.site/C-1-a1815c3ecf6642b4a3cb33f3534a5cb8",
    tags: ["C#"],
  },
  {
    title: "經典 RESTful API 設計－(1) REST 介紹",
    summary: "系統性整理 REST 的 6 個架構約束與 RESTful API 設計原則。",
    slug: "restful-api-rest-intro",
    sourceUrl: "https://aliceeazylearn.notion.site/RESTful-API-1-REST-ea660fef07284bcda8afa4b7d42dbd4e",
    tags: ["C#", "ASP.NET Core"],
  },
  {
    title: "URI、URL、URN 傻傻分不清",
    summary: "釐清 URI/URL/URN 的定義與從屬關係，並舉實例說明正確用法。",
    slug: "uri-url-urn",
    sourceUrl: "https://aliceeazylearn.notion.site/URI-URL-URN-4ad7cb4cb4714fb29c782f143b8b3568",
    tags: ["HTTP"],
  },
  {
    title: "[踩坑] ASP.Net gRPC 服務路徑錯誤",
    summary:
      "排查 gRPC 專案因 Windows 使用者名稱含中文導致 protoc 編譯失敗的除錯過程。",
    slug: "grpc-protoc-path-error",
    sourceUrl:
      "https://aliceeazylearn.notion.site/ASP-Net-gRPC-protoc-gen-grpc-The-filename-directory-name-or-volume-label-syntax-is-incorrect-57239cfc9f50414bae4ba9494a055dc7",
    tags: ["gRPC", "Debug"],
  },
  {
    title: "[踩坑] Docker portainer port 衝突",
    summary:
      "排查 Docker 容器 port 9000 綁定失敗的原因（落在 Windows TCP 保留區段）與解法。",
    slug: "docker-portainer-port-conflict",
    sourceUrl:
      "https://aliceeazylearn.notion.site/Docker-Cannot-start-service-portainer-Ports-are-not-available-listen-tcp-0-0-0-0-9000-8af4e2f75fc84dfa94324449376919da",
    tags: ["Docker", "Debug"],
  },
  {
    title: "[踩坑] grpc.core.rpcexception internal",
    summary:
      "記錄 .NET gRPC Client/Server 未用 SSL/TLS 時因版本設定不符導致連線錯誤的修正方式。",
    slug: "grpc-rpcexception-ssl",
    sourceUrl:
      "https://aliceeazylearn.notion.site/grpc-core-rpcexception-status-statuscode-internal-detail-8ef41134e3c14c36ab05ceab298fed6d",
    tags: ["Debug", "SSL/TLS", "gRPC", ".NET 5"],
  },
];

export type SideProject = { name: string; summary: string; href: string };

/** GitHub 置頂專案（https://github.com/melon1313）。 */
export const SIDE_PROJECTS: SideProject[] = [
  {
    name: "AppSettingsManager",
    summary: "C# 設定檔管理工具，跟「ASP.NET Core 建立設定檔管理員」一文互相呼應。",
    href: "https://github.com/melon1313/AppSettingsManager",
  },
  {
    name: "AspnetMicroservices",
    summary: "微服務架構練習專案。",
    href: "https://github.com/melon1313/AspnetMicroservices",
  },
  {
    name: "Restful_WebAPI_with_DotNetCore",
    summary: "以 .NET Core 實作 RESTful Web API，呼應 REST 系列文章。",
    href: "https://github.com/melon1313/Restful_WebAPI_with_DotNetCore",
  },
  {
    name: "LINQSample",
    summary: "LINQ 語法示範專案，呼應「在 LINQPad 上安裝測試框架」一文。",
    href: "https://github.com/melon1313/LINQSample",
  },
  {
    name: "bs5_project",
    summary: "Bootstrap 5 前端練習專案。",
    href: "https://github.com/melon1313/bs5_project",
  },
  {
    name: "Make-Game-by-CSharp-Winform",
    summary: "以 C# WinForm 開發的小遊戲練習專案。",
    href: "https://github.com/melon1313/Make-Game-by-CSharp-Winform",
  },
];

export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  /** When set, `org` renders as an external link. */
  href?: string;
};

export const WORK: TimelineItem[] = [
  { title: "資深軟體工程師", org: "永慶房屋", period: "2022.03 – 2026.08" },
  { title: "全端工程師", org: "瑞竣科技", period: "2019.04 – 2020.10" },
];

export const EDUCATION: TimelineItem[] = [
  {
    title: "軟體工程師戰鬥營 學員",
    org: "結訓作品",
    period: "2018.08 – 2019.02",
    href: "https://www.youtube.com/watch?v=rnabI-V1zmk",
  },
  { title: "國立臺東大學", org: "資訊管理學系", period: "2013.09 – 2017.06" },
];

export const SKILLS: { label: string; items: string[] }[] = [
  {
    label: "觀念與架構",
    items: ["DDD", "TDD", "SOLID", "AOP", "CQRS", "Screaming Architecture", "RESTful API"],
  },
  { label: "語言與框架", items: ["C#", ".NET Core 3.1+"] },
  { label: "前端", items: ["HTML", "JavaScript", "jQuery"] },
  {
    label: "資料與儲存",
    items: ["SQL Server（T-SQL）", "Elasticsearch", "EventStore", "Redis"],
  },
  { label: "版控與工具", items: ["TFS", "Git", "Docker"] },
];

/* ------------------------------------------------------------------ */
/*  buildResumeContext — deterministic plain-text rendering of the     */
/*  whole résumé, used as the grounding block in the LLM system prompt */
/* ------------------------------------------------------------------ */

export function buildResumeContext(): string {
  const L: string[] = [];

  L.push(`# 候選人：${PROFILE.name}（${PROFILE.nameEn}）— ${PROFILE.title}`);
  L.push(`年資：約 ${PROFILE.yearsExperience} 年後端開發實務經驗`);
  L.push(`專長：${PROFILE.focus.join("、")}`);
  L.push(`座右銘：${PROFILE.philosophy}`);
  L.push(`一句話介紹：${HERO.tagline}`);

  L.push("", "## 關於我");
  ABOUT.forEach((p) => L.push(`- ${p}`));

  L.push("", "## 量化亮點");
  STATS.forEach((s) =>
    L.push(`- ${s.label}：${s.value ?? `${s.target}${s.suffix ?? ""}`}`),
  );

  L.push("", "## 專案經驗");
  PROJECTS.forEach((pr) => {
    L.push(`### ${pr.org} — ${pr.role}${pr.summary ? `（${pr.summary}）` : ""}`);
    const prDoc = pr.href ?? pr.image?.href;
    if (prDoc) L.push(`  參考連結：${prDoc}`);
    pr.groups.forEach((g) => {
      const doc = g.href ?? g.image?.href;
      L.push(`- ${g.label}${doc ? `（文件：${doc}）` : ""}`);
      g.points.forEach((pt) => L.push(`  - ${pointText(pt)}`));
    });
  });

  L.push("", "## 工作經歷");
  WORK.forEach((w) => L.push(`- ${w.period}　${w.title}／${w.org}`));

  L.push("", "## 學歷");
  EDUCATION.forEach((e) =>
    L.push(`- ${e.period}　${e.title}／${e.org}${e.href ? `（${e.href}）` : ""}`),
  );

  L.push("", "## 技術能力");
  SKILLS.forEach((grp) => L.push(`- ${grp.label}：${grp.items.join("、")}`));

  L.push("", "## 技術文章（Notion）");
  WRITING.forEach((w) => L.push(`- ${w.title}：${w.summary}（/blog/${w.slug}）`));

  L.push("", "## GitHub 專案");
  SIDE_PROJECTS.forEach((p) => L.push(`- ${p.name}：${p.summary}（${p.href}）`));

  L.push("", "## 聯絡方式");
  CONTACTS.forEach((c) => L.push(`- ${c.label}（${c.href}）`));

  return L.join("\n");
}

/** Built once at module load — content is static, ~1–2 KB. */
export const RESUME_CONTEXT = buildResumeContext();
