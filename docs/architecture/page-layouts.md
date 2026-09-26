# Page layout contracts

This document defines the stable composition of each page type in the Eloquent website. It complements [design system](design-system.md), which owns tokens and component rules, and [Dossier content guide](../content/dossier-content-guide.md), which owns Dossier authoring.

A layout contract describes semantic order, shared components, width, responsive behavior, and styling ownership. Copy, images, and collection length may change without changing the contract. When a new page matches an existing type, reuse that contract before creating a new layout.

## Rules shared by every page

### Document shell

Every indexable route uses `BaseLayout` and receives the same document structure:

```text
body
├── skip link
├── SiteHeader
├── main#contenido
│   └── page content
├── SiteFooter
├── ImageLightbox
└── back-to-top link
```

`BaseLayout` owns the canonical URL, title, description, social metadata, shared lightbox, reveal behavior, sticky header, and back-to-top control. A page supplies its content and page-specific structured data. Primary content and navigation remain present in static HTML.

### Width and section model

- A page section owns its full-width surface and vertical padding.
- The first layout child is normally one `.container`. It owns responsive gutters and the `85rem` (1360px) maximum width.
- Sustained prose uses `--prose-width` (`70ch`) inside the main container. The prose limit never replaces the outer container.
- Standard sections use `--section-space`. Dense indexes and editorial collections use `--section-space-compact`; lists within them begin after `--collection-top-space`.
- Grid and Flex belong on the container, semantic list, or a wrapper with a real grouping role. Empty layout wrappers and decorative DOM are not allowed.

### Responsive model

Layouts start with the widest composition and reduce without changing semantic order:

| Width            | Expected behavior                                                             |
| ---------------- | ----------------------------------------------------------------------------- |
| Above 1100px     | Full editorial composition; three- or four-column collections where specified |
| 1100px and below | Dense collections commonly reduce by one column                               |
| 850px and below  | Header and two-column editorial compositions become one column                |
| 600px and below  | Collections become one column and phone spacing applies                       |
| 360px and below  | Narrow-phone typography adjustments apply                                     |

Breakpoint values stay in media queries because custom properties cannot be used there. Shared responsive rules belong in `global.css`; page-only composition belongs in the page stylesheet.

### Heading and DOM order

- Each page has one visible `h1` supplied by its assigned hero.
- Each named section uses an `h2`; card titles normally use `h3` below a section heading.
- Visual placement must not alter reading order. Small screens preserve the meaningful DOM sequence.
- Collections use `ul` or `ol`. Standalone projects and articles use `article`; meaningful media uses `figure`.
- Breadcrumb markup is rendered only when explicitly supplied. Current service and Case Study pages do not use it.

## Hero assignments

| Page type                                                            | Hero                 | Contract                                                                                                        |
| -------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| Homepage, service page, Work index, Dossier landing, article archive | `PageHero`           | Dark standard hero with eyebrow and `h1`; lead, intro, actions, breadcrumbs, and footnote are optional          |
| Case Study                                                           | `CaseStudyHero`      | Full-width project image, readable overlay, `h1`, lead, and metadata strip                                      |
| Dossier issue                                                        | `DossierIssueHero`   | Back link, exploration number, `h1`, Markdown introduction, and article count                                   |
| Dossier article                                                      | `DossierArticleHero` | Article `h1`, summary, author, publication and update dates, issue relationships, and optional full-width image |

Hero typography and internal spacing belong to shared component rules in `global.css`. A page stylesheet may position a hero as a whole but must not override its title size, copy width, or internal spacing.

## Homepage

**Route:** `/`

**Purpose:** Introduce Eloquent, explain the offer, show selected work, lead into the Dossier, and provide organizational context.

```text
PageHero
├── proposition section
├── services section
├── selected work section
├── featured Dossier section
└── about section
```

- `PageHero` contains the primary proposition and actions.
- Proposition, featured Dossier, and about use editorial split grids that become one column at the shared tablet breakpoint.
- Services come from `src/data/services.ts` and use `shortName` as the card label. The list is four columns, then two, then one.
- Selected work comes from `src/data/projects.ts` and uses `ProjectCard`. The homepage may curate a subset but does not duplicate project data or card markup.
- Section order carries the page narrative and changes only with explicit layout approval.
- `home.css` owns section relationships and surfaces. Shared heroes, headings, actions, and cards remain globally owned.

## Service detail

**Current route:** `/servicios/landing-page-personal/`

**Purpose:** Explain one service from problem and value through scope, examples, process, audience, price, and contact.

```text
PageHero
├── context / problem
├── value proposition
├── format or principles
├── inclusions
├── growth or supporting value
├── examples
├── process
├── audience
├── pricing
├── scope
└── final call to action
```

- `PageHero` supplies the service `h1`, concise lead, and primary actions.
- Each section answers one decision-making question. New service pages may omit irrelevant sections, while retained sections preserve this broad narrative order.
- Split editorial sections use a direct two-column grid and collapse at 850px.
- Facts, inclusions, examples, steps, and prices use semantic lists or grouped sections. Three-column groups reduce to two where useful and one on phones.
- Example placeholders remain non-interactive until a real destination exists.
- The final action uses the shared button and contact destination.
- `landing-page-personal.css` owns unique composition. When another service repeats a pattern, extract it into a shared component.

## Work index

**Route:** `/trabajo/`

```text
PageHero
└── work-index section
    └── ul.project-grid
        └── ProjectCard × n
```

- `PageHero` contains the `h1` and intentionally has no supporting copy.
- The collection has no visible heading or count. Its section has an accessible label, and project titles provide visible hierarchy.
- Data comes only from `src/data/projects.ts`; every item uses `ProjectCard`.
- The grid is three columns above 1100px, two through tablet widths, and one below 600px.
- The section uses compact vertical spacing.
- `work-index.css` owns only the surface and grid.

## Case Study

**Routes:** `/trabajo/<project-slug>/`

```text
CaseStudyHero
├── EditorialSection: overview and facts
├── MediaGallery: evidence
├── EditorialSection: problem
├── MediaGallery: problem evidence
├── EditorialSection: solution
├── MediaGallery: solution evidence
└── EditorialSection: results
```

- `CaseStudyHero` is intentionally distinct: its image is full width and its metadata stays attached to the hero.
- Narrative sections use `EditorialSection`. DOM order is label and heading, narrative, then optional evidence rail, including after the layout becomes one column.
- Long copy stays within the prose measure. Facts, findings, phases, and results may use the wide content area.
- Galleries use `MediaGallery` and `LightboxImage`; layout intent is `single`, `duo`, or `triptych`.
- Every enlarged image retains a full-image link fallback, accurate alternative text, and a caption.
- Results reflect source material; do not add unsupported numerical impact.
- Every project page follows this sequence and reuses the shared components; project-specific files
  supply only copy, metadata, imagery, alternative text, and gallery layout choices.
- `case-study.css` owns Case Study narrative composition. Hero, editorial section, gallery, and lightbox internals remain shared.

## Dossier landing

**Route:** `/dossier/`

```text
PageHero
└── dossier-issue section × n
    └── two-column container
        ├── issue introduction and actions
        └── ordered ArticlePreview list
```

- `PageHero` introduces Dossier as a whole.
- Issues are sorted by issue number, newest first.
- Each issue shows its number, article count, title, summary, issue action, archive action, and ordered articles.
- Desktop uses a five-to-seven-column proportion and collapses to one column at 850px.
- Article order comes from issue Markdown and is not resorted by the page.
- Every preview links to its canonical local article route.
- `dossier-index.css` owns the relationship between issue introduction and contents.

## Dossier issue

**Route:** `/dossier/<issue-slug>/`

```text
DossierIssueHero
└── articles section
    ├── CollectionHeading
    └── ol
        └── ArticlePreview variant="media" × n
```

- The hero renders the Markdown introduction and derived article count.
- `CollectionHeading` introduces the contents with one shared heading structure.
- Article references come from issue frontmatter in authored order.
- Media-card text uses the complete card column and does not inherit a prose-width limit.
- The grid is three columns above 1100px, two through tablet widths, and one below 600px.
- `dossier-issue.css` owns only section rhythm and grid composition.

## Dossier article archive

**Route:** `/dossier/contenidos/`

```text
PageHero
└── archive section
    ├── CollectionHeading
    └── ol
        └── ArticlePreview variant="archive" × n
```

- `PageHero` provides the archive title, description, and Dossier back link.
- Articles are sorted by original publication date, newest first.
- Archive previews occupy full rows. Titles and summaries flow across available width and do not inherit the prose measure.
- The section uses compact rhythm and a semantic ordered list.
- `dossier-archive.css` owns archive spacing and list placement; `ArticlePreview` owns each row.

## Dossier article

**Route:** `/dossier/contenidos/<article-slug>/`

```text
article.dossier-article
├── DossierArticleHero
│   └── optional full-width feature image
└── article content section
    └── two-column container
        ├── article navigation
        └── Markdown prose
```

- Each route renders one canonical article. Issue membership is derived from issue references, never copied into article frontmatter.
- The hero owns title, summary, author, publication date, update date, issue links, and optional feature image.
- The feature image spans the viewport and meets the content section without extra bottom spacing.
- Content uses a three-to-nine desktop proportion and becomes one column at 850px.
- Navigation precedes prose in the DOM and remains first on small screens.
- Markdown prose uses `--prose-width`. Its first child has no artificial top margin, including an `h2`.
- Article Markdown contains no `h1`; body sections start with `h2` and nest `h3` beneath them.
- The route publishes `Article` structured data matching visible metadata.
- `dossier-article.css` owns content composition and Markdown typography; the shared hero owns its internals.

## Legal page template

**Routes:** `/aviso-legal/`, `/politica-de-privacidad/`, and `/politica-de-cookies/`

```text
LegalPageLayout
├── PageHero
├── optional overview section
│   ├── draft or status notice
│   └── three-item summary definition list
└── legal content section
    └── two-column container
        ├── sticky table of contents
        └── article
            └── legal-section × n
```

- `LegalPageLayout` owns the repeated page structure, metadata handoff, standard hero, optional notice and summary, contents navigation, and article slot.
- Legal content and consent behavior follow `docs/privacy/privacy-analytics-legal-playbook.md`; this section owns only the layout contract.
- The hero supplies the single `h1`, introduction, and optional visible update date.
- The summary uses a semantic definition list. It remains three columns through tablet widths and becomes one column below 600px.
- The content uses a three-to-nine desktop proportion. At 850px it becomes one column and the table of contents stops being sticky.
- The table of contents is an ordered list of in-page links. Every target section has a stable ID, matching `aria-labelledby`, and sticky-header scroll offset.
- Legal prose remains within `--prose-width`; sections use `h2`, dividers, and restrained vertical rhythm. Cookie inventories use the shared legal table treatment and scroll horizontally when their intrinsic columns exceed the viewport.
- Legal copy uses verified company and provider details and the approved retention periods. Recheck the copy whenever providers, processing purposes, advertising settings, or company registration details change.
- The legal notice identifies the site owner and governs access, content rights, links, responsibility, and applicable law.
- The cookie route documents the consent-controlled GTM integration with separate analytics and advertising categories. The shared `ConsentBanner` owns preference controls, while the footer supplies the persistent “Gestionar cookies” trigger. Neither legal page owns analytics JavaScript or consent styling.
- `legal-page.css` owns the legal overview, table of contents, article composition, and responsive behavior. `PageHero` and `BaseLayout` retain their shared ownership.

## Adding or changing a page layout

1. Identify the closest page type in this document.
2. Compose existing components and tokens before adding page markup or CSS.
3. Extend or extract a shared component when a requirement repeats; do not copy it.
4. Keep the page stylesheet limited to relationships unique to that layout.
5. Update this document when semantic order, component assignment, responsive grid, or styling ownership changes.
6. Recheck every affected route at 1440px, 900px, 768px, and 390px.
7. Verify one `h1`, logical headings, no overflow, readable measures, keyboard focus, reduced motion, static-HTML reading, metadata, and links.
8. Run `npm run check`, `npm run lint`, `npm run design:check`, `npm run format`, and `npm run build`.
