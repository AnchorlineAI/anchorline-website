import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const pages = [
  ["/", "home"],
  ["/growth-engine/", "engine"],
  ["/growth-engine/b2b/", "b2b"],
  ["/growth-engine/local/", "local"],
  ["/approach/", "approach"],
  ["/about/", "about"],
  ["/growth-audit/", "audit"],
];
test("all required destinations are distinct documents with real navigation", async ({
  page,
}) => {
  const headings = new Set();
  for (const [path, key] of pages) {
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.locator("body")).toHaveAttribute("data-page", key);
    headings.add(await page.locator("h1").innerText());
    await expect(page.locator("body")).not.toContainText(
      /AI-powered growth department/i,
    );
  }
  expect(headings.size).toBe(7);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Our Approach" })
    .click();
  await expect(page).toHaveURL(/\/approach\/$/);
  await expect(page.locator("body")).toHaveAttribute("data-page", "approach");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation", exact: true })
    .getByRole("link", { name: "Local Growth" })
    .click();
  await expect(page).toHaveURL(/\/growth-engine\/local\/$/);
  await page.locator('[data-location="local-hero"]').click();
  await expect(page.locator("#audit-type")).toHaveValue("Local Business");
});
test("seven connected stages and explicit illustrative interface disclosure", async ({
  page,
}) => {
  await page.goto("/growth-engine/");
  await expect(page.locator(".r-growth-loop h3")).toHaveText([
    "Attract",
    "Identify",
    "Engage",
    "Convert",
    "Follow up",
    "Learn",
    "Improve",
  ]);
  await expect(page.locator(".v-scene figcaption")).toContainText(
    "not live software or client results",
  );
  await expect(
    page.locator(".v-scene a, .v-scene button, .v-scene input"),
  ).toHaveCount(0);
});
test("audit is calm and preserves honeypot and live contract without POST", async ({
  page,
}) => {
  const posts = [];
  await page.route("**/*", async (route) => {
    if (route.request().method() === "POST") {
      posts.push(route.request().url());
      await route.abort();
    } else await route.continue();
  });
  await page.goto("/growth-audit/?pathway=b2b");
  await expect(
    page.locator(".r-atmosphere, [data-motion-toggle], [data-depth]"),
  ).toHaveCount(0);
  const form = page.locator("[data-audit-form]");
  await expect(form).toHaveAttribute("name", "growth-audit");
  await expect(form).toHaveAttribute("action", "/growth-audit/received/");
  await expect(form).toHaveAttribute("data-submission-enabled", "true");
  await expect(page.locator('[name="bot-field"]')).toHaveCount(1);
  await expect(page.locator("#audit-type")).toHaveValue("B2B");
  await page.locator("[data-form-submit]").click();
  expect(posts).toEqual([]);
  await expect(page.locator("#audit-name")).toBeFocused();
});
test("backend, routing, analytics, dependency and authentic asset baseline is unchanged", async () => {
  const baseline = JSON.parse(
    await readFile(
      new URL("./preservation-baseline.json", import.meta.url),
      "utf8",
    ),
  );
  for (const [path, expected] of Object.entries(baseline)) {
    const bytes = await readFile(new URL("../" + path, import.meta.url));
    expect(createHash("sha256").update(bytes).digest("hex"), path).toBe(
      expected.sha256,
    );
  }
});
test("approved portrait remains unfiltered and uncropped", async ({ page }) => {
  await page.goto("/about/");
  const image = page.locator(".founder-portrait img");
  await expect(image).toHaveAttribute("src", "/kris-mcfadden.webp");
  expect(
    await image.evaluate((el) => ({
      filter: getComputedStyle(el).filter,
      fit: getComputedStyle(el).objectFit,
    })),
  ).toEqual({ filter: "none", fit: "contain" });
});
test("content and distinct navigation remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/");
  await expect(page.locator("h1")).toHaveText(
    "We build the systems that help good organizations grow.",
  );
  await expect(page.locator(".ia-engine-teaser")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Our Approach" })
    .click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "approach");
  await context.close();
});
