import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const target = new URL("../public/", import.meta.url);
const isProduction = process.env.CONTEXT === "production";

await mkdir(target, { recursive: true });

const robots = isProduction
  ? "User-agent: *\nAllow: /\nDisallow: /growth-audit/received/\n\nSitemap: https://anchorlineai.com/sitemap.xml\n"
  : "User-agent: *\nDisallow: /\n";

await writeFile(new URL("robots.txt", target), robots);
await copyFile(
  new URL(isProduction ? "_headers.production" : "_headers.preview", target),
  new URL("_headers", target),
);

if (!isProduction) {
  await rm(new URL("sitemap.xml", target), { force: true });
}
