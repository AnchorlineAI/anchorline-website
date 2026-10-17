# Commerce company release - October 17, 2026

## 1. Goal status
Release candidate validated locally. Remote preview, merge, and live verification will be reported in the task after deployment.

## 2. Work completed
- Coordinated homepage, new Commerce page, and About page explain digital services, owned marketplace retail, and independent data introductions.
- Services becomes Digital Services in desktop/mobile/footer navigation and the services page title. Commerce and Data Partnerships remain separate destinations.
- Commerce contact links and displayed address use hello@anchorlineai.com, including homepage/About contact links. Kris confirmed the mailbox was already delivery-tested; no new email test was sent.
- Commerce added to the production sitemap. Existing Data Partnerships content and disclosures, Privacy, contact form handling, GA4 configuration, article content, featured Growth Review, and pricing remain unchanged.

## 3. Files created or edited
- src/layouts/Site.astro
- src/pages/index.astro, about.astro, commerce/index.astro, services/index.astro, sitemap.xml.ts
- src/components/CompanyClose.astro
- src/styles/company.css
- scripts/check-output.mjs, qa-commerce-preview.mjs, qa-commerce-release.mjs
- docs/commerce-preview-handoff.md, commerce-release-handoff.md

## 4. Validation
- Preview and production builds pass checks across 42 HTML documents.
- Five diagnostic/privacy unit tests pass.
- Preview: 30 route/viewport checks across six widths, 10 axe accessibility scans, 17 internal links, desktop header separation, mobile navigation, email links, and local submission rejection.
- Production output: desktop/mobile metadata, image loading, accessibility, GA4 loader presence, navigation, featured article, Commerce links, sitemap, and robots checks. External browser requests are blocked during QA; no analytics or form events are sent.
- Desktop/mobile screenshots reviewed. Automated accessibility checks are not an exhaustive conformance certification.
- Source diffs confirm settings, tracking script, contact handling, Data Partnerships body, Privacy, and dependency manifest/lockfile unchanged.
- Legacy Playwright suite not run: it includes obsolete design selectors and routes. Scoped release scripts cover the changed behavior without weakening those historical assertions.

## 5. Risks or blockers
Four pre-existing npm audit advisories remain: http-cache-semantics (high), sharp (high), smol-toml (moderate), and source-map-js (high). These are in the Astro/image build toolchain. Astro is configured for static output with no server adapter; the published dist contains static assets, not a Node server or these packages. This change reuses existing images and adds no upload/data-processing endpoint. No new public runtime exposure was identified for this content release. This is not a clean security audit: build-tool exposure remains and should be handled as a separate scoped dependency-maintenance task.

## 6. Approval needed
No additional approval needed for this bounded release: the current user request explicitly asks to update and publish. Dependency/security maintenance and new integrations are outside this release.

## 7. Critical actions not taken
No email, outreach, spend, DNS/account changes, new tracking/forms/integrations, edits to other open article PRs, or dependency upgrades. No claim of a new mailbox-delivery test.

## 8. Recommended next action
Verify the reviewed remote preview, merge the exact reviewed head, and confirm Netlify's production commit and live pages. Keep unrelated article PRs open and untouched.
