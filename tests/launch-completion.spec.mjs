import { test, expect } from "@playwright/test";

test("approved founder portrait renders with responsive crop and alt text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/about/");
  const image = page.locator(".founder-portrait img");
  await expect(image).toHaveAttribute(
    "alt",
    "Kris McFadden, founder and CEO of Anchorline Systems",
  );
  expect(
    await image.evaluate((img) => ({
      complete: img.complete,
      width: img.naturalWidth,
      height: img.naturalHeight,
    })),
  ).toEqual({ complete: true, width: 600, height: 601 });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page
      .locator(".founder-portrait")
      .evaluate((el) => el.getBoundingClientRect().width <= innerWidth),
  ).toBe(true);
});

test("discovery motion activates, can be paused, and respects reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".r-system")).toHaveAttribute(
    "data-active",
    "true",
  );
  expect(
    await page
      .locator(".r-interface-note")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("r-drift");
  await page.locator("[data-motion-toggle]").click();
  await expect(page.locator("body")).toHaveAttribute("data-motion-paused", "");
  expect(
    await page
      .locator(".r-interface-note")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("[data-motion-toggle]")).toBeDisabled();
  expect(
    await page
      .locator(".r-interface-note")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect(page.locator(".r-console-title")).toBeVisible();
});
