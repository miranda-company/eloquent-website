# Eloquent redesign, one approved layout at a time

## Summary

Rebuild Eloquent as a static Astro site on the current server. Archive the published WordPress text, media, and URL inventory before editing copy. Keep the new site on password-protected staging until separate production approval.

## Content and URLs

- Author each Dossier issue and article in its own `.md` file. Use `.mdx` only for reusable visual components. Use Astro's typed content collections and official MDX integration. An issue stores its title, number, summary, and ordered article references. An article stores its title, summary, publication and update dates, an author object with a name and optional verified URL, and an optional image. Validate references at build time and derive “appears in” links from issue files. Render an author without a URL as plain text; linked author profiles open in a new tab and are included in matching `Article` structured data.
- Preserve the existing Dossier, article archive, work, case study, and legal URLs. Give each reused article one canonical URL. Configure a true HTTP 410 response for the empty `/dossier/comunicacion-de-crisis/` issue, and redirect the existing `www` host to `eloquent.es`.
- Strategic service URLs use descriptive Spanish slugs. Keep `/servicios/inventio/`, `/servicios/kairos/`, `/servicios/kanon/`, and `/servicios/ethos/` as permanent redirects to their canonical descriptive routes. Astro generates static redirect fallbacks; the production server must return true HTTP 301 responses for these mappings.
- Retain the complete original copy in the archive. Refine published copy layout by layout for clearer headings, summaries, bylines, factual support, and useful internal links while preserving Eloquent's voice. Do not invent credentials, citations, or publication dates.

## Design and approval workflow

Adapt [Material Design principles](https://m3.material.io/) to Eloquent's editorial identity through consistent type, spacing, color roles, responsive behavior, interaction states, and restrained motion. Use Astro, plain CSS, and light strict TypeScript.

The implementation contract in [design system](docs/architecture/design-system.md) applies to every feature, component, element, section, and page. Before adding markup or CSS, check the shared inventory and reuse or extend an existing component. Repeated patterns use one semantic DOM and one styling owner; pages supply content and compose components without redefining their internals. A pattern is extracted when it reaches a second page, or earlier when a later approved layout is already known to need it.

The route-level contracts in [page-layout contracts](docs/architecture/page-layouts.md) define each page type's semantic order, hero assignment, width model, responsive behavior, and stylesheet ownership. Update that reference with any approved structural layout change.

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

- Render primary content and links in static HTML, including when JavaScript is disabled. Give each indexable page a distinct title, description, canonical URL, social preview metadata, logical heading structure, and descriptive internal links. Use accurate image alt text and web-ready source files with intrinsic dimensions.
- Generate an XML sitemap with Astro's [sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/); include only canonical, indexable URLs and accurate modification dates. Redirect the old `/sitemap_index.xml` to the new sitemap index and reference the new location in `robots.txt`.
- Add factual `Organization` structured data on the homepage, `Article` data on Dossier articles, and `BreadcrumbList` data where breadcrumbs are visible. Keep structured data consistent with page text. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) says AI search features use the same SEO foundations and require no special GEO schema or AI text file.
- Allow conventional search crawlers and `OAI-SearchBot`. Disallow the documented training crawlers `GPTBot` and `Google-Extended`. This preserves Google Search eligibility, though blocking Google-Extended can limit grounding in some Gemini apps. See [OpenAI crawler guidance](https://help.openai.com/en/articles/12627856) and [Google crawler guidance](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers).
- Use Search Console and Bing Webmaster Tools for indexing and search visibility checks where account access is available. They require no visitor tracking script. Do not promise rankings or AI citations.

## Verification and launch

At every layout approval gate, run type, lint, design-token, format, and build checks. Inspect component reuse and page-style boundaries, semantic DOM, keyboard and focus behavior, mobile layout, reduced motion, no-JavaScript reading, and that layout's metadata and links. For enlarged images, verify click and keyboard activation, Escape and backdrop closing, focus restoration, responsive sizing, accurate alternative text and captions, and the full-image link fallback. Recheck every existing page that uses a changed shared component. Before launch, crawl every route, verify redirects and the 410 response, validate sitemap, canonicals, robots rules, and structured data, and target mobile Lighthouse scores of at least 90 for performance and accessibility on representative pages.

Remove newsletter and contact forms and reCAPTCHA. Google Analytics and advertising functions are integrated through Google Tag Manager container `GTM-MPRT28KC` using separate consent categories: GTM loads only after at least one optional category is accepted, and preferences remain accessible from the footer. Contact links use `mailto:info@eloquent.es` until a booking URL exists; DCC remains a smaller link to its separate site. Use replacement legal text supplied and approved by the owner. After production approval, submit the sitemap and monitor indexing errors and search performance.

## Current gate

The shared shell, homepage, four strategic service pages, Landing Page Personal, Work index, three Case Studies, Dossier landing, Dossier issue, article archive, Dossier article template, and legal page template are implemented. The homepage uses the approved vector-field treatment and accessible client-logo carousel. Strategic services share `StrategicServicePage`, descriptive canonical slugs, and redirects from their former product-name routes. Work and homepage project cards use centralized project data. Case Studies share a full-width hero, evidence-led editorial sections, responsive galleries, and progressive image enlargement.

Dossier routes use typed issue and article collections, ordered validated references, reusable previews, canonical article URLs, derived “Aparece en” links, optional linked author profiles, and matching structured data. Legal notice, privacy policy, and cookie policy use the shared legal template and verified organisation, provider, analytics, advertising, consent, and retention details. The shared shell provides separate analytics and advertising choices, Consent Mode v2 defaults, consent-controlled GTM loading, withdrawal, and persistent cookie settings. Current content limits and production-launch requirements are recorded in `README.md`.
