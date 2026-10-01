# October 1 Anchorline Insights QA

## Release boundary

- Repository: `https://github.com/AnchorlineAI/anchorline-website.git`
- Base commit: `c17cd8a` (`origin/main` before this work)
- Branch: `publish/anchorline-oct01-anchorline-insights`
- Netlify site: `spontaneous-daifuku-666a8c`
- Release status: branch and non-production preview only; no merge, production deploy, social post, campaign, tracking, or spending action is included.

## Article evidence and decisions

### Publishers are selling GEO before anyone can measure the full return

- Route: `/insights/publishers-are-selling-geo-before-measurement-is-complete/`
- Source: [Digiday original reporting](https://digiday.com/media/media-briefing-publishers-are-turning-geo-from-an-experiment-into-a-business/), October 1, 2026.
- Editorial boundary: Digiday's Future and Ziff Davis client counts are attributed to the report. The reported Chartbeat referral and AI-traffic figures were omitted because no independent Chartbeat primary source was located.
- Claim boundary: citations and visibility are explicitly distinguished from visits, conversions, and revenue.
- Dedupe: links to the existing SEO/AEO/GEO explainer rather than repeating its definitions.

### Google Skills make a good prompt easier to keep

- Route: `/insights/google-skills-make-good-prompts-easier-to-keep/`
- Primary source: [Google announcement](https://blog.google/products-and-platforms/products/gemini/automate-tasks-with-skills/), September 30, 2026.
- Facts used: global rollout to Google AI subscription tiers; Workspace support in the coming weeks; named and automatic invocation, combined Skills, reference files; personal Gems retirement in November 2026; later Workspace retirement dates and automatic eligible-Gem migration.
- Availability boundary: Google's announcement treats sharing, Google Drive files, and Gemini Notebook notebooks as coming-soon additions. The article does not present them as currently available, and it makes no unsupported Workspace-administration or data-governance claim.
- Claim boundary: Google availability and migration facts are attributed to Google. The article states plainly that a Skill is not a governed operating system.
- Image asset: `public/insights/oct01-google-skills.jpg`, 2000 x 1125, SHA-256 `3AFEDE521153CB1B0D535D165EE956CAA2F3BD851E823E11B413C0F075B34027`; [Vitaly Gariev / Unsplash](https://unsplash.com/photos/diverse-team-collaborating-on-a-project-in-an-office-PSksbOVDhWk), accessed October 1, 2026, explicitly free under the [Unsplash License](https://unsplash.com/license). The article identifies it as an illustrative workflow-planning scene, not Google Gemini.

### Google is turning some missed calls into paid leads

- Route: `/insights/google-missed-calls-paid-leads/`
- Primary sources: [Google's LSA-to-PMax transition guide](https://support.google.com/google-ads/answer/17213585?hl=en) and [Google's PMax pay-per-lead lead rules](https://support.google.com/google-ads/answer/18550592?hl=en-GB).
- Facts used: a missed business-hours call lasting more than 20 seconds can be valid in PMax pay-per-lead; the menu timer starts after a keypress; Business Profile hours and active ad schedule matter; a 15-day follow-up interaction window applies; transition begins in selected U.S. home and storefront categories and is phased.
- Current rollout detail: Google's August 2026 selected U.S. home and storefront group includes plumbing, HVAC, electrical, appliance repair, house cleaning, lawn care, roofing, pest control, and moving. Google describes broader service-area and professional-service transition as later 2026 and remaining rollout, including non-U.S. markets, as 2027.
- Exceptions reviewed: Google's current PMax guide describes automated low-quality, duplicate, and invalid-lead credits within 30 days, while noting automated credits are not available in the EEA. It also states that call recordings and lead credits are unavailable for tax specialists, U.S. healthcare, and Europe. None of those details are turned into a blanket customer promise in the article.
- Effective-date boundary: Search Engine Land reported October 1 advertiser notices. Google's public documentation does not state one effective date for all Local Services Ads accounts, so the article does not claim universal applicability.
- Image decision: no image. No relevant, cleared landscape image was found that would improve the reporting. Do not substitute generic call-center, phone, or Google-logo imagery. A new original editorial illustration would require a separate visual review and approval.

## SE Ranking read-only review

- Exact property reviewed: `AnchorlineAI.com - Organic and AI Visibility`.
- Market and date: Google USA, English; October 1, 2026 review.
- Current snapshot: 15 tracked keywords, all outside the top 100; search visibility 0. Tool keyword volumes are estimates, not evidence of article performance.
- Decision: GEO language is used naturally and links to the existing GEO explainer. No keyword was forced into the Skills or missed-call article. No keyword, project, crawl, refresh, or tracking action was changed.

## CTA and commercial scope

- All three articles use the existing `/growth-audit/` destination only. It was checked live and returned HTTP 200 on October 1, 2026.
- The current page describes a no-cost, qualification-based audit with three priorities, supporting observations, and a recommended starting point. It does not promise an outcome.
- Private planning notes are in the three `*-COMMERCIAL-NOTE.md` files. They contain no live campaign setup, spend, audience activation, tracking, or external outreach.

## Validation performed

- `npm run build`: passed. The static-output checks passed for 33 HTML documents, including metadata, canonicals, policies, form, sitemap, and robots checks.
- `npm run test:unit`: passed, 5 of 5.
- Rendered preview: the three routes were reviewed locally at 1440 px, 768 px, and 390 px. Each has the expected title, deck, source links, Growth Audit destination, and Article JSON-LD. No horizontal overflow was observed.
- Skills image: visually reviewed at source dimensions and in the rendered article. The subject remains clear at the provided 16:9 crop and the article shows its descriptive alt text and rights credit.
- The three article routes were generated during the static build. The isolated localhost preview intentionally uses non-production indexing behavior and its `sitemap.xml` returns `Not found`; final sitemap and canonical verification belongs to the Netlify deploy preview.

## Netlify deploy-preview verification

- PR preview: `https://deploy-preview-21--spontaneous-daifuku-666a8c.netlify.app`
- Verified October 1, 2026: each of the three article routes returned HTTP 200, rendered the expected article, used its own deploy-preview canonical URL, and declared `noindex, nofollow, noarchive`.
- The deploy-preview `robots.txt` returns a disallow-all policy and `sitemap.xml` returns `Not found`, which is correct for the non-production index boundary.
- Netlify's Header rules and Redirect rules checks completed successfully. The Pages changed check completed as informational. No production deploy was performed.

## Test environment blocker

- `npm test` could not provide a valid site result because port `4321` was already serving an unrelated Every Sphere site. The initial run also lacked the Playwright Chromium binary; it was installed locally and the suite was rerun. The rerun confirmed the wrong-site response through its page snapshots, so its failures are not attributed to this branch or these articles. The unrelated server was not stopped. The local review ran on this branch's isolated preview at port `4327`.
