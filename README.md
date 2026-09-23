# Eloquent website

Static Astro redesign of [eloquent.es](https://eloquent.es). Work proceeds one approved layout at a time; see [PLAN.md](PLAN.md).

## Current status

The WordPress copy, media, and URL inventory are archived in `archive/wordpress-2026-09-16/`. The shared shell and homepage are ready for review. The Landing Page Personal service page is available at `/servicios/landing-page-personal/`; it includes three unlinked example placeholders awaiting final projects and images. Dossier, work, case study, and legal layouts are intentionally waiting for their respective approval stages. Links to those unfinished pages currently lead to the published site.

## Run locally

```sh
npm install
npm run dev
```

Open the localhost URL printed by Astro. The repository tracks `package-lock.json`; pnpm can also run the same scripts. Build a production-sized static site with `npm run build`; the output is `dist/`.

Before each approval gate, run:

```sh
npm run check
npm run lint
npm run design:check
npm run format
npm run build
```

## Architecture contract

[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) defines the mandatory implementation contract for every feature, component, element, section, and page. Reuse or extend shared components before adding markup or CSS. Shared components live in `src/components/`, own their semantic DOM and internal styling, and consume values from `src/styles/tokens.css`. Page stylesheets may compose components but must not redefine their internals.

The homepage and service-page heroes both use `PageHero.astro`; this pattern applies to every repeated section introduced in later layouts.

To build a temporary public staging copy, set `PUBLIC_STAGING=true` before `npm run build`; this adds a `noindex, nofollow` meta tag. Staging must also be password protected at the web server. The production build omits that variable.

## Content

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for the issue and article frontmatter. The original publication text is in the archive's `text/` folder, with unchanged REST and HTML copies alongside it.
