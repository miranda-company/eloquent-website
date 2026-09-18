# Editing Dossier content

The Dossier is a magazine of issues assembled from canonical articles. The issue and article layouts are the next approval stages; the collections are ready, but no Dossier page has been built yet.

## Write an article

Add `src/content/articles/<existing-url-slug>.md`. Keep the existing filename slug so the future route remains `/dossier/contenidos/<existing-url-slug>/`. Use `.mdx` only when the body needs a reusable visual component. Start with:

```yaml
---
title: 'Article title'
summary: 'A concise description of the article.'
date: 2026-03-03
author: 'Verified author name'
image: '/images/optional-image.jpg'
---
```

The article body follows the frontmatter. Use descriptive headings, link to supporting sources for factual claims, and keep dates and author names faithful to the archived publication. The `image` field is optional.

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

An issue can refer to an article already used in another issue. The build validates references, and the article body is stored only once. Do not copy article prose into an issue file. Use `.mdx` only if the introduction needs a reusable visual component.

## Before publishing

Run `npm run check`, `npm run lint`, `npm run format`, and `npm run build`. Review the rendered article and every issue that references it. The original text and publication details are in `archive/wordpress-2026-09-16/`.
