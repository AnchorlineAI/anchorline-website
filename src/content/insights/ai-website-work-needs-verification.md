---
title: "AI Can Suggest a Website Fix. It Still Has to Prove It Worked"
seoTitle: "Closed-Loop AI for Website Work: Verify Before You Escalate"
ogTitle: "AI Can Suggest a Website Fix. It Still Has to Prove It Worked"
description: "Google's PageBreak project shows why AI-assisted website work needs observable evidence before a suspected issue becomes an accepted fix."
publishDate: 2026-09-25
author: "Kris McFadden"
category: "Website Systems"
featured: false
image: "/insights/ai-website-work-needs-verification.svg"
imageAlt: "An AI suggestion moves through a website check and observable result before human acceptance."
imageCredit: "Original Anchorline editorial illustration."
---

AI can look at a website and give a polished explanation of what needs to change. It can spot an unclear page, a weak call to action, a missing link, or a technical issue worth checking.

That's helpful. It isn't proof that the problem is real, and it doesn't prove the suggested fix worked.

Google's Product Security team recently described an internal agent called PageBreak. It looks for possible vulnerabilities in Google's first-party web applications. Google says the system does not send a suspected issue straight to a product team. It passes the hypothesis to a specialized validator that tests a real payload in a running environment.

Google reports that this approach has found more than 500 cross-site scripting vulnerabilities with a near-zero false-positive rate. Those are Google's results in Google's environment. They are not a promise that another organization can reproduce them. The useful lesson is simpler: a claim should meet an evidence threshold before it becomes someone else's work.

## Check what the visitor sees

Website work needs the same discipline. If AI says a route is broken, open the route. If it says metadata is missing, inspect the rendered page. If it says a mobile layout hides the next action, look at the page on a phone-sized screen. If it says an internal link is dead, follow it.

Search work needs that same honesty. A page may contain the right terms and still leave a buyer's question unanswered. It may look polished while doing a poor job of explaining the offer or giving someone a reason to make contact.

AI can help a team get to those questions faster. It can't replace the check itself.

## Keep uncertainty visible

Google also acknowledges that its validators do not cover every vulnerability type or complex scenario. The company keeps unverified findings to guide future investigation, but it does not send them to product teams as confirmed issues.

That is a useful habit outside security. An unverified observation may belong in a review queue. It may point to a page that deserves a closer look. It should not be presented as a completed finding or a finished fix.

Cybersecurity testing is a separate discipline, and this is not a claim that Anchorline provides penetration testing. The relevant standard is evidence: AI-assisted website work should make a clear distinction between a reasonable suggestion and a result that has been checked.

An [Anchorline Growth Audit](/growth-audit/) begins there. We look at the website, search visibility, and lead path before recommending where to begin. That gives a business a clearer view of what deserves attention before more work gets underway.

## Source

- [Google Security Blog: Agentic Hacks, Real Proofs: Inside Google's PageBreak Project](https://blog.google/security/agentic-hacks-real-proofs-inside-googles-pagebreak-project/), September 24, 2026.
