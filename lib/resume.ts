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
  "我們來一起進行一場 Code Review 吧！我準備了一個支付錢包的 POC，裡面運用了 OOP、DDD 等相關架構與技術，我有滿滿的乾貨想和你（貴公司）一起討論交流！",
  "我熱愛拆解複雜的業務邏輯，並專注於核心業務的優化與落地。在開發過程中，我享受將高複雜度的專案抽絲剝繭、化繁為簡的過程；在降低系統複雜度的同時，能更集中資源為公司創造商業價值。",
  "身為一名重視軟體品質與架構的工程師，我始終追求技術與商業目標的平衡。期待能加入重視工程文化、樂於技術交流的團隊，一起打造高效且具備高度可擴展性的系統。",
];

export type Stat = { value?: string; target?: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { target: 6, suffix: " 年+", label: "後端開發實務經驗" },
  { target: 1000, suffix: " 萬+", label: "筆資料清理與歸檔" },
  { value: "DDD · CQRS", label: "架構導入與重構實績" },
];

export type ProjectGroup = { label: string; points: string[] };
export type Project = {
  org: string;
  role: string;
  summary?: string;
  groups: ProjectGroup[];
};

export const PROJECTS: Project[] = [
  {
    org: "永慶房屋",
    role: "資深軟體工程師",
    summary: "好房網買屋頻道「房屋搜尋與排序」優化",
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
          "處理上千萬筆的台水資料，利用 SQL Server 將水資料進行拆分歸檔，作為報表分析使用。",
        ],
      },
      { label: "經濟地理資訊系統", points: [] },
    ],
  },
];

export type TimelineItem = { title: string; org: string; period: string };

export const WORK: TimelineItem[] = [
  { title: "資深軟體工程師", org: "永慶房屋", period: "2022.03 – 2026.08" },
  { title: "全端工程師", org: "瑞竣科技", period: "2019.04 – 2020.10" },
];

export const EDUCATION: TimelineItem[] = [
  { title: "軟體工程師戰鬥營 學員", org: "結訓作品", period: "2018.08 – 2019.02" },
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
    pr.groups.forEach((g) => {
      L.push(`- ${g.label}`);
      g.points.forEach((pt) => L.push(`  - ${pt}`));
    });
  });

  L.push("", "## 工作經歷");
  WORK.forEach((w) => L.push(`- ${w.period}　${w.title}／${w.org}`));

  L.push("", "## 學歷");
  EDUCATION.forEach((e) => L.push(`- ${e.period}　${e.title}／${e.org}`));

  L.push("", "## 技術能力");
  SKILLS.forEach((grp) => L.push(`- ${grp.label}：${grp.items.join("、")}`));

  L.push("", "## 聯絡方式");
  CONTACTS.forEach((c) => L.push(`- ${c.label}（${c.href}）`));

  return L.join("\n");
}

/** Built once at module load — content is static, ~1–2 KB. */
export const RESUME_CONTEXT = buildResumeContext();
