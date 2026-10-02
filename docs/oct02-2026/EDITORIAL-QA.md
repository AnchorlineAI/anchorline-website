# October 2 draft QA

Status: drafted and locally previewed; hosted preview verification follows PR creation. No production or social release authorized.

## Articles

| Article | Slug | Words including deck and article CTA | Category |
| --- | --- | ---: | --- |
| Shopify Canvas Lets You Build the Store You Have in Mind | shopify-canvas-sidekick-store-design | 265 | Website Systems |
| Google Says to Check the AI Work You Can't See, Too | google-ai-content-manual-fact-checking | 286 | Search Visibility |

Descriptions are in the actual frontmatter and rendered immediately below the title. Counts use rendered text before the Photo source section, plus the description; exclude title, byline, credits and shared site navigation/footer/offer module. No extra article-specific CTA hidden outside this count.

## Editorial acceptance, not owner approval

Read both complete drafts against kris-publish and kris-newsroom. Natural contractions, short connected paragraphs, specific developments first, no service list, fabricated experience, forced moral, copied article structure or unsupported result claims. Canvas preserves Kris's supported excitement and gives current product limitations proportionate space. Google's piece adds concrete checks beyond visible prose and keeps documentation distinct from ranking changes. Primary source links are within the relevant paragraphs.

Both photographs were inspected at source resolution, then at 1600x900 and in the responsive page. Canvas's initially reused photo was replaced because the adjacent Amazon card repeated it. Final photos are different, free Unsplash licensed images by Vitaly Gariev. Neither depicts Canvas, Google staff or Anchorline clients; captions say so. Visible photo source and license links appear in the existing Markdown body; shared renderer unchanged. Rights, modifications and SHA-256 values are in PHOTO-RIGHTS.json.

## Technical checks

- npm ci --ignore-scripts: lockfile unchanged, 192 packages installed, npm reported zero vulnerabilities.
- npm run test:unit: five passed, zero failed.
- npm run build (preview): 41 HTML pages, content schema/types generated, all existing static output assertions passed, no analytics loader, noindex and blocked robots preserved.
- Local production-context build with CONTEXT=production and URL=https://anchorlineai.com: 41 pages and all existing output assertions passed. This was a local build, not a deployment. An initial attempt without URL correctly failed the existing analytics-host assertion; rerunning with the actual production host passed without code changes.
- python scripts/check-release.py: 41 pages, 63 local references, zero errors. Existing form field contract, single H1, image alt, fragments, page links and homepage no-pricing requirements passed.
- python docs/oct02-2026/check-articles.py, both preview and production: counts, descriptions, Article schema, author/date, canonical paths/production host, Open Graph dimensions, Twitter card, image hashes, sitemap inclusion/exclusion and featured Growth Review presence passed. No existing RSS endpoint found; none added.
- Corrected two assumptions in this batch's checker, not the site: preview canonicals use their preview host, and the disabled preview sitemap contains Not found rather than XML. Production canonicals remain anchorlineai.com. Existing site behavior preserved.
- Browser QA through CUA: both articles, Insights and homepage at widths 320, 390, 768 and 1440. All 16 checks: one H1, no horizontal overflow, axe zero violations and zero incomplete checks. Final Canvas image rechecked at all four widths after replacement.
- Article images loaded at all tested widths. Existing listing images below the viewport are lazy-loaded; initial unloaded flags are not broken-resource findings. New card photos inspected after scrolling; local asset/link existence checked across the entire build.
- Mobile menu opened and Escape closed it. Desktop article console reported no errors. Desktop/mobile screenshots saved locally alongside this report.
- Live CTA destinations /growth-review/ and /services/search-visibility/ returned 200 and the expected page titles. Live robots returned 200, so the historical SE Ranking robots flag was not reproduced by this fetch.
- External article source/photo/license destinations were opened and their supporting text read; exact URLs and limitations in SOURCES-AND-SEARCH.md. An inaccessible secondary Search Engine Land report is not used to support claims.
- Final staged diff reviewed: only 11 additive files, no existing source/configuration edits. Whitespace check passed. Narrow credential-pattern scan found zero potential secrets in the staged diff; this is not a comprehensive security audit.

## Test limits

The repository has no separate lint or typecheck script. Astro build validates content and generates types, but is not a standalone full typecheck. npm test -- --list enumerated 63 legacy Playwright tests; the browser test runner itself was not executed because UI automation in this session must use CUA. Some tests also explicitly target the replaced pre-redesign design (.v-intelligence and old Growth Audit labels). They were not rewritten or represented as passing. Current article/listing responsive, accessibility and navigation checks were executed through CUA instead. No full legacy-suite pass, exhaustive accessibility certification, field-performance improvement or current SE Ranking content score is claimed.

## Scope and next gate

Only two articles, two WebP assets and batch evidence/check files are new. No edits to existing content, styling, schema, renderer, dependency lock, redirects, forms, analytics, account settings or protected portal. PR 21 remains untouched. Build-generated public headers/robots will be restored to the source production baseline before committing; preview build generates its own noindex files.

One focused content PR may generate a Netlify deploy preview. Verify that exact preview head and both rendered pages before handoff. Kris's article-specific publication approval is still required. No main push, merge, production deploy, index request, crawl, outreach, social draft/post/schedule or integration activation.
