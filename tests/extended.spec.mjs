import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
const routes = [
  "/",
  "/growth-engine/",
  "/growth-engine/b2b/",
  "/growth-engine/local/",
  "/approach/",
  "/about/",
  "/growth-audit/",
  "/growth-audit/received/",
];
test("mobile accessibility and all internal link/asset responses", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const links = new Set();
  const bad = [];
  page.on("response", (r) => {
    if (r.status() >= 400) bad.push({ url: r.url(), status: r.status() });
  });
  for (const route of routes) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((es) => es.map((e) => e.getAttribute("href"))))
      links.add(href);
  }
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
  expect(bad).toEqual([]);
});
for (const statusCode of [502, 200]) {
  test(`MOCK ONLY: guarded form ${statusCode === 200 ? "receipt presentation" : "backend error retains input"}`, async ({
    page,
  }) => {
    let mockPostCount = 0;
    await page.route("http://127.0.0.1:4321/", async (route) => {
      if (route.request().method() === "POST") {
        mockPostCount++;
        await route.fulfill({
          status: statusCode,
          contentType: "text/plain",
          body: statusCode === 200 ? "MOCK accepted" : "MOCK failure",
        });
      } else await route.continue();
    });
    await page.goto("/growth-audit/");
    await page
      .locator("[data-audit-form]")
      .evaluate((f) => (f.dataset.submissionEnabled = "true"));
    await page.locator("#audit-name").fill("Synthetic Preview Test");
    await page.locator("#audit-email").fill("synthetic@example.com");
    await page.locator("#audit-website").fill("https://example.com");
    await page.locator("#audit-type").selectOption("B2B");
    await page.locator("[data-form-submit]").click();
    if (statusCode === 200) {
      await expect(page).toHaveURL(/received/);
      await expect(page.locator("[data-receipt-title]")).toHaveText(
        "Growth Audit request received.",
      );
    } else {
      await expect(page.locator("#form-status")).toContainText(
        "Receipt could not be confirmed",
      );
      await expect(page.locator("#audit-email")).toHaveValue(
        "synthetic@example.com",
      );
      await expect(page.locator("[data-form-submit]")).toBeEnabled();
    }
    expect(mockPostCount).toBe(1);
    // Intercepted locally. No external request, Netlify acceptance, or capture verified.
  });
}
test("record local lab observations, not field performance claims", async ({
  page,
}) => {
  const rows = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const resources = performance.getEntriesByType("resource");
      return {
        ttfb: nav.responseStart,
        domContentLoaded: nav.domContentLoadedEventEnd,
        load: nav.loadEventEnd,
        htmlBytes: nav.decodedBodySize,
        resourceBytes: resources.reduce((s, r) => s + r.decodedBodySize, 0),
        requests: resources.length,
        external: resources
          .filter((r) => !r.name.startsWith(location.origin))
          .map((r) => r.name),
      };
    });
    rows.push({ width, ...metrics });
    expect(metrics.external).toEqual([]);
  }
  await writeFile(
    "test-results/local-performance.json",
    JSON.stringify(
      {
        method:
          "Unthrottled local Chromium; not deployed/field LCP INP CLS evidence",
        observations: rows,
      },
      null,
      2,
    ),
  );
});
