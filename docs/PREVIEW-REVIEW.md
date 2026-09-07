# Anchorline Growth Engine — preview-only review

## Boundaries

This PR branch is not authorized for production. No merge, production deploy, DNS, domain, production settings, notification, legacy form, CRM/Signal, Command, or private 2ndBrainOS changes are included. The production Netlify build context intentionally fails closed.

Existing root HTML, redirects, report PDF, and brand source files are preserved in Git. The new Astro build publishes only dist. Legacy material is not blindly deleted or shipped as active preview pages.

## Review scope

Home, Growth Engine, B2B Growth, Local Growth, About, Growth Audit, receipt, and a genuine 404. Every generated page includes noindex/nofollow/noarchive; response headers reinforce this. robots.txt disallows crawling. Canonicals use the current preview origin, not an unlaunched production path. No sitemap is advertised for this unindexed preview. Production canonical/crawler settings require release review.

The visual identity is white-led editorial enterprise design with ink, blue and selective gold accents; custom illustrative signal/orchestration/deliverable visuals; an asymmetric homepage and varied section composition. The existing public Anchorline mark is optimized during build. Fonts are packaged locally. No generated imagery, private screenshots, live dashboards, invented results, or confidential data.

All diagrams/examples are conceptual and labeled. The Founder & Leadership section uses the exact owner-provided approved founder photograph with a responsive crop; the source JPEG is already compact and is preserved without face alteration. Foundation wording preserves the existing public statement, with surrounding draft copy for owner review. The public 2ndBrainOS explanation is supporting, not a competing offer. Only the footer Client Login links to the existing protected portal.

## Test-form safety gate

Form: growth-audit-preview. It is included in static build output for Netlify registration. Fields match the approved schema. Test subject/context are unmistakably synthetic. The form is JavaScript guarded and has no native submitting button. src/settings.ts keeps previewFormSubmissionEnabled=false until registration AND downstream isolation are verified. Required field validation works while this gate is closed; clicking validates but sends nothing.

Do not enable the gate or send an actual request until the reviewer confirms no notification/global hook, Make/Zapier/live automation, production CRM, or hello@ destination consumes this form. A form name is not proof of isolation. If verification is unavailable, keep the gate closed and report backend acceptance/capture as NOT TESTED. Local mocked responses are UI tests, not real Netlify acceptance or capture.

Once independently verified, a reviewed branch change may enable the gate for a small number of owner-authorized synthetic tests. Runtime requires a Synthetic/Preview Test name and reserved example/.test email. Before enabling, inspect every downstream consumer, not just email settings. Synthetic email delivery is never needed; use records only.

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
