# Anchorline Insight editorial QA - September 27, 2026

## Scope

One new AnchorlineAI.com Insight: `databricks-row-zero-governed-spreadsheets-ai-agents`. Google AI Max reporting was reviewed as a requested reuse item but is already live at its canonical route and was not duplicated or changed. No offers, forms, analytics, integrations, DNS, or other site content are in scope.

## Source and claim review

- Primary source checked September 27: [Databricks acquisition announcement](https://www.databricks.com/company/newsroom/press-releases/databricks-acquires-row-zero-bringing-live-governed-spreadsheets).
- Databricks announced the Row Zero acquisition on September 24, 2026, and says Row Zero will add a spreadsheet experience to Genie.
- The article attributes planned governance, permissions, live-source refresh, export controls, writeback, and auditability to Databricks. It does not claim the integration is already available, independently validated, or right for every team.
- The September 27 newsroom pass rebuilt the title, description, and body around the announced acquisition. It removes the formal "larger lesson" framing and keeps the practical point: people should be able to trace the numbers they use before acting on them.
- The Google AI Max article remains at `/insights/google-ai-max-reporting-ad-accountability/`. Its title, primary Google source, and announced-availability qualification match the recovered September 24 canonical source. Its later plain-language edits remain intact.

## Image rights

- File: `public/insights/databricks-row-zero-governed-spreadsheets.webp`
- SHA-256: `1ade9879e039ecafb0892674e6722542795df863c90e47e656f92a1f68219412`
- Source page: [Two people working on laptops with notebook and coffee](https://unsplash.com/photos/two-people-working-on-laptops-with-notebook-and-coffee-jsSPIE1a8YM)
- Creator: Swello (`@getswello`); published April 30, 2026; listed as free to use under the [Unsplash License](https://unsplash.com/license).
- Treatment: a real work surface with two laptops and a notebook. No vendor logos, product interface, dashboard, customer data, or performance claim is visible.
- Credit shown in the article: `Photo by Swello on Unsplash.`

## SE Ranking evidence

- No audit, crawl, tracking, setting, or report was created or rerun.
- Existing completed audit `417208`, recorded September 24, crawled 22 pages and reported score 82 with one error, 23 warnings, and 15 notices. Its homepage performance and pre-existing missing-alt findings do not assess this new unpublished article.
- The separate audit `413833` was new with zero crawled pages and was not used as an SEO conclusion.
- The article uses clear entity language and does not publish keyword metrics, rankings, traffic, or outcomes.

## Validation

- `npm ci`, `npm run build`, and `npm run test:unit` passed. The preview build produced 27 HTML documents and verified metadata, canonical, sitemap, policy, form, and robots output.
- Article-specific browser review used a clean local preview on port 4322 at desktop and 390-pixel mobile widths. The article rendered one H1, its source, its credit, and a 1600-pixel-wide image without overflow, console errors, or failed requests.
- The 390-pixel check found no axe violations for WCAG 2.0, 2.1, and 2.2 A/AA tags.
- Netlify deploy preview `deploy-preview-18--spontaneous-daifuku-666a8c.netlify.app` is ready for commit `adabcdf4b750653ad29d3184595053435fdb6476`. Its article route returned 200 with preview `noindex`, the intended Open Graph title, a 1600-pixel-wide image, no mobile overflow, no same-origin failed requests, no console errors, and no axe violations at 390 pixels.
- The default Playwright browser is not installed. A Chrome-configured retry was run against this checkout's own isolated preview on port 4322 after confirming it served the Row Zero route and revised title. Nine of ten release checks passed, including every Row Zero assertion. The sole failure is the existing Growth Audit source-hash assertion: it expects `2342ae2...` but the unchanged `src/settings.ts` in both this branch and its base hashes to `a67f877...`. That assertion was not weakened or changed.

## Release boundary

This branch is a review candidate only. A merge to `main` auto-publishes and requires separate explicit approval after preview review.
