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
  "/insights/",
  "/insights/why-most-growth-problems-arent-really-marketing-problems/",
  "/insights/seo-aeo-and-geo-what-they-are-and-why-they-need-to-work-together/",
  "/insights/the-growth-audit-three-priorities-a-clearer-next-step/",
];

test("environment-aware production and preview metadata remains correct", async ({
  page,
  request,
}) => {
  const production = process.env.CONTEXT === "production";
  for (const route of publicRoutes) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      production ? "index, follow" : "noindex, nofollow, noarchive",
    );
    await expect(page.locator(".preview-bar")).toHaveCount(production ? 0 : 1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      production
        ? `https://anchorlineai.com${route}`
        : new URL(
            route,
            process.env.DEPLOY_PRIME_URL || "http://localhost:4321",
          ).href,
    );
  }
  await page.goto("/growth-audit/received/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow, noarchive",
  );
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toBe(
    production
      ? "User-agent: *\nAllow: /\nDisallow: /growth-audit/received/\n\nSitemap: https://anchorlineai.com/sitemap.xml\n"
      : "User-agent: *\nDisallow: /\n",
  );
});

test("Privacy, Terms, footer links, and Client Login are present", async ({
  page,
}) => {
  await page.goto("/privacy/");
  await expect(
    page.getByRole("heading", { name: "Privacy, in plain language." }),
  ).toBeVisible();
  await expect(page.getByText("not legal advice")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/owner review/i);
  await page.goto("/terms/");
  await expect(
    page.getByRole("heading", { name: "Terms for using this site." }),
  ).toBeVisible();
  await expect(page.getByText("not legal advice")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/owner review/i);
  await expect(page.locator('a[href="/privacy/"]')).toHaveCount(1);
  await expect(page.locator('a[href="/terms/"]')).toHaveCount(1);
  await expect(
    page.locator('a[href="https://amg.anchorlineai.com"]'),
  ).toHaveAttribute("target", "_blank");
});

test("Growth Audit form settings remain byte-identical", async () => {
  const expected = {
    "src/settings.ts":
      "2342ae2cccc2a37e73f4f7f989d7782f2e524458a1f9dff95cffc78b13f97936",
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
  const production = process.env.CONTEXT === "production";
  expect(
    source.includes("https://www.googletagmanager.com/gtag/js?id=G-KPQ0G7C2YY"),
  ).toBe(production);
  expect(source).not.toContain("GTM-");
  expect(source).not.toContain("google-analytics.com");
  expect(source).not.toMatch(
    /owner review|visual approval|production release candidate|pending approval|preview-only|internal qa/i,
  );
});

test("justified Organization, WebSite, WebPage, Person, and Service schema is present", async ({
  page,
}) => {
  await page.goto("/about/");
  const aboutTypes = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) =>
      nodes.flatMap((node) => {
        const value = JSON.parse(node.textContent || "{}");
        return value["@graph"]
          ? value["@graph"].map((entry) => entry["@type"])
          : [value["@type"]];
      }),
    );
  expect(aboutTypes).toEqual(
    expect.arrayContaining(["Organization", "WebSite", "AboutPage", "Person"]),
  );
  for (const route of [
    "/growth-engine/",
    "/growth-engine/b2b/",
    "/growth-engine/local/",
  ]) {
    await page.goto(route);
    const types = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .evaluate((node) =>
        JSON.parse(node.textContent || "{}")["@graph"].map(
          (entry) => entry["@type"],
        ),
      );
    expect(types).toContain("Service");
  }
});

test("Insights collection renders three crawlable articles with article metadata", async ({
  page,
}) => {
  await page.goto("/insights/");
  await expect(page.locator(".insight-card")).toHaveCount(3);
  await expect(page.locator('.insight-card a[href^="/insights/"]')).toHaveCount(
    6,
  );
  for (const route of publicRoutes.filter(
    (route) => route.startsWith("/insights/") && route !== "/insights/",
  )) {
    await page.goto(route);
    await expect(page.locator("article.insight-article h1")).toHaveCount(1);
    await expect(page.locator(".article-prose h2")).not.toHaveCount(0);
    await expect(page.locator(".article-byline time")).toHaveAttribute(
      "datetime",
    );
    const types = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes.flatMap((node) => {
          const value = JSON.parse(node.textContent || "{}");
          return value["@graph"]
            ? value["@graph"].map((entry) => entry["@type"])
            : [value["@type"]];
        }),
      );
    expect(types).toEqual(
      expect.arrayContaining(["Article", "BreadcrumbList"]),
    );
  }
});

test("verified GA4 tag is production-only, unique, and Privacy discloses it", async ({
  page,
}) => {
  await page.goto("/");
  const production =
    process.env.CONTEXT === "production" &&
    process.env.URL === "https://anchorlineai.com";
  const loaders = page.locator(
    'script[src="https://www.googletagmanager.com/gtag/js?id=G-KPQ0G7C2YY"]',
  );
  await expect(loaders).toHaveCount(production ? 1 : 0);
  expect((await page.content()).includes("GTM-")).toBe(false);
  await page.goto("/privacy/");
  await expect(
    page.getByText("Anchorline uses Google Analytics 4"),
  ).toBeVisible();
  await expect(page.getByText(/advertising pixels/)).toBeVisible();
});

test("Organization schema uses the live logo and /command preserves the client portal alias", async ({
  page,
}) => {
  await page.goto("/");
  const organization = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .evaluate((node) =>
      JSON.parse(node.textContent || "{}")["@graph"].find(
        (entry) => entry["@type"] === "Organization",
      ),
    );
  expect(organization.logo).toEqual({
    "@type": "ImageObject",
    url: "https://anchorlineai.com/brand/mark.webp",
    contentUrl: "https://anchorlineai.com/brand/mark.webp",
    width: 96,
    height: 96,
  });
  const logo = await page.request.get("/brand/mark.webp");
  expect(logo.status()).toBe(200);
  expect(logo.headers()["content-type"]).toContain("image/webp");
  const redirects = await readFile(
    new URL("../public/_redirects", import.meta.url),
    "utf8",
  );
  expect(redirects).toContain("/command https://amg.anchorlineai.com/ 301!");
});

test("Growth Audit removes the redundant Netlify notice without changing the form", async ({
  page,
}) => {
  await page.goto("/growth-audit/?pathway=local");
  await expect(page.locator("body")).not.toContainText(
    "securely recorded through Netlify Forms",
  );
  await expect(page.locator("body")).not.toContainText(
    "Immediate confirmation means the request was received",
  );
  const form = page.locator("[data-audit-form]");
  await expect(form).toHaveAttribute("name", "growth-audit");
  await expect(form).toHaveAttribute("action", "/growth-audit/received/");
  await expect(page.locator('[name="bot-field"]')).toHaveCount(1);
  await expect(page.locator("#audit-type")).toHaveValue("Local Business");
});
