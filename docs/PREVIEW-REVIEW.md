# Anchorline Growth Engine — preview-only review

## Boundaries

This PR branch is not authorized for production. No merge, production deploy, DNS, domain, production settings, notification, legacy form, CRM/Signal, Command, or private 2ndBrainOS changes are included. The production Netlify build context intentionally fails closed.

Existing root HTML, redirects, report PDF, and brand source files are preserved in Git. The new Astro build publishes only dist. Legacy material is not blindly deleted or shipped as active preview pages.

## Review scope

Home, Growth Engine, B2B Growth, Local Growth, About, Growth Audit, receipt, and a genuine 404. Every generated page includes noindex/nofollow/noarchive; response headers reinforce this. robots.txt disallows crawling. Canonicals use the current preview origin, not an unlaunched production path. No sitemap is advertised for this unindexed preview. Production canonical/crawler settings require release review.

The visual identity is white-led editorial enterprise design with ink, blue and selective gold accents; custom illustrative signal/orchestration/deliverable visuals; an asymmetric homepage and varied section composition. The existing public Anchorline mark is optimized during build. Fonts are packaged locally. No generated imagery, private screenshots, live dashboards, invented results, or confidential data.

All diagrams/examples are conceptual and labeled. The Founder & Leadership section uses the exact owner-provided approved founder photograph with a responsive crop; the source JPEG is already compact and is preserved without face alteration. Foundation wording preserves the existing public statement, with surrounding draft copy for owner review. The public 2ndBrainOS explanation is supporting, not a competing offer. Only the footer Client Login links to the existing protected portal.

## Growth Audit intake verification state

Form: growth-audit. It is included in static build output for Netlify registration, uses the approved field schema, and preserves the Netlify honeypot. Netlify registration is verified. The dedicated form notification growth-audit → hello@anchorlineai.com is verified, with no global rule and legacy rules unchanged. src/settings.ts sets previewFormSubmissionEnabled=true, so the rendered control is the production-ready “Request Your Growth Audit” action.

Automated tests verify that incomplete required fields prevent any POST. Mocked local tests cover accepted and failed backend responses without making a real Netlify submission. Exactly one clearly synthetic real submission remains separately approval-gated; it must verify the Netlify record, hello@ notification receipt, and browser receipt experience. Do not activate unrelated automations.

The receipt page does not emit a conversion event and a direct visit does not claim a request was received. A browser-session marker changes the receipt presentation after an accepted test response; it is not a security credential or authoritative stored-record proof. Verify actual Netlify records separately. Network uncertainty warns reviewers to check records before retrying.

## Analytics

No GA4/GTM/pixel/replay/heatmap script or destination is installed. Existing resource inspection found no usable connected analytics integration and the Analytics browser required login; an isolated property was not verified. Per authorization, use local diagnostics only: window.\_\_anchorlineDiagnostics and anchorline:analytics CustomEvent. Events are enumerated and properties strictly allowlisted; no form values, raw URLs, personal data, storage, or network transmission.

LOCAL EVENT GENERATION and GA4 RECEIPT are different verification states. Never report the latter without a separately verified existing nonproduction destination and receipt evidence. This branch creates no properties or streams.

## Deferred content

No unapproved Privacy/Terms text or placeholder policy routes are exposed. Policy drafting/review remains private. No Results/blog section or unverified client case study is published. The final owner review should confirm draft claims, Foundation wording, public 2ndBrainOS wording, and exact preview limitations.

## Commands

Node >=22.12.0. npm ci; npm run build; npm run test:unit; npm test. Local browser tests need an installed Playwright Chromium browser. npm run preview serves the built static output.

## Release protection

Do not bypass scripts/block-production.mjs. Releasing requires a separate owner authorization and an explicit reviewed production-ready change, including canonical/robots policy, form routing, analytics, policy content, and safeguards. No release is implied by preview approval.
