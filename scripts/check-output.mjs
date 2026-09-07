import { readdir, readFile, stat } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
const root = new URL("../dist/", import.meta.url).pathname;
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
  "about/index.html",
  "growth-audit/index.html",
  "growth-audit/received/index.html",
  "404.html",
];
for (const f of expected)
  assert(all.includes(path.join(root, f)), `Missing ${f}`);
for (const file of htmls) {
  const text = await readFile(file, "utf8");
  assert.equal(
    (text.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `Exactly one H1: ${file}`,
  );
  assert(text.includes("noindex, nofollow, noarchive"), `Noindex: ${file}`);
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
    `No production analytics: ${file}`,
  );
  assert(
    !text.includes("request-access") && !text.includes("anchorline-insider"),
    `No legacy form: ${file}`,
  );
  assert(
    !/href="\/(privacy|terms)\//.test(text),
    `No placeholder policy links: ${file}`,
  );
}
const form = await readFile(path.join(root, "growth-audit/index.html"), "utf8");
assert(form.includes('name="growth-audit"'));
assert(form.includes('data-submission-enabled="true"'));
assert(form.includes('name="bot-field"'), "Growth Audit honeypot missing");
assert(
  form.includes(">Request Your Growth Audit<"),
  "Live Growth Audit submit label missing",
);
assert(!all.some((f) => f.includes("/privacy/") || f.includes("/terms/")));
console.log(
  `Static output checks passed: ${htmls.length} HTML documents; seven review pages plus 404; noindex, canonical, schema, form guard, and protected-link scope.`,
);
