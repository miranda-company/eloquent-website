# Editing Dossier content

The Dossier is a magazine of issues assembled from canonical articles. The landing page is implemented at `/dossier/`, every issue is generated at `/dossier/<slug>/`, the chronological archive is available at `/dossier/contenidos/`, and every article is generated at `/dossier/contenidos/<slug>/` from its canonical Markdown file.

## Write an article

Add `src/content/articles/<existing-url-slug>.md`. Keep the existing filename slug so the future route remains `/dossier/contenidos/<existing-url-slug>/`. Use `.mdx` only when the body needs a reusable visual component. Start with:

```yaml
---
title: 'Article title'
summary: 'A concise description of the article.'
date: 2026-03-03
updated: 2026-09-25
author: 'Verified author name'
image: '../../assets/dossier/optional-image.jpg'
---
```

The article body follows the frontmatter. Use descriptive headings, link to supporting sources for factual claims, and keep publication dates and author names faithful to the archived publication. Set `updated` to the date of the latest substantive content change; it cannot be earlier than `date`. The `image` field is optional and uses a relative path to a local image so Astro can validate and optimize it.

The shared article layout supplies the page `h1`, summary, byline, dates, issue links, and navigation. Do not repeat them in the Markdown body. Use `h2` for the article body's main sections and `h3` only below an `h2`; never add an `h1`. The first body element may be a paragraph or `h2` because the shared prose template removes its top margin. Do not add layout HTML, container classes, or spacing styles to Markdown content.

## Assemble an issue

Add `src/content/issues/<existing-url-slug>.md`. Its frontmatter defines the ordered article list; its body is the issue introduction:

```yaml
---
title: 'Issue title'
number: 1
summary: 'What this issue explores.'
articles:
  - 'existing-article-slug'
---
```

An issue can refer to an article already used in another issue. Add the existing article slug to each issue that needs it; the order in the array is the display order. Type checking and the production build validate references, and the article body is stored only once. Do not copy article prose into an issue file. Use `.mdx` only if the introduction needs a reusable visual component.

The issue body is rendered as the introduction inside `DossierIssueHero`; do not add an `h1`, navigation, article count, or card markup. The route derives those elements from frontmatter and shared components. Keep the introduction concise enough to function as hero copy, using ordinary paragraphs and links unless a reusable MDX component is approved.

## Before publishing

Run `npm run check`, `npm run lint`, `npm run design:check`, `npm run format`, and `npm run build`. Review the rendered article and every issue that references it. The original text and publication details are in `archive/wordpress-2026-09-16/`.
