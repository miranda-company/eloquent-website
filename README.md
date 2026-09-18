# Eloquent Website 3.0

Static Astro redesign of [eloquent.es](https://eloquent.es). Work proceeds one approved layout at a time; see [PLAN.md](PLAN.md).

## Current status

The WordPress copy, media, and URL inventory are archived in `archive/wordpress-2026-09-16/`. The shared shell and homepage are ready for the first review. Dossier, work, case study, and legal layouts are intentionally waiting for their respective approval stages. Links to those unfinished pages currently lead to the published site.

## Run locally

```sh
npm install
npm run dev
```

Open the localhost URL printed by Astro. Build a production-sized static site with `npm run build`; the output is `dist/`.

Before each approval gate, run:

```sh
npm run check
npm run lint
npm run design:check
npm run format
npm run build
```

The visual rules and how to extend them are in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

To build a temporary public staging copy, set `PUBLIC_STAGING=true` before `npm run build`; this adds a `noindex, nofollow` meta tag. Staging must also be password protected at the web server. The production build omits that variable.

## Content

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for the issue and article frontmatter. The original publication text is in the archive's `text/` folder, with unchanged REST and HTML copies alongside it.
