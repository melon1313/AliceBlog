This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 履歷 AI 助理（Gemini）

網站右下角的「問我的履歷」助理有兩個功能：**問答**（串流回答，只根據 `lib/resume.ts` 的履歷內容）與
**JD 比對**（貼上職缺描述，回傳結構化契合度分析）。

### 設定

1. 到 [Google AI Studio](https://aistudio.google.com/apikey) 建立一組 API key。
2. 在專案根目錄建立 `.env.local`（不會被 commit）：

   ```
   GEMINI_API_KEY=你的金鑰
   # 選用，預設 gemini-flash-lite-latest
   GEMINI_MODEL=
   ```

3. `npm run dev`，開 http://localhost:3000，點右下角的助理。

部署到 Vercel 時，在 **Settings → Environment Variables** 加 `GEMINI_API_KEY`（Production + Preview），
然後重新部署。金鑰只在伺服器端使用（`lib/gemini.ts`），**切勿加 `NEXT_PUBLIC_` 前綴**。

### 相關檔案與注意事項

- Route handlers：`app/api/chat`（串流）、`app/api/jd-match`（JSON）。皆 Node runtime。
- 履歷內容的單一來源是 `lib/resume.ts`；`app/page.tsx` 與 AI 提示都從這裡讀，兩邊不會脫節。
- 防濫用是輕量做法：輸入長度上限、輸出 token 上限、同源檢查，加上 `lib/rate-limit.ts` 的
  **記憶體內**單一 IP 速率限制。記憶體狀態是 per serverless instance，冷啟動 / 部署會重置，
  實際上限約等於 `limit × 同時存活的 instance 數`。要更嚴謹的話，把 `lib/rate-limit.ts`
  內部換成 Vercel KV / Upstash 即可，呼叫端不用動。另建議在 Google Cloud 設定預算警示。

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
