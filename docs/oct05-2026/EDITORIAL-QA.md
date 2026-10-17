# October 5 Editorial and Technical QA

Status: local QA passed; hosted verification follows in HANDOFF.md. Review-only, not owner-approved or published.

## Editorial Review

- Title: Which Questions Are Behind Your AI Visibility Score?
- 309 words including deck; 336 including the existing shared Growth Review CTA, excluding image credits and site navigation. Within 200-350 words even counting shared CTA.
- LinkedIn: 208 words, one pending canonical link, complete idea, four practical checks, requested positioning exactly once. Business-page destination only.
- Read the full rendered title, deck, body, attribution and card. Ordinary language and natural contractions; no made-up firsthand experience, performance promises, consultant framing or repeated closing slogans. Required positioning appears only in the requested social draft.
- Original hypothetical roofing example shows why additional near-duplicate questions don't repair missing customer segments. Article advances from vendor news to sample selection, modeled vs observed data, comparisons over time, and underlying answers.
- Source claims attributed; no statistics, quotes, Searchable test/endorsement claim or private-conversation access claim. Rechecked against primary announcement and product FAQ.
- Source notes, read-only SE Ranking limits, deduplication and rights details are in SOURCES-AND-SEARCH.md and PHOTO-RIGHTS.json.

## Checks Completed

- npm ci --ignore-scripts; lockfile unchanged.
- npm run test:unit: five passed.
- npm run build in preview and production contexts: 41 HTML pages / 20 articles, both passed output checks. Production-context build was local only; not deployed or browsed with analytics.
- python scripts/check-release.py: 41 pages, 63 unique local references, zero errors in both contexts.
- python docs/oct05-2026/check-article.py, with and without --production: word count, description, canonical, robots, Article schema/author/date, Open Graph/Twitter image, rights hash/links, image dimensions/alt, sitemap, pinned Growth Review and requested post checks passed.
- No RSS endpoint exists in this repository. No feed invented.
- CUA browser: article at 1440x900 and 390x844; image loaded at 1600 natural width; no horizontal overflow; typography, crop and attribution inspected. 320x740 overflow check also passed.
- Local axe via existing QA server: article desktop and phone, plus desktop Insights index: zero violations and zero incomplete results.
- Insights listing: Growth Review still featured; new photo/card rendered; Search Visibility filter correctly shows this article and two existing articles.
- Local QA server stopped after checks. No test form submissions.

## Limits and Existing Risk

- Full legacy Playwright suite was not run. Browser coverage here is scoped CUA inspection plus the existing injected axe checks, not full-suite certification.
- npm audit is not clean: one high transitive http-cache-semantics finding (GHSA-ch52-4w7c-c8xp / CVE-2026-93748). Provider now reports fixAvailable=true. No audit fix, lockfile update or security-setting change performed. Prior release documented build-time image-path exposure in this static site; this article uses a local image and changes no runtime path. Dependency repair/validation requires a separate scoped maintenance action.
- SE Ranking's September 24 crawl predates current design; empty US keyword data is not proof of no indexing or demand. No new crawl or tracking changes.
- Hosted noindex is not access control. Preview is accessible to anyone with its link; contains only intended public draft content.
- All earlier article approvals remain separate. Future publication date/link must be checked again at release.
