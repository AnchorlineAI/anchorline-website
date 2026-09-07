import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
test("capture local review evidence and page timings", async ({ page }) => {
  await mkdir("qa-screenshots", { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("h1").waitFor();
  await page.screenshot({ path: "qa-screenshots/home-desktop.png" });
  await page.screenshot({
    path: "qa-screenshots/home-full.png",
    fullPage: true,
  });
  await page.locator("#pathways").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "qa-screenshots/pathways-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "qa-screenshots/home-mobile.png" });
  await page.goto("/growth-audit/");
  await page.locator(".form-panel").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "qa-screenshots/form-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/growth-engine/");
  await page.screenshot({ path: "qa-screenshots/engine-desktop.png" });
  await page.goto("/growth-engine/local/");
  await page.screenshot({ path: "qa-screenshots/local-desktop.png" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
