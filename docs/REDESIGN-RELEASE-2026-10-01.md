# Anchorline redesign release

## Scope

Replace the public marketing design with the reviewed white/black/lime layout and original gold-anchor branding. Homepage pricing is removed; /pricing/ and /website-search-audit/ retain the $750 audit. The free offer is named Growth Review.

## Preserved contracts

- Existing article slugs, original publication dates, image assets, and pinned feature. Two offer-related articles have an October 1 updatedDate and aligned Growth Review wording.
- /growth-audit/ remains the existing free intake route. Its Netlify form name, field names, hidden subject, honeypot, success endpoint, receipt storage key, and analytics event names remain unchanged. No paid checkout or additional collection field is added.
- Existing production-only GA4 loader; no new tracker or integration. No live customer information was used in testing.
- /privacy/, /terms/, /growth-audit/received/, all existing growth-engine routes, and the footer client-login link remain available. /growth-engine/ uses /services/ as canonical; B2B and local pages retain their own focused copy and canonical URLs.
- Existing /command redirect, Netlify build guard, provider configuration, settings, access controls, and secrets are untouched.

## Verification

- Production and preview builds: 39 HTML pages; built-in checks cover canonical URLs, schema, robots, sitemap, original form identity, receipt noindex, GA4 production gating, and protected-portal link count.
- New release parser: 39 pages, 59 local references, zero errors; checks local fragments, image alt attributes, single H1, form field contract, homepage price absence, and $750 on dedicated pages.
- Existing diagnostic unit tests: 5 passed.
- Browser layout checks: 21 routes across 320, 390, 768, and 1440 pixel widths; 84 combinations, no horizontal overflow and one H1 per page.
- Local axe checks: all 39 pages at mobile and desktop widths, 78 checks, no automated WCAG A/AA violations. Two decorative icons required manual contrast review: white on #171817 and #171817 on white. Both are aria-hidden. Automated checks are not a full accessibility certification.
- Form: empty submission identifies all required fields and focuses the first invalid input. A synthetic example.com submission to the loopback-only server receives its deliberate 405 rejection, preserves fields, and shows no false success. No test lead was sent to Netlify or email.
- Mobile menu opens and closes with Escape; article filtering, pricing FAQ, desktop and phone renderings checked.
- The legacy visual test suite targets the replaced design and was not represented as passing. Current release checks and browser evidence cover the replacement.

## Release boundary

No DNS, credentials, auth, portal, CRM, notification routing, payment, or integration changes are part of this release. Publication requires a passing PR deploy and matching reviewed commit, followed by production deploy verification and live content/asset checks. Provider-side email delivery is not asserted by local tests.

## Dependency assessment

The baseline has Astro 7.3.1 -> devalue 5.9.2, flagged by npm audit. The built site is static, with no application SSR adapter or devalue usage found in source/client bundles. That limits the identified public runtime exposure but does not make the build dependency clean. A narrow dependency repair is awaiting explicit authorization before publication. Reference: https://github.com/advisories/GHSA-j22f-vq7h-c4qm (patched 5.9.3).

## Assets

public/brand/gold-anchor.png is the exact user-supplied original logo. public/brand/halftone-anchor.png is a generated derivative of that anchor, not borrowed agency/client artwork. Astro serves optimized WebP derivatives. Existing article-image provenance and credits are retained; no new third-party stock image was introduced.
