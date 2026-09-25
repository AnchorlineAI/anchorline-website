# Anchorline Insight editorial QA - September 25, 2026

## Scope

One new AnchorlineAI.com Insight: `descartes-trade-intelligence-traceable-ai`. This review does not change the Growth Audit, offers, forms, analytics, integrations, pricing, DNS, or any other brand.

## Source and claim review

- Primary source checked September 25: [Descartes announcement](https://www.descartes.com/resources/news/descartes-expands-ai-innovation-agent-helps-reduce-global-trade-data-research-and-analysis), posted September 24, 2026.
- The source says Datamyne's AI Agent supports natural-language trade questions, dynamic visualizations, and drill-down access to shipment records.
- The article attributes the up-to-90-percent time reduction, 230-market coverage, and more-than-500-million annual shipment-record figures to Descartes. It does not present them as independent benchmarks, universal outcomes, or a promise from Anchorline.
- The article does not claim that the records are complete, error-free, causally explanatory, or authoritative in every market.

## Internal link decision

The package required a live, indexable Anchorline article titled "A Reliable Agent Must Prove What It Thinks It Found." Production has an indexable article about the same verification principle, but its title is "AI Can Suggest a Website Fix. It Still Has to Prove It Worked." The required title match did not pass, so no internal link was added.

The package's specific conditional-link instruction says to omit the sentence in that case. Its generic stop condition says to stop if the target is not verifiably live. Those instructions conflict; this review follows the more specific omission rule and records the conflict for owner review.

## Image rights

- File: `public/insights/descartes-trade-intelligence-traceable-ai.svg`
- SHA-256: `ee636f3d3da3762d56e0fa4f7531910cc4162815adebe51995229f0cd4ebd8c8`
- Credit: Original Anchorline editorial illustration.
- Treatment: an abstract question-to-answer-to-records flow. It contains no Descartes logo, product interface, dashboard, map, trade data, shipping-company marks, or third-party artwork.
- Rights status: original vector artwork created for this article; no license purchase or third-party asset is used.

## SE Ranking evidence

- Read-only audit `417208` completed September 24: 22 crawled pages, score 82, one error, 23 warnings, and 15 notices. Audit `413833` is new with zero crawled pages and was not used as a health conclusion.
- The completed audit lists one slow-page warning for the homepage and 22 missing-alt warnings on existing site pages. Neither finding applies to this unreleased article. The new article has descriptive image alt text.
- The audit lists `robots_not_accessible`, but its issue-detail response contains no URLs. Live `https://anchorlineai.com/robots.txt` must be checked at release readback before treating that historic finding as current.
- The package's supplied U.S. phrases informed natural entity use only. No search volumes, difficulty, CPC, rankings, or outcome claims are published.

## Rewrite and provenance

Kris rejected the original package language and lead visual before launch. The original supplied package remains task provenance only. The article file now contains the shorter, plain-language Kris-pass rewrite. It explains Datamyne, what a person can ask, which parts of a shipment record can be inspected, and the limits on Descartes' reported figures.

The lead visual was replaced with an original question-to-records illustration. It has no vendor logo, copied interface, actual trade data, or third-party asset. The image uses one question, one arrow, and a stack of generic record sheets so a beginner can understand the point without decoding a diagram.

## Preview validation

- Review preview: `https://deploy-preview-17--spontaneous-daifuku-666a8c.netlify.app/insights/descartes-trade-intelligence-traceable-ai/`
- Desktop and 390-pixel mobile checks returned HTTP 200, rendered the article image at 1600 by 900 pixels, and had no horizontal overflow.
- Both browser checks had no console errors or warnings, failed requests, or HTTP error responses.
- The article title, H1, source, credit, Article schema, Breadcrumb schema, preview `noindex`, and the intentional absence of the conditional body link were verified.
- Netlify reports this review deploy as ready with no deployment error. Its deploy validation scanned 113 files and reported no secret matches.
- Post-rewrite local review repeated the desktop and 390-pixel mobile checks with the new 221-word article and new image. The browser suite passed 57 standard checks plus three isolated diagnostics for the port-bound form and pathway assertions.
- A 783-pixel review found the question card's final line too close to its border. The SVG now uses three intentional question lines; refreshed 783-pixel and 390-pixel checks confirm the text remains inside the card with no overflow.

## Release boundary

This article is prepared for a review-only preview. Merge to `main` auto-publishes and requires separate explicit approval after preview review.
