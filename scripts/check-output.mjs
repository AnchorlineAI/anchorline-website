import { readdir, readFile, stat } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
const root = new URL("../dist/", import.meta.url).pathname;
const production = process.env.CONTEXT === "production";
async function files(dir) {
  const names = await readdir(dir);
  const results = [];
  for (const name of names) {
    const p = path.join(dir, name);
    if ((await stat(p)).isDirectory()) results.push(...(await files(p)));
    else results.push(p);
  }
  return results;
}
const all = await files(root);
const htmls = all.filter((f) => f.endsWith(".html"));
const expected = [
  "index.html",
  "growth-engine/index.html",
  "growth-engine/b2b/index.html",
  "growth-engine/local/index.html",
  "approach/index.html",
  "about/index.html",
  "growth-audit/index.html",
  "privacy/index.html",
  "terms/index.html",
  "insights/index.html",
  "insights/why-most-growth-problems-arent-really-marketing-problems/index.html",
  "insights/seo-aeo-and-geo-what-they-are-and-why-they-need-to-work-together/index.html",
  "insights/the-growth-audit-three-priorities-a-clearer-next-step/index.html",
  "growth-audit/received/index.html",
  "404.html",
  "robots.txt",
];
expected.push("sitemap.xml");
for (const f of expected)
  assert(all.includes(path.join(root, f)), `Missing ${f}`);
for (const file of htmls) {
  const text = await readFile(file, "utf8");
  const relative = path.relative(root, file);
  const sensitive =
    relative === "growth-audit/received/index.html" || relative === "404.html";
  assert.equal(
    (text.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `Exactly one H1: ${file}`,
  );
  assert(/<link[^>]+rel="canonical"/.test(text), `Canonical: ${file}`);
  assert(text.includes("application/ld+json"), `Schema: ${file}`);
  assert(text.includes("<main"), `Main: ${file}`);
  assert(text.includes("Skip to content"), `Skip link: ${file}`);
  assert.equal(
    (text.match(/https:\/\/amg\.anchorlineai\.com/g) || []).length,
    1,
    `Only one footer client link: ${file}`,
  );
  assert(
    !text.includes("googletagmanager.com") &&
      !text.includes("google-analytics.com"),
    `No launch analytics: ${file}`,
  );
  assert(
    !text.includes("request-access") && !text.includes("anchorline-insider"),
    `No legacy form: ${file}`,
  );
  assert(
    !text.includes("Anchorline AI Growth Engine"),
    `No stale product name: ${file}`,
  );
  if (sensitive || !production) {
    assert(text.includes("noindex, nofollow, noarchive"), `Noindex: ${file}`);
  } else {
    assert(
      text.includes('content="index, follow"'),
      `Production index: ${file}`,
    );
    const expectedPath =
      relative === "index.html" ? "" : relative.replace(/index\.html$/, "");
    assert(
      text.includes(`href="https://anchorlineai.com/${expectedPath}"`),
      `Production canonical: ${file}`,
    );
    assert(
      !text.includes("Deploy Preview") && !text.includes("not production"),
      `No preview label: ${file}`,
    );
  }
}
const form = await readFile(path.join(root, "growth-audit/index.html"), "utf8");
assert(form.includes('name="growth-audit"'));
assert(form.includes('data-submission-enabled="true"'));
assert(form.includes('name="bot-field"'), "Growth Audit honeypot missing");
assert(
  form.includes(">Request Your Growth Audit<"),
  "Growth Audit submit label missing",
);
const receipt = await readFile(
  path.join(root, "growth-audit/received/index.html"),
  "utf8",
);
assert(receipt.includes("noindex, nofollow, noarchive"));
if (production) {
  const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
  assert(
    !sitemap.includes("growth-audit/received"),
    "Receipt must not be in sitemap",
  );
  assert(
    sitemap.includes("https://anchorlineai.com/privacy/") &&
      sitemap.includes("https://anchorlineai.com/terms/") &&
      sitemap.includes("https://anchorlineai.com/insights/") &&
      sitemap.includes(
        "https://anchorlineai.com/insights/why-most-growth-problems-arent-really-marketing-problems/",
      ) &&
      sitemap.includes(
        "https://anchorlineai.com/insights/seo-aeo-and-geo-what-they-are-and-why-they-need-to-work-together/",
      ) &&
      sitemap.includes(
        "https://anchorlineai.com/insights/the-growth-audit-three-priorities-a-clearer-next-step/",
      ),
  );
}
const robots = await readFile(path.join(root, "robots.txt"), "utf8");
if (production) {
  assert(
    robots.includes("Allow: /") &&
      robots.includes("Disallow: /growth-audit/received/"),
  );
  assert(!robots.includes("Disallow: /\n"));
} else assert.equal(robots, "User-agent: *\nDisallow: /\n");
console.log(
  `Static output checks passed: ${htmls.length} HTML documents; context=${production ? "production" : "preview"}; metadata, canonicals, policies, form, sitemap, and robots verified.`,
);
