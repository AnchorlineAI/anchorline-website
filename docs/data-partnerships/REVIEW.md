# Data Partnerships: preview review

October 9, 2026. Status: built and locally previewed; not approved for production.

## What changed

- Added /data-partnerships/ using the existing Site layout and visual system.
- Owner and buyer mailto links have distinct subjects and a visible address.
- Added four-step qualification/introduction process, founder section,
  coordination-through-evaluation explanation, five native FAQs and disclosure.
- Added proposed email-inquiry language to /privacy/ and updated its draft date.
- Added route-specific static checks and included the route in existing checks.
- No new forms, uploads, pricing, named providers, relationships or guarantees.
- No homepage, Services navigation, article, shared layout, intake or tracking edits.

## Validation

- npm run build: PASS, 41 HTML documents, preview context.
- npm run test:unit: PASS, 5/5.
- node scripts/check-data-partnerships.mjs: PASS in preview context.
- Local production-shaped build plus route check: PASS; this does not deploy.
  Draft forceNoindex remains true and production sitemap omits this route.
- Rebuilt preview output afterward with http://127.0.0.1:4190 canonical origin.
- Existing Playwright regression checks for GA4/privacy and Organization/portal:
  PASS, 2/2, against the preview at 4190. The standard test server exited early;
  an ignored local config reused the already-running preview. No application
  code was changed for that workaround. Full legacy suite was not run.
- Browser inspection: 320, 390, 768 and 1440 px; no horizontal content overflow.
- Tested buyer anchor, FAQ click/keyboard toggle and mobile menu/Escape behavior.
- Portrait rendered at natural width 600 after lazy loading. Brand reused.
- One H1, no form/upload controls, correct email addresses/subjects, no GA4 loader
  in the preview. No warning/error entries observed in the page's browser log.
- git diff --check: PASS. Shared layout, homepage, scripts, settings, navigation,
  sitemap source, Netlify config and lockfile unchanged from the base commit.
- Mailto URLs inspected, not sent. Inbox delivery remains UNVERIFIED.

Screenshots (local, ignored): output/playwright/desktop.jpg,
desktop-hero.jpg, mobile.jpg and mobile-hero.jpg.

## Existing analytics: observed code behavior

src/layouts/Site.astro includes one GA4 loader and gtag configuration only when
CONTEXT=production and URL=https://anchorlineai.com. The inspected shared layout
does not gate that loader on a consent choice or issue a consent command. No
consent-management implementation was established by this review. The preview
contains no GA4 loader; no new email-click events were added. Provider-side GA4
settings, all cookie behavior and jurisdictional requirements were not audited.

The new page would inherit existing production analytics if released unchanged.
Before release, decide whether to retain that behavior or separately authorize
a page-level exclusion/consent implementation. Do not imply a legal compliance
certification or silently change tracking on other pages.

## Proposed privacy addition

Email links are not a Netlify submission form. Email can contain attachments
even though the page says not to send files. The addition describes use for
responding, fit review and coordination; separates replying from introduction,
buyer sharing and marketing subscription; and calls for permission before
sharing. Unexpected sensitive material is held from forwarding while handling
is resolved. Kris should confirm that operational handling before publication.
No new retention period, mailbox processor, staffed team or response SLA is claimed.

## Launch blockers

1. Verify a controlled inbound email actually reaches the intended mailbox.
   No test email or mailbox access was authorized or attempted in this build.
2. Review the proposed privacy language and settle the page's analytics posture.
3. Review the exact preview and authorize production publication/indexing.
   Then remove the route's draft noindex override, update its check expectation,
   add the canonical route to sitemap, and verify the production commit/content.

Provider contracts are prerequisites for compensated introductions, not for
this honestly scoped page. No initial owner campaign should begin before an
actionable buyer requirement and appropriate referral arrangement exist.

## Critical actions not taken

No merge, production deploy, search submission, navigation promotion, DNS/auth
change, integration activation, mailbox test, outreach, provider registration,
agreement acceptance, spending or handling of client data. No changes to article
PRs 21, 23 or 25. A deploy preview is not production or confidential storage;
noindex is not access control.

## Next action

Kris reviews the landing page and proposed privacy section. Resolve the three
launch blockers before release; buyer outreach remains separately gated.
