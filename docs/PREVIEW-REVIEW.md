# AnchorlineAI.com — production release candidate

## Scope

This branch prepares the accepted AnchorlineAI.com design and information architecture for public release through PR #5. It does not merge main or deploy production. The release delta is limited to environment-aware indexing and canonicals, preview-only labeling, production-safe build guards, Privacy and Terms pages, crawler controls, and release verification.

## Public pages

Home, The Growth Engine, B2B Growth, Local Growth, Our Approach, About, Request Your Growth Audit, Privacy, and Terms. The Growth Audit receipt remains noindex and excluded from the sitemap. A genuine 404 also remains noindex.

Production output uses index/follow on approved public pages and canonical URLs under https://anchorlineai.com. Deploy Previews remain noindex/nofollow/noarchive, use preview-origin canonicals, identify themselves as non-production, and block crawling through robots.txt.

## Growth Audit

The live form name, fields, validation, honeypot, POST behavior, receipt safeguards, and B2B/Local preselection are unchanged. Netlify currently registers the growth-audit form with the expected fields and honeypot. The existing notification configuration to hello@anchorlineai.com is preserved; no notification, CRM, Signal, Make, Zapier, MailerLite, Acquisity, or other automation dependency is added.

No new synthetic submission is required because form behavior did not change. Mock/intercepted tests verify browser behavior without creating a Netlify submission.

## Privacy and Terms

The release candidate includes concise Privacy and Terms pages based on the site behavior verified for launch. Both pages are explicitly marked for Kris owner review before merge and state that the wording is not legal advice. They do not invent retention periods, data sales, advertising practices, legal bases, or unverified processors.

## Analytics

GA4 is deferred. No GA4 property, Google Tag Manager, advertising pixel, session replay, or heatmap tooling is installed. This is not a launch blocker.

## Release protection

Netlify production builds run the normal tested Astro build only when CONTEXT=production and BRANCH=main. PR #5 Deploy Previews are allowed when CONTEXT=deploy-preview and REVIEW_ID=5. Other Netlify contexts fail closed through scripts/guard.mjs.

The connected GitHub tool does not expose branch-protection or ruleset administration, the unauthenticated repository confirms main is currently unprotected, and repository settings are not accessible in the current browser session. The Netlify integration does not expose production-deploy locking. No protection control is changed through an invented workaround. The source guard is therefore the implemented protection available in this release delta; main branch protection remains a recorded limitation for owner review.

## Verification

Run the complete release suite after the release delta is finalized:

```sh
NETLIFY=true CONTEXT=deploy-preview REVIEW_ID=5 BRANCH=forge/growth-engine-preview DEPLOY_PRIME_URL=https://deploy-preview-5--spontaneous-daifuku-666a8c.netlify.app npm run build
npm run test:unit
npm test
NETLIFY=true CONTEXT=production BRANCH=main npm run build
```

Also verify the final Netlify Deploy Preview and PR record before requesting merge approval. Production merge and deployment require their own exact-action approval.
