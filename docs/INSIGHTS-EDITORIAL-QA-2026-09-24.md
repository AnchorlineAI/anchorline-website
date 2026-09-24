# Anchorline Insights editorial QA - September 24, 2026

Scope: the ten public articles under `/insights/` on anchorlineai.com. This is a copy and attribution pass, not a new publication, SEO campaign, or change to the Growth Audit service.

## Kris pass

- Corrected the Okta article's date-relative opening and kept announced, generally available, and planned controls distinct.
- Reframed the SEO/AEO/GEO article around Google's published guidance rather than treating the labels as separate proven ranking programs. Added a concrete service-page example.
- Changed the KPMG article's hypothetical pilot failure from a statement of fact to a conditional diagnosis.
- Qualified Google AI Max reporting as forthcoming and limited claims to the search term, creative, and landing-page path it proposes to show.
- Distinguished YouTube announcements from available tools and added its broader September 23 announcement as a source.
- Replaced an irrelevant Amazon adoption-figures caveat with a qualification about vendor-described capabilities and results.
- Trimmed repeated conclusions and staged short lines in the UiPath, Cadence, Growth Audit, and evergreen growth articles. Preserved their practical examples and checklists.
- Kept all article slugs and original publication dates. Added `updatedDate` to substantive corrections; same-day corrections retain the original date.

## Source and rights checks

- Okta: https://www.okta.com/newsroom/press-releases/ai-innovations-oktane-2026/
- Google Search Central: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- KPMG: https://kpmg.com/us/en/media/news/kpmg-announces-client-technology-innovation-group.html
- Google Ads: https://blog.google/products/ads-commerce/ai-max-language-reporting-features/
- YouTube: https://blog.youtube/news-and-events/made-on-youtube-new-tools-power-creation-journey/ and https://blog.youtube/news-and-events/innovation-youtube-era-made-on-viewers-creators/
- Amazon: https://www.aboutamazon.com/news/innovation-at-amazon/seller-assistant-plugin-amazon-quick-claude
- UiPath: https://www.uipath.com/newsroom/uipath-launches-uipath-cartographer-map-of-work and https://www.uipath.com/newsroom/uipath-platform-updates-fusion
- Cadence: https://www.cadence.com/en_US/home/resources/product-briefs/cadence-chipstack-ai-super-agent-pb.html
- Growth Audit promises compared with https://anchorlineai.com/growth-audit/; actual fulfillment was not assessed.
- Four older illustrated articles now have the same visible credit as the two newer ones. The original artwork was introduced in https://github.com/AnchorlineAI/anchorline-website/pull/10, whose release record describes it as original and rights-safe. This record does not independently prove chain of title. No licensed third-party photos were added.

## Validation and boundaries

- Local Astro build and static output checks passed for 22 HTML documents, including all ten article routes.
- Five unit tests passed; 58 Playwright tests passed using the installed Chrome browser. `git diff --check` passed.
- SE Ranking is connected, but the Anchorline website audit has status `new` and zero crawled pages. No new audit was launched; its empty result was not used as evidence of SEO quality.
- No changes to credentials, forms, analytics, DNS, hosting settings, production, or any other brand. No LinkedIn post was made.
- A model or detector cannot certify that prose was human-written. This review checks specificity, attribution, uncertainty, usefulness, and repetition instead.

Release boundary: this edit set is ready for review in one pull request. A merge to `main` auto-publishes and requires separate explicit approval. Verify the exact reviewed commit and the live article text after any authorized merge before sharing updated copy on LinkedIn.
