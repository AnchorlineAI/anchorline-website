# Insights Editorial QA - September 28, 2026

## Scope

This review branch adds two standalone Anchorline Insights articles:

1. `google-tests-flipkart-buy-button-india`
2. `bcg-asia-study-llm-search-buying`

Base commit: `a1f863105a87cc3e8a18d03306fc72ba7a6513bc` (Row Zero live publication). The branch does not modify the Growth Audit, form settings, tracking, deploy configuration, or other articles.

## Reporting and claim boundaries

### Google and Flipkart

- TechCrunch reported on September 26 that Google was testing a Buy button on selected Flipkart listings in Gemini and AI Mode in India. Its reporting described a small user and product test, with a Flipkart-branded checkout inside the AI experience.
- Google told TechCrunch it regularly tests experiences and gave no further detail. Flipkart did not comment.
- The article calls the test reported and limited. It does not claim a general rollout, ranking factors, payment technology, commercial terms, conversion effects, or guaranteed retailer inclusion.
- An expected October expansion is attributed to TechCrunch's source familiar with the matter, not presented as an announcement.
- Google's April 7 India shopping post is used only for the existing, official context that Gemini and AI Mode can show product listings, comparison information, prices, reviews, inventory, and places to buy.

### BCG consumer research

- BCG's September 25 article describes its Global Consumer Radar research on nearly 5,500 consumers in China, India, Japan, and South Korea across 16 categories.
- The article preserves BCG's definitions: reach is a journey using a touchpoint; influence is a user of that touchpoint saying it shaped the brand ultimately chosen.
- The 12% reach and 64% influence figures are explicitly attributed to BCG's survey. They are not treated as causal proof, global benchmarks, or a forecast.
- The article does not claim that an AI system can audit itself, reveal ranking logic, or guarantee a result.

## Sources checked live

- TechCrunch, [Google tests buying from Walmart-owned Flipkart through Gemini and AI Mode in India](https://techcrunch.com/2026/09/26/google-tests-buying-from-walmart-owned-flipkart-through-gemini-and-ai-mode-in-india/), checked September 28, 2026.
- Google, [New ways Google is using AI to make shopping easier](https://blog.google/intl/en-in/products/explore-communicate/new-ways-google-is-using-ai-to-make-shopping-easier/), checked September 28, 2026.
- BCG, [How LLM Search Is Shaping Consumer Buying in Asia](https://www.bcg.com/publications/2026/llm-search-shapes-asian-consumer-buying), checked September 28, 2026.

## Duplicate and language check

- Repository search found no existing Insight about Flipkart, BCG's Asia consumer research, an AI buy button, or an LLM purchase-journey study.
- The drafts use direct titles and short connected prose. They avoid the handoff's formal phrases such as "AI-mediated," "inspection discipline," and "commercial surface."
- The two articles have different jobs: the Flipkart piece reports a limited transaction experiment; the BCG piece explains how to interpret a survey and check public business information.

## Read-only SE Ranking check

- The existing SE Ranking tab was opened read-only on September 28. It belongs to `ToniMcFadden.com - Speaker, Author and Editorial Visibility`, not AnchorlineAI.com.
- It therefore is not valid evidence for these Anchorline articles. No Anchorline project, crawl, keyword, AI tracker, or settings change was opened or run.
- No ranking, traffic, exposure, or conversion claim appears in either article. A future Anchorline-specific SE Ranking review can assess discoverability after publication, but it cannot validate the reporting or promise results.

## Image rights and processing ledger

| Article | Local image | Source and license | Credit | SHA-256 |
| --- | --- | --- | --- | --- |
| Google / Flipkart | `public/insights/google-tests-flipkart-buy-button-india.webp` | [Harper Sunday on Unsplash](https://unsplash.com/photos/a-couple-of-boxes-that-are-sitting-on-a-table-03iCZxk8UlM), marked free to use under the Unsplash License | Photo by Harper Sunday on Unsplash. | `bccd82fd7a05db5e9c4cdac19e7c443c5a141a111e331a6eb11cfe46cba00b15` |
| BCG research | `public/insights/bcg-asia-study-llm-search-buying.webp` | [Scott Graham on Unsplash](https://unsplash.com/photos/person-holding-pencil-near-laptop-computer-5fNmWej4tAA), marked free to use under the Unsplash License | Photo by Scott Graham on Unsplash. | `d0e6b0c0df51cd84b282ff81e8464cf72c66034373cd1f1ea097771d78de7845` |

Both assets are locally inspected 1600x900 WebP crops. Neither is a chart, source-company image, logo, checkout screenshot, or paid Unsplash+ asset. No stock purchase was made.

## Existing unrelated gate

The release suite currently contains a Growth Audit form-settings hash assertion that fails against the same `src/settings.ts` bytes at the branch base. This batch will not weaken or update that assertion. The mismatch is recorded for separate investigation.
