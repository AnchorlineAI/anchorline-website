import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/growth-engine/",
  "/growth-engine/b2b/",
  "/growth-engine/local/",
  "/approach/",
  "/about/",
  "/growth-audit/",
  "/growth-audit/received/",
  "/insights/",
  "/insights/why-most-growth-problems-arent-really-marketing-problems/",
  "/insights/seo-aeo-and-geo-what-they-are-and-why-they-need-to-work-together/",
  "/insights/the-growth-audit-three-priorities-a-clearer-next-step/",
];
for (const route of routes) {
  test(`desktop structure, links and accessibility ${route}`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      route === "/growth-audit/received/"
        ? "noindex, nofollow, noarchive"
        : process.env.CONTEXT === "production"
          ? "index, follow"
          : "noindex, nofollow, noarchive",
    );
    await expect(
      page.locator('a[href="https://amg.anchorlineai.com"]'),
    ).toHaveCount(1);
    expect(await page.locator('header a[href*="amg."]').count()).toBe(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((x) => ({
        id: x.id,
        nodes: x.nodes.map((n) => ({
          target: n.target,
          failure: n.failureSummary,
        })),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}
for (const width of [320, 390, 768, 1024]) {
  test(`responsive layout and navigation ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
    }
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
  });
}
test("live intake validation prevents incomplete POST", async ({ page }) => {
  const posts = [];
  page.on("request", (r) => {
    if (r.method() === "POST" && r.url() === "http://127.0.0.1:4321/")
      posts.push(r.url());
  });
  await page.goto("/growth-audit/?pathway=local");
  await expect(page.locator("#audit-type")).toHaveValue("Local Business");
  await page.getByRole("button", { name: "Request Your Growth Audit" }).click();
  await expect(page.locator("#audit-name")).toBeFocused();
  await expect(page.locator("#name-error")).toContainText("complete");
  expect(posts).toEqual([]);
});
test("direct receipt does not claim success or count conversion", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.__ga4TestEvents = [];
    window.gtag = (...args) => window.__ga4TestEvents.push(args);
  });
  await page.goto("/growth-audit/received/?request=received");
  await expect(page).toHaveTitle(
    "Growth Audit Request Confirmation | Anchorline Systems",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Confirmation page for Anchorline Growth Audit requests.",
  );
  await expect(page.locator("[data-receipt-title]")).toHaveText(
    "Request confirmation.",
  );
  await expect(page.locator("[data-receipt-message]")).toContainText(
    "No submission has been confirmed",
  );
  await expect(page.locator(".receipt-note")).not.toContainText(
    "Anchorline received your Growth Audit request",
  );
  await expect(page.locator(".receipt-note")).toContainText(
    "Confirmed Growth Audit requests are reviewed",
  );
  expect(
    await page.evaluate(
      () =>
        (window.__anchorlineDiagnostics || []).filter(
          (x) => x.event === "audit_request_success",
        ).length,
    ),
  ).toBe(0);
  expect(
    await page.evaluate(() =>
      window.__ga4TestEvents.filter(
        (args) => args[0] === "event" && args[1] === "growth_audit_submit",
      ),
    ),
  ).toEqual([]);
});
test("pathway and audit click diagnostics are local only", async ({ page }) => {
  const external = [];
  page.on("request", (r) => {
    if (
      !r.url().startsWith("http://127.0.0.1:4321") &&
      !r.url().includes("googletagmanager.com") &&
      !r.url().includes("google-analytics.com") &&
      !r.url().includes("google.com/g/collect")
    )
      external.push(r.url());
  });
  await page.goto("/growth-engine/b2b/");
  expect(
    await page.evaluate(() =>
      window.__anchorlineDiagnostics.some(
        (x) => x.event === "pathway_engagement" && x.pathway === "b2b",
      ),
    ),
  ).toBe(true);
  await page.locator('a[data-location="b2b-hero"]').click();
  await expect(page.locator("#audit-type")).toHaveValue("B2B");
  expect(external).toEqual([]);
});
test("keyboard skip link and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  expect(
    await page
      .locator(".v-intelligence")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
});
