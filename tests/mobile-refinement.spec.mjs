import { test, expect } from "@playwright/test";
for (const width of [320, 390]) {
  test(`mobile-specific interface composition ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => {
      const heading = document.querySelector("h1"),
        visual = document.querySelector(".r-home-hero>.v-scene"),
        cta = document.querySelector(".r-actions>.button"),
        title = document.querySelector(".r-console-title");
      const r = title.getBoundingClientRect();
      return {
        headline: parseFloat(getComputedStyle(heading).fontSize),
        visualTop: visual.getBoundingClientRect().top,
        ctaWidth: cta.getBoundingClientRect().width,
        titleVisible: r.bottom < innerHeight,
        titleUncovered: !!document
          .elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
          ?.closest(".r-console-title"),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(metrics.headline).toBeLessThanOrEqual(35);
    expect(metrics.visualTop).toBeLessThan(633);
    expect(metrics.ctaWidth).toBeLessThan(width * 0.8);
    expect(metrics.titleVisible).toBe(true);
    expect(metrics.titleUncovered).toBe(true);
    expect(metrics.overflow).toBe(false);
    await expect(page.locator(".v-sheet")).toHaveCount(5);
    await expect(page.locator(".v-center-flow")).toBeVisible();
  });
}
