# October 3 article review

Status: prepared for review, not approved for publication. One article, 315 rendered words including deck, excluding title/photo credit and the unchanged shared site CTA.

Title: Cloudflare Makes AI's Web Searches Easier to Follow

Deck: Cloudflare's new Web Search API puts search requests beside model activity, making it easier to see what an AI looked up and what it cost.

Slug: cloudflare-web-search-ai-gateway

Property: AnchorlineAI.com Insights. Category: AI Systems and Operations. Not featured.

## Editorial judgment

Read the complete draft and rendered title/deck/body. News leads; the hypothetical competitor-price example explains request/cost visibility. The retention paragraph adds a specific setup consideration rather than repeating a generic caution. Natural contractions retained. No invented personal use, source interview, customer result or Anchorline adoption. Available open beta and future server tools remain distinct. Final comparison advice is editorial, not a measured product outcome. Sources and limits are in SOURCES-AND-SEARCH.md. No article-specific sales CTA or LinkedIn adaptation.

## Completed local checks

- `npm run test:unit`: 5/5 passed.
- Production-context build with CONTEXT=production and URL=https://anchorlineai.com: passed; 40 HTML pages. Local only, not deployed.
- Default preview build: passed; 40 HTML pages, noindex and no analytics loader.
- `python scripts/check-release.py`: 40 pages and 61 unique local reference targets, no errors. Covers internal links/fragments, image alt presence, one H1, preserved form field contract and pricing placement.
- `python docs/oct03-2026/check-article.py --production` and preview variant: 315 words, matching deck/meta, canonical, Article schema author/date/headline, 1600x900 social metadata, rights hash, sitemap inclusion in production/absence in preview; existing Growth Review links retained. No existing RSS endpoint.
- CUA browser inspection: article at 1440, 768, 390 and 320 pixels, no horizontal overflow. Photo loads at 1600x900. Desktop and mobile crops/readability inspected; source clearly labeled illustrative.
- Local axe checks: article at tested sizes and Insights listing returned zero violations and zero incomplete checks for configured WCAG A/AA tags. Browser error log empty for article.
- Insights listing: featured Growth Review unchanged; Cloudflare first in latest list, image loaded; AI Systems and Operations filter includes it with three existing articles; mobile menu opens and closes.
- Source links and image source/license read directly. No live form submitted.

## Test limits and separate risk

No standalone lint/typecheck script exists. Astro build validates content schema and generates types; it is not a claim of full application typechecking.

`npm test -- --list` enumerated 63 tests in nine files, not a successful test run. Full legacy browser suite not run: this session uses CUA for browser operations; several tests assert pre-redesign selectors and wording (for example `.v-intelligence` and old Growth Audit controls). Current scoped CUA checks and static contract checks above are the executed evidence. No suite-wide pass claimed.

`npm audit --json` reports two high package findings arising from one existing http-cache-semantics advisory. No patched version listed; dependencies and lockfile left unchanged. See SOURCES-AND-SEARCH.md. Separate dependency review is needed before a later release; this draft preview does not claim production security approval.

## Release boundaries

Only article, photo and this batch's review evidence added. No shared templates, pricing, tracking, forms, dependency files or account settings changed. PR21 and PR23 remain separate. Hosted exact-commit preview verification and final production-preservation check will be recorded in the local HANDOFF.md after deployment finishes. No main merge or production publish permitted by this assignment.
