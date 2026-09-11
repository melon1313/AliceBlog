import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack cannot receive a JS function across the Rust/JS boundary,
    // so rehype/remark plugins must be referenced by package name (string)
    // + serializable options rather than an imported function reference.
    // See node_modules/next/dist/docs/01-app/02-guides/mdx.md
    // ("Using Plugins with Turbopack").
    rehypePlugins: [["rehype-pretty-code", { theme: "github-dark" }]],
  },
});

export default withMDX(nextConfig);
