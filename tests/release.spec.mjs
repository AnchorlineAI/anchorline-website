import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const publicRoutes = [
  "/",
  "/growth-engine/",
  "/growth-engine/b2b/",
  "/growth-engine/local/",
  "/approach/",
  "/about/",
  "/growth-audit/",
  "/privacy/",
  "/terms/",
];

test("preview output remains private and identifies itself as a preview", async ({
  page,
  request,
}) => {
  for (const route of publicRoutes) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow, noarchive",
    );
    await expect(page.locator(".preview-bar")).toContainText("Deploy Preview");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^(http:\/\/localhost:4321|https:\/\/deploy-preview-5--spontaneous-daifuku-666a8c\.netlify\.app)\//,
    );
  }
  await page.goto("/growth-audit/received/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow, noarchive",
  );
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toBe("User-agent: *\nDisallow: /\n");
});

test("Privacy, Terms, footer links, and Client Login are present", async ({
  page,
}) => {
  await page.goto("/privacy/");
  await expect(
    page.getByRole("heading", { name: "Privacy, in plain language." }),
  ).toBeVisible();
  await expect(
    page.getByText("Owner review required before production release."),
  ).toBeVisible();
  await page.goto("/terms/");
  await expect(
    page.getByRole("heading", { name: "Terms for using this site." }),
  ).toBeVisible();
  await expect(
    page.getByText("Owner review required before production release."),
  ).toBeVisible();
  await expect(page.locator('a[href="/privacy/"]')).toHaveCount(1);
  await expect(page.locator('a[href="/terms/"]')).toHaveCount(1);
  await expect(
    page.locator('a[href="https://amg.anchorlineai.com"]'),
  ).toHaveAttribute("target", "_blank");
});

test("Growth Audit source contract remains byte-identical", async () => {
  const expected = {
    "src/pages/growth-audit/index.astro":
      "9fa6ef929479151a6357aec72870cecaca369b8e5ee0c32b03ef9fa8f88a578c",
    "src/scripts/site.js":
      "88a746efc5ade5b6db647a4f0e49452da709a260a06f934ee73d0cd2215524c9",
    "src/settings.ts":
      "2342ae2cccc2a37e73f4f7f989d7782f2e524458a1f9dfc95cffc78b13f97936",
  };
  for (const [path, hash] of Object.entries(expected)) {
    const bytes = await readFile(new URL(`../${path}`, import.meta.url));
    expect(createHash("sha256").update(bytes).digest("hex"), path).toBe(hash);
  }
});

test("no private reference package, analytics, or stale product name is exposed", async ({
  page,
}) => {
  const html = [];
  for (const route of publicRoutes) {
    await page.goto(route);
    html.push(await page.content());
  }
  const source = html.join("\n");
  expect(source).not.toContain("2ndbrainos-homepage-reference");
  expect(source).not.toContain("Anchorline AI Growth Engine");
  expect(source).not.toContain("googletagmanager.com");
  expect(source).not.toContain("google-analytics.com");
});
