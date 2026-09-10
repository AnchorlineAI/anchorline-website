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
  const googleLoader =
    "https://www.googletagmanager.com/gtag/js?id=G-KPQ0G7C2YY";
  if (production) {
    assert.equal(
      (
        text.match(
          new RegExp(googleLoader.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
        ) || []
      ).length,
      1,
      `Exactly one production GA4 loader: ${file}`,
    );
    assert(
      text.includes("gtag('config', 'G-KPQ0G7C2YY')"),
      `GA4 config: ${file}`,
    );
  } else {
    assert(!text.includes(googleLoader), `No GA4 on preview: ${file}`);
  }
  assert(!text.includes("GTM-"), `No Google Tag Manager container: ${file}`);
  assert(
    !text.includes("connect.facebook.net") &&
      !text.includes("clarity.ms") &&
      !text.includes("hotjar.com"),
    `No extra trackers: ${file}`,
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
const siteScript = await readFile(
  new URL("../src/scripts/site.js", import.meta.url),
  "utf8",
);
assert(
  siteScript.includes('window.gtag("event", "growth_audit_submit"'),
  "Confirmed Growth Audit GA4 event missing",
);
assert(
  siteScript.includes('if (typeof window.gtag === "function")'),
  "Growth Audit GA4 event must be guarded by the standard gtag function",
);
assert(
  siteScript.indexOf('window.gtag("event", "growth_audit_submit"') >
    siteScript.indexOf("if (!response.ok)"),
  "Growth Audit GA4 event must follow backend acceptance",
);
for (const internalText of [
  "test-form isolation",
  "The test could not be submitted",
  "Check the test records before retrying",
])
  assert(
    !siteScript.includes(internalText),
    `Internal form language remains: ${internalText}`,
  );
for (const file of htmls) {
  const text = await readFile(file, "utf8");
  assert(
    text.includes("https://anchorlineai.com/brand/mark.webp"),
    `Organization logo must use the live canonical mark: ${file}`,
  );
  assert(
    !text.includes("https://anchorlineai.com/Anchorline_Logo.PNG"),
    `Broken legacy Organization logo URL: ${file}`,
  );
}
const redirects = await readFile(path.join(root, "_redirects"), "utf8");
assert(
  redirects.includes("/command https://amg.anchorlineai.com/ 301!"),
  "Legacy /command redirect missing",
);
const receipt = await readFile(
  path.join(root, "growth-audit/received/index.html"),
  "utf8",
);
assert(receipt.includes("noindex, nofollow, noarchive"));
assert(
  !receipt.includes("growth_audit_submit"),
  "Receipt page must not emit the Growth Audit GA4 event",
);
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
