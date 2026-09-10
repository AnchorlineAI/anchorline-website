import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const detailRoutes = [
  "/growth-engine/",
  "/growth-engine/b2b/",
  "/growth-engine/local/",
  "/approach/",
  "/about/",
  "/insights/",
];

test("Home is a concise six-part introduction and routing surface", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("main>section")).toHaveCount(6);
  await expect(page.locator("main>.r-home-hero")).toHaveCount(1);
  await expect(page.locator("main>#why-connected")).toHaveCount(1);
  await expect(page.locator("main>.ia-engine-teaser")).toHaveCount(1);
  await expect(page.locator("main>#pathways")).toHaveCount(1);
  await expect(page.locator("main>.ia-operator-teaser")).toHaveCount(1);
  await expect(page.locator("main>.audit-close")).toHaveCount(1);
  await expect(
    page.locator(".faq-section,.process-section,.work-section,.r-growth-loop"),
  ).toHaveCount(0);
  await expect(
    page.locator('a[href="/growth-engine/"]', {
      hasText: "Explore the Growth Engine",
    }),
  ).toHaveCount(1);
  await expect(
    page.locator('a[href="/growth-engine/b2b/"]', {
      hasText: "Explore B2B Growth",
    }),
  ).toHaveCount(1);
  await expect(
    page.locator('a[href="/growth-engine/local/"]', {
      hasText: "Explore Local Growth",
    }),
  ).toHaveCount(1);
  await expect(
    page.locator('a[href="/about/"]', { hasText: "Meet Anchorline" }),
  ).toHaveCount(1);
  const height = await page.evaluate(() => document.body.scrollHeight);
  expect(height).toBeLessThan(5500);
});

test("deep content remains on the correct dedicated pages", async ({
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
  await expect(
    page.getByRole("heading", {
      name: "Work you can see. Decisions you can use.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("AI CAPABILITY. HUMAN ACCOUNTABILITY."),
  ).toBeVisible();
  await page.goto("/growth-engine/b2b/");
  await expect(page.getByText("THE B2B ACQUISITION PATH")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Built around your commercial reality.",
    }),
  ).toBeVisible();
  await page.goto("/growth-engine/local/");
  await expect(page.getByText("THE LOCAL GROWTH PATH")).toBeVisible();
  await expect(page.getByText("SEARCH, DEMAND & CONVERSION")).toBeVisible();
  await page.goto("/approach/");
  await expect(page.getByText("FROM CLARITY TO EXECUTION")).toBeVisible();
  await expect(page.getByText("A practical way forward.")).toBeVisible();
  await page.goto("/about/");
  await expect(page.getByText("OPERATING PRINCIPLES")).toBeVisible();
  await expect(page.getByText("OUR FOUNDATION")).toBeVisible();
  await expect(page.getByText("2ndBrainOS operating framework")).toBeVisible();
});

test("desktop navigation exposes all pages and tablet/mobile use the menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(
    page.getByRole("navigation", { name: "Main navigation", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".desktop-nav>a")).toHaveCount(6);
  await expect(page.locator(".menu-toggle")).toBeHidden();
  for (const width of [1024, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Main navigation", exact: true }),
    ).toBeHidden();
    await expect(page.locator(".menu-toggle")).toBeVisible();
    await page.locator(".menu-toggle").click();
    await expect(page.locator(".mobile-nav>a")).toHaveCount(7);
    for (const route of detailRoutes)
      await expect(page.locator(`.mobile-nav a[href="${route}"]`)).toHaveCount(
        1,
      );
  }
});

test("dedicated-page and Growth Audit source contracts are unchanged", async () => {
  const baseline = JSON.parse(
    await readFile(
      new URL("./ia-preservation-baseline.json", import.meta.url),
      "utf8",
    ),
  );
  for (const [path, expected] of Object.entries(baseline)) {
    if (
      path === "netlify.toml" ||
      path === "src/pages/growth-audit/received.astro" ||
      path === "src/pages/growth-audit/index.astro" ||
      path === "src/scripts/site.js" ||
      path === "src/pages/growth-engine/index.astro" ||
      path === "src/pages/growth-engine/b2b.astro" ||
      path === "src/pages/growth-engine/local.astro" ||
      path === "src/pages/about.astro"
    )
      continue;
    const bytes = await readFile(new URL("../" + path, import.meta.url));
    expect(createHash("sha256").update(bytes).digest("hex"), path).toBe(
      expected.sha256,
    );
  }
});
