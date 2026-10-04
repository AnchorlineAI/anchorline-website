---
title: "Cloudflare Makes AI's Web Searches Easier to Follow"
seoTitle: "Cloudflare Web Search API: Providers, Logs and Costs"
description: "Cloudflare's new Web Search API puts search requests beside model activity, making it easier to see what an AI looked up and what it cost."
publishDate: 2026-10-03
author: "Kris McFadden"
category: "AI Systems and Operations"
featured: false
image: "/insights/oct03-cloudflare-web-search.webp"
imageAlt: "Ethernet cables plugged into network switches with illuminated status lights"
imageCredit: "Albert Stoynov / Unsplash. Illustrative networking equipment, not Cloudflare infrastructure."
---

Cloudflare has [introduced a Web Search API](https://blog.cloudflare.com/introducing-web-search-api/) that lets AI applications look things up through Ceramic.ai, Exa or Linkup. It's available in open beta through AI Gateway, the service Cloudflare uses to manage requests to AI models.

The useful part is being able to follow the search. According to [Cloudflare's documentation](https://developers.cloudflare.com/web-search/), search requests appear alongside model requests in its logs and analytics. Teams can choose the search provider and pay through gateway credits or use their existing provider account.

Say an AI assistant researches a competitor's pricing. If the answer looks wrong, you'd want to know what it searched for and which pages came back. If the bill looks wrong, you'd want to see whether it kept searching for the same information. Having those records together gives someone a place to investigate, instead of trying to reconstruct the work from a finished answer.

There's a setup decision worth making early: what should those records contain? Cloudflare's [logging documentation](https://developers.cloudflare.com/ai-gateway/observability/logging/) says logs can include requests and responses, and logging can be switched off. A search provider's zero-data-retention label doesn't mean your gateway isn't keeping a copy. Teams need to decide what belongs in a search query and what they're willing to store.

Developers can use the API now through REST requests or Cloudflare Workers. Built-in server tools that would handle more of the search process are still described as coming soon in the announcement.

For anyone building AI research into daily work, this is a useful place to start comparing providers: run the same questions, inspect the returned pages, and compare the cost. Open the important sources and check their dates before relying on an answer. A shared search connection makes that comparison easier; it doesn't make every provider's results equally good.

## Photo

[Albert Stoynov on Unsplash](https://unsplash.com/photos/a-close-up-of-a-network-with-wires-connected-to-it-dyUp7WPu5q4), used under the [Unsplash License](https://unsplash.com/license). This photograph illustrates network connections; it doesn't depict Cloudflare's service or equipment.
