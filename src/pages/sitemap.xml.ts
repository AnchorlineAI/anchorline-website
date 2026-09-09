import type { APIRoute } from "astro";

export const prerender = true;

const paths = [
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

export const GET: APIRoute = () => {
  if (process.env.CONTEXT !== "production") {
    return new Response("Not found\n", { status: 404 });
  }
  const urls = paths
    .map((path) => `<url><loc>https://anchorlineai.com${path}</loc></url>`)
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
