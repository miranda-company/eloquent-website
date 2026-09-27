# Eloquent website

Static Astro redesign of [eloquent.es](https://eloquent.es). The project replaces WordPress with typed content collections, reusable layouts, plain CSS, light TypeScript, and a consent-controlled analytics setup. Design and implementation proceed one approved layout at a time; see [PLAN.md](PLAN.md).

## Project status

Implemented in the repository:

- Shared responsive shell, homepage, header, footer, navigation, motion, and design tokens.
- Inventio and Landing Page Personal service pages at `/servicios/inventio/` and `/servicios/landing-page-personal/`.
- Work index at `/trabajo/` and three Case Studies at `/trabajo/<project-slug>/`.
- Dossier landing, issue, article archive, and article layouts backed by typed Markdown or MDX collections.
- Legal notice, privacy policy, and cookie policy at `/aviso-legal/`, `/politica-de-privacidad/`, and `/politica-de-cookies/`.
- A reusable cookie-preference interface, Google Consent Mode v2, and conditional loading of Google Tag Manager and GA4.
- Sitemap generation, canonical metadata, crawler rules, structured data, responsive images, reduced-motion support, and no-JavaScript content rendering.
- An immutable archive of the WordPress copy, media, REST responses, HTML, and URL inventory under `archive/wordpress-2026-09-16/`.

Content still awaiting completion:

- The three Landing Page Personal examples use image placeholders and have no external destinations.
- The content collection currently contains one Dossier issue and four canonical articles.

Before production launch, configure the server redirects and HTTP 410 response described in [PLAN.md](PLAN.md), password-protect staging, crawl every route, complete the launch verification, and obtain explicit production approval.

## Run locally

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Astro. The repository tracks `package-lock.json`, so use npm for dependency and script commands. If Astro reports that a development server is already running, stop it with `npx astro dev stop` before starting another.

Create the static production output in `dist/` with:

```sh
npm run build
```

## Quality gates

Run all checks before each layout approval or release candidate:

```sh
npm run check
npm run lint
npm run design:check
npm run format
npm run build
```

These commands cover Astro and TypeScript diagnostics, linting, design-token use, formatting, and the production build.

## Route inventory

| Route                                       | Source                                                    | Status                               |
| ------------------------------------------- | --------------------------------------------------------- | ------------------------------------ |
| `/`                                         | `src/pages/index.astro`                                   | Implemented                          |
| `/servicios/inventio/`                      | `src/pages/servicios/inventio.astro`                      | Implemented                          |
| `/servicios/landing-page-personal/`         | `src/pages/servicios/landing-page-personal.astro`         | Implemented; example content pending |
| `/trabajo/`                                 | `src/pages/trabajo/index.astro`                           | Implemented                          |
| `/trabajo/cn-sant-andreu/`                  | `src/pages/trabajo/cn-sant-andreu.astro`                  | Implemented                          |
| `/trabajo/museu-de-lhospitalet/`            | `src/pages/trabajo/museu-de-lhospitalet.astro`            | Implemented                          |
| `/trabajo/barcelona-supercomputing-center/` | `src/pages/trabajo/barcelona-supercomputing-center.astro` | Implemented                          |
| `/dossier/`                                 | `src/pages/dossier/index.astro`                           | Implemented                          |
| `/dossier/<issue-slug>/`                    | `src/pages/dossier/[slug].astro`                          | Generated from issue files           |
| `/dossier/contenidos/`                      | `src/pages/dossier/contenidos/index.astro`                | Implemented                          |
| `/dossier/contenidos/<article-slug>/`       | `src/pages/dossier/contenidos/[slug].astro`               | Generated from article files         |
| `/aviso-legal/`                             | `src/pages/aviso-legal.astro`                             | Implemented                          |
| `/politica-de-privacidad/`                  | `src/pages/politica-de-privacidad.astro`                  | Implemented                          |
| `/politica-de-cookies/`                     | `src/pages/politica-de-cookies.astro`                     | Implemented                          |

## Repository contracts

Read the relevant contracts before making changes:

| Document                                                                                   | Responsibility                                                                       |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| [AGENTS.md](AGENTS.md)                                                                     | Required workflow, code rules, verification, safeguards, and deployment boundaries   |
| [PLAN.md](PLAN.md)                                                                         | Approved scope, layout sequence, URL preservation, SEO, GEO, and launch requirements |
| [Design system](docs/architecture/design-system.md)                                        | Tokens, typography, spacing, components, interactions, and styling ownership         |
| [Page layouts](docs/architecture/page-layouts.md)                                          | DOM and responsive contract for every page type                                      |
| [Dossier content guide](docs/content/dossier-content-guide.md)                             | Dossier issue and article frontmatter and authoring workflow                         |
| [Privacy, analytics, and legal playbook](docs/privacy/privacy-analytics-legal-playbook.md) | Reusable consent, GTM, GA4, legal-page, testing, and maintenance implementation      |
| [Analytics configuration](docs/privacy/analytics.md)                                       | Eloquent-specific identifiers, enabled products, settings, and verification          |
| [Data retention](docs/privacy/data-retention.md)                                           | Approved email-retention periods and operational process                             |

## Architecture

Shared components live in `src/components/`, own their semantic DOM and internal styling, and consume the variables in `src/styles/tokens.css`. Page stylesheets may compose shared components but must not redefine their internals.

- `BaseLayout.astro` owns metadata, the shared header and footer, consent defaults, the conditional GTM loader, the cookie-preference interface, and the image lightbox.
- `PageHero.astro` provides the common homepage, service, Work-index, and Dossier-landing hero contract.
- `ProjectCard.astro` renders project previews from `src/data/projects.ts`.
- `DossierIssueHero.astro`, `DossierArticleHero.astro`, and `ArticlePreview.astro` own the Dossier presentation patterns.
- `CaseStudyHero.astro`, `EditorialSection.astro`, `MediaGallery.astro`, and `LightboxImage.astro` compose Case Studies.
- `LegalPageLayout.astro` owns the shared legal-page hero, summary, table of contents, and article structure.
- `ConsentBanner.astro` owns cookie categories, preference persistence, withdrawal, and the footer settings trigger.

## Dossier content

Issues are stored in `src/content/issues/`; articles are stored in `src/content/articles/`. Use `.md` by default and `.mdx` only when an entry needs a reusable visual component. Issue files contain ordered article references, while each article exists once at its canonical URL. The build validates frontmatter and references through `src/content.config.ts`.

See [Dossier content guide](docs/content/dossier-content-guide.md) before adding or changing content. The original publication text remains available in the archive's `text/` directory, with unchanged REST and HTML captures alongside it.

## Analytics and consent

The shared shell integrates Google Tag Manager container `GTM-MPRT28KC` and GA4 measurement ID `G-H60YXKMYVE` through separate analytics and advertising choices. All optional Consent Mode states default to denied. GTM is requested only after at least one optional category is accepted, rejection makes no request to Google, and visitors can reopen preferences from the footer.

Read [Privacy, analytics, and legal playbook](docs/privacy/privacy-analytics-legal-playbook.md) before changing tracking, consent, cookies, providers, retention, or legal copy. Record Eloquent-specific changes in [Analytics configuration](docs/privacy/analytics.md) and retention changes in [Data retention](docs/privacy/data-retention.md).

## Staging and production

Set `PUBLIC_STAGING=true` when building a temporary public staging copy:

```sh
PUBLIC_STAGING=true npm run build
```

This adds `noindex, nofollow`; staging must also be password protected at the server. Production builds omit the variable. Do not deploy or launch production without explicit approval.
