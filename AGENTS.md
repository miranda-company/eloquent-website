# AGENTS.md

## Scope and priorities

This file applies to the entire repository. A nested `AGENTS.md` may add more specific instructions for its directory. Explicit user instructions take precedence over this file.

Work one approved layout at a time. Preserve completed work, incorporate feedback into the active layout, and wait for explicit approval before starting the next layout in the plan. Production launch always requires separate approval.

## Project overview

Eloquent is being rebuilt from WordPress as a static Astro site in Spanish. The goals are a lean, fast, accessible, maintainable website with strong SEO and generative-search foundations.

Read these project documents before making relevant changes:

- `README.md`: current implementation status and local workflow.
- `PLAN.md`: scope, URL requirements, approval sequence, SEO, and launch requirements.
- `DESIGN_SYSTEM.md`: mandatory component, DOM, token, layout, and interaction contracts.
- `CONTENT_GUIDE.md`: Dossier article and issue authoring rules.

The archived WordPress copy, media, and URL inventory under `archive/wordpress-2026-09-16/` are source material. Treat the archive as read-only.

## Setup and commands

Use the repository root for commands. The tracked lockfile is `package-lock.json`; use npm when installing or changing dependencies.

```sh
npm install
npm run dev
```

Required approval-gate checks:

```sh
npm run check
npm run lint
npm run design:check
npm run format
npm run build
```

`npm run format` checks formatting; use `npm exec -- prettier --write <files>` to format edited files. The production output is generated in `dist/` and is not committed.

## Architecture and code style

- Use Astro, strict TypeScript, plain CSS, and static HTML for primary content and links.
- Reuse or extend shared components before adding page-specific markup. Keep component APIs small and typed.
- Keep semantic DOM and reading order stable. Use `section`, `article`, `figure`, headings, and lists according to their meaning.
- Use `src/styles/tokens.css` for shared visual values. Shared component rules belong in `src/styles/global.css`; page stylesheets only own page-specific composition.
- Do not add raw colors, spacing, font sizes, radii, shadows, or motion durations to component CSS. Run `npm run design:check` after CSS changes.
- Use the shared `.container`, spacing scale, typography, surface roles, interaction states, and responsive breakpoints documented in `DESIGN_SYSTEM.md`.
- Prefer focused components and direct names. Add comments only for non-obvious intent.
- Let Prettier and ESLint define syntax details. Do not introduce another formatter, CSS framework, component library, or client framework without an approved requirement.
- Use Astro image components for local content images, responsive sources, dimensions, and lazy loading. Reserve eager loading for the primary above-the-fold image.

## Content, URLs, and metadata

- Preserve existing public URL slugs and trailing slashes. Keep one canonical URL for reused content.
- Do not invent claims, credentials, results, quotations, citations, authors, or publication dates.
- Keep the original publication material in the archive even when approved page copy is shortened.
- Author Dossier issues and articles as individual `.md` files. Use `.mdx` only when reusable visual components are required.
- Keep page titles, descriptions, canonical URLs, social metadata, visible headings, and structured data consistent.
- Add `BreadcrumbList` structured data only when breadcrumbs are visible. Add factual schema only when supported by the rendered content.
- Use descriptive links and accurate alternative text. Avoid generic link labels when the destination can be named.

## Accessibility and interaction

- All controls must work with a keyboard and have visible focus states and accessible names.
- Preserve logical heading order, useful landmarks, sufficient contrast, touch targets, and readable line lengths.
- Respect `prefers-reduced-motion`. Primary content must remain readable and navigable without JavaScript.
- For the image lightbox, preserve the normal full-image link fallback. Verify click and keyboard opening, the close control, Escape and backdrop closing, focus restoration, captions, alternative text, and responsive sizing.
- Test desktop and mobile widths after layout or shared-component changes. Check for horizontal overflow and review every page affected by a shared change.

## SEO, privacy, and deployment

- Keep canonical content and internal links in static HTML. Maintain sitemap and crawler rules described in `PLAN.md`.
- Do not add analytics, visitor tracking, reCAPTCHA, newsletter forms, or contact forms.
- Contact actions use `mailto:info@eloquent.es` until an approved booking URL exists.
- Staging uses `PUBLIC_STAGING=true` and must also be password protected at the server.
- Do not deploy or launch production without explicit user approval. Do not promise rankings or AI citations.

## Git and generated files

- Keep commits focused and use concise imperative commit messages consistent with the existing history.
- Do not commit, push, deploy, or create a pull request unless the user requests it.
- Do not edit or commit generated `dist/`, `.astro/`, `node_modules/`, logs, or operating-system files.
- Update `README.md`, `PLAN.md`, `DESIGN_SYSTEM.md`, or `CONTENT_GUIDE.md` when a change affects their contracts or current-status statements.
- Update review screenshots only when a visual layout change makes the existing captures stale.
