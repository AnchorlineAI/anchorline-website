# Commerce company preview - October 16, 2026

Historical private-preview record. The October 17 release supersedes the contact address and release status below; see commerce-release-handoff.md.

## 1. Goal status
Complete: private preview ready for Kris's review. Not a production release.

## 2. Work completed
- Homepage presents digital services, owned marketplace retail, and independent data introductions.
- New /commerce/ page offers supplier contact at Kris@anchorlineai.com without naming marketplaces, categories, private strategies, or unverified relationships.
- About preserves founder information and Person schema while explaining all three activities.
- Desktop/mobile navigation includes Commerce and Data Partnerships; Approach and Pricing remain in the footer.
- Existing Data Partnerships body, disclosures, services, articles, privacy notice, contact handling, and analytics configuration remain unchanged.
- Existing imagery reused. Homepage pricing remains absent and the Growth Review article stays featured.

## 3. Files created or edited
Working directory: C:/Users/krist/Documents/Codex/anchorline-commerce-preview
Local branch: preview/commerce-company-oct16; base origin/main ccaa646.

- src/pages/index.astro
- src/pages/commerce/index.astro (new)
- src/pages/about.astro
- src/layouts/Site.astro
- src/components/CompanyClose.astro (new)
- src/styles/company.css (new)
- scripts/check-output.mjs
- scripts/qa-commerce-preview.mjs (new)
- docs/commerce-preview-handoff.md (this file)

Screenshots and QA results: qa-screenshots/commerce-preview/ (ignored local artifacts).

## 4. Validation
- npm run build: passed, including static checks across 42 HTML documents.
- npm run test:unit: 5 passed.
- node scripts/qa-commerce-preview.mjs: 24 route/viewport checks passed at 1440, 1024, 961, 768, 390, and 320 pixels.
- 8 automated WCAG A/AA accessibility checks passed; no guarantee of exhaustive accessibility conformance.
- 16 internal links, mobile menu, supplier mailto destination/subject, image loading, no horizontal overflow, and local POST rejection checked.
- Desktop/mobile screenshots inspected; mobile heading spacing and hero accent overlap corrected, then checks rerun.
- Preview has no GA4 loader, noindex metadata, and a loopback-only server rejecting submissions. No email sent or delivery test performed.
- Full legacy Playwright suite not run; focused browser QA covers this change. Some legacy tests still refer to older design selectors.

## 5. Risks and limitations
- Local URL works only on this computer while the preview server is running, not from a phone or another device.
- npm audit reports four existing dependency advisories (three high, one moderate): http-cache-semantics, sharp, smol-toml, source-map-js. Lockfile/dependencies unchanged. No claim that these establish a live-site exploit; assess exposure and remediation separately before release.
- Commerce is intentionally not added to the production sitemap during this private-review step. Include release metadata/sitemap verification in any later approved release.

## 6. Approval needed
Kris's review of the page content and layout. Separate explicit release approval required before remote push, merge, or publication.

## 7. Critical actions not taken
No push, PR, merge, deployment, production changes, DNS/indexing changes, outreach, spend, new integrations, analytics activation, or form submission. Build-generated source robots/header changes were restored to their original baseline after building; the served dist remains noindex.

## 8. Recommended next action
Review all four local pages:
- http://127.0.0.1:4187/
- http://127.0.0.1:4187/commerce/
- http://127.0.0.1:4187/about/
- http://127.0.0.1:4187/data-partnerships/

Preview server uses the existing scripts/serve-release-preview.mjs, binds 127.0.0.1 only, and was left running for review.
