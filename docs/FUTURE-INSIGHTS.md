# Future Insights and newsletter implementation

The current Astro static architecture can add an Insights publication without rebuilding the marketing site.

## Recommended structure

- Add an `insights` content collection under `src/content.config.ts` with a schema for title, description, publish date, optional update date, author, category, and related entry references.
- Add `src/pages/insights/index.astro` for the publication index.
- Add `src/pages/insights/[slug].astro` using `getStaticPaths()` for article routes.
- Extend the existing Site layout with article-specific canonical and Open Graph metadata only when the article template is introduced.
- Emit `Article` and `BreadcrumbList` structured data from the article template using verified frontmatter values.
- Add descriptive links from articles to relevant Growth Engine pages and related articles.
- Add `/insights/` to navigation and the production sitemap only when at least one approved article exists.

## Newsletter later

Add the newsletter CTA only after the destination and privacy behavior are approved. Keep provider-specific code behind a dedicated component or endpoint so a future MailerLite connection does not alter article rendering. Define the form identity, consent language, success state, error state, notification/automation ownership, and measurement before activation.

No Insights route, empty navigation item, newsletter form, MailerLite dependency, or tracking code is part of the current release.
