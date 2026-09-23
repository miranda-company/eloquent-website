# Eloquent redesign, one approved layout at a time

## Summary

Rebuild Eloquent as a static Astro site on the current server. Archive the published WordPress text, media, and URL inventory before editing copy. Keep the new site on password-protected staging until separate production approval.

## Content and URLs

- Author each Dossier issue and article in its own `.md` file. Use `.mdx` only for reusable visual components. Use Astro's typed content collections and official MDX integration. An issue stores its title, number, summary, and ordered article references; an article stores its title, summary, original publication date, author, and optional image. Validate references at build time and derive “appears in” links from issue files.
- Preserve the existing Dossier, article archive, work, case study, and legal URLs. Give each reused article one canonical URL. Configure a true HTTP 410 response for the empty `/dossier/comunicacion-de-crisis/` issue, and redirect the existing `www` host to `eloquent.es`.
- Retain the complete original copy in the archive. Refine published copy layout by layout for clearer headings, summaries, bylines, factual support, and useful internal links while preserving Eloquent's voice. Do not invent credentials, citations, or publication dates.

## Design and approval workflow

Adapt [Material Design principles](https://m3.material.io/) to Eloquent's editorial identity through consistent type, spacing, color roles, responsive behavior, interaction states, and restrained motion. Use Astro, plain CSS, and light strict TypeScript.

The implementation contract in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) applies to every feature, component, element, section, and page. Before adding markup or CSS, check the shared inventory and reuse or extend an existing component. Repeated patterns use one semantic DOM and one styling owner; pages supply content and compose components without redefining their internals. A pattern is extracted when it reaches a second page, or earlier when a later approved layout is already known to need it.

Each section owns its full-width surface and vertical spacing. One `.container` supplies horizontal gutters and a maximum width of `85rem` (1360px at the default root size) for grids or `70ch` for sustained prose. Use semantic sections, articles, figures, headings, and lists in reading order; add wrappers only for a layout or semantic purpose. Keep comments focused on non-obvious intent.

Build a responsive browser preview, revise it with the owner, and wait for explicit approval before starting the next layout:

1. Shared shell and shorter homepage
2. Dossier landing page
3. Dossier issue page
4. Dossier article page
5. Dossier article archive
6. Work index
7. Case study page
8. Legal page template

Re-review approved layouts when a shared change visibly affects them. Provide an editing guide for writing articles and assembling issues.

## SEO and generative search

- Render primary content and links in static HTML, including when JavaScript is disabled. Give each indexable page a distinct title, description, canonical URL, social preview metadata, logical heading structure, and descriptive internal links. Use accurate image alt text and responsive image sizes.
- Generate an XML sitemap with Astro's [sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/); include only canonical, indexable URLs and accurate modification dates. Redirect the old `/sitemap_index.xml` to the new sitemap index and reference the new location in `robots.txt`.
- Add factual `Organization` structured data on the homepage, `Article` data on Dossier articles, and `BreadcrumbList` data where breadcrumbs are visible. Keep structured data consistent with page text. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) says AI search features use the same SEO foundations and require no special GEO schema or AI text file.
- Allow conventional search crawlers and `OAI-SearchBot`. Disallow the documented training crawlers `GPTBot` and `Google-Extended`. This preserves Google Search eligibility, though blocking Google-Extended can limit grounding in some Gemini apps. See [OpenAI crawler guidance](https://help.openai.com/en/articles/12627856) and [Google crawler guidance](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers).
- Use Search Console and Bing Webmaster Tools for indexing and search visibility checks where account access is available. They require no visitor tracking script. Do not promise rankings or AI citations.

## Verification and launch

At every layout approval gate, run type, lint, design-token, format, and build checks. Inspect component reuse and page-style boundaries, semantic DOM, keyboard and focus behavior, mobile layout, reduced motion, no-JavaScript reading, and that layout's metadata and links. Recheck every existing page that uses a changed shared component. Before launch, crawl every route, verify redirects and the 410 response, validate sitemap, canonicals, robots rules, and structured data, and target mobile Lighthouse scores of at least 90 for performance and accessibility on representative pages.

Remove newsletter and contact forms, reCAPTCHA, and visitor tracking. Contact links use `mailto:info@eloquent.es` until a booking URL exists; DCC remains a smaller link to its separate site. Use replacement legal text supplied and approved by the owner. After production approval, submit the sitemap and monitor indexing errors and search performance.

## Current gate

Foundation and layout 1 (shared shell and homepage) and the separately authorized Landing Page Personal service page are implemented and under review. Do not implement layouts 2–8 until each preceding layout is explicitly approved.
