import { test, expect } from "@playwright/test";

test("homepage is a restrained open scene, not the rejected split dashboard hero", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const metrics = await page.evaluate(() => {
    const hero = document.querySelector(".r-home-hero"),
      headline = hero.querySelector("h1"),
      scene = hero.querySelector(".v-scene"),
      center = scene.querySelector(".v-center");
    return {
      display: getComputedStyle(hero).display,
      font: getComputedStyle(headline).fontFamily,
      size: parseFloat(getComputedStyle(headline).fontSize),
      titleWidth: headline.getBoundingClientRect().width,
      sceneWidth: scene.getBoundingClientRect().width,
      centerWidth: center.getBoundingClientRect().width,
      atmospherePosition: getComputedStyle(
        document.querySelector(".r-atmosphere"),
      ).position,
    };
  });
  expect(metrics.display).toBe("block");
  expect(metrics.font).toContain("Manrope");
  expect(metrics.size).toBeLessThanOrEqual(50);
  expect(metrics.sceneWidth).toBeGreaterThan(metrics.titleWidth);
  expect(metrics.centerWidth).toBeLessThan(450);
  expect(metrics.atmospherePosition).toBe("fixed");
  await expect(page.locator(".v-sheet")).toHaveCount(5);
  await expect(page.locator(".r-console")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveText(
    "We build the systems that help good organizations grow.",
  );
});

test("scroll progresses connections and depth without moving the reading text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForFunction(() =>
    document
      .querySelector(".v-scene")
      ?.style.getPropertyValue("--story-progress"),
  );
  const before = await page
    .locator(".v-scene")
    .evaluate((el) =>
      parseFloat(el.style.getPropertyValue("--story-progress")),
    );
  await page.evaluate(() => window.scrollBy(0, 420));
  await expect
    .poll(() =>
      page
        .locator(".v-scene")
        .evaluate((el) =>
          parseFloat(el.style.getPropertyValue("--story-progress")),
        ),
    )
    .toBeGreaterThan(before);
  expect(
    await page
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  const depth = await page
    .locator(".v-intelligence")
    .evaluate((el) => parseFloat(el.style.getPropertyValue("--depth-y")));
  expect(Number.isFinite(depth)).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator(".v-scene")
        .evaluate((el) =>
          parseFloat(el.style.getPropertyValue("--story-progress")),
        ),
    )
    .toBe(1);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`spatial scene text is not covered by another fragment at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/growth-engine/b2b/", "/growth-engine/local/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      for (const label of await page
        .locator(".v-sheet-title, .v-center-heading .r-console-title")
        .all()) {
        await label.scrollIntoViewIfNeeded();
        expect(
          await label.evaluate((el) => {
            const r = el.getBoundingClientRect();
            return [0.12, 0.5, 0.88].every((x) =>
              [0.3, 0.7].every(
                (y) =>
                  document
                    .elementFromPoint(
                      r.left + r.width * x,
                      r.top + r.height * y,
                    )
                    ?.closest(".v-sheet") === el.closest(".v-sheet"),
              ),
            );
          }),
          `${path} at ${width}`,
        ).toBe(true);
      }
    }
  });
}
