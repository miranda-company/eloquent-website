# Eloquent design system

The source of truth for visual values is [`src/styles/tokens.css`](../../src/styles/tokens.css). Shared layout and component rules live in [`src/styles/global.css`](../../src/styles/global.css). Page composition lives in focused stylesheets such as [`src/styles/home.css`](../../src/styles/home.css), [`src/styles/strategic-service.css`](../../src/styles/strategic-service.css), [`src/styles/landing-page-personal.css`](../../src/styles/landing-page-personal.css), and [`src/styles/case-study.css`](../../src/styles/case-study.css); all use the same tokens. Scroll thresholds and reveal settings live in [`src/design/interaction.ts`](../../src/design/interaction.ts). The visual direction is defined below; interaction behavior also follows Material Design principles of consistent roles, readable hierarchy, clear states, responsive layout, and purposeful motion. The system does not depend on a component library.

## Visual direction

Eloquent follows **Modern Corporate Minimalism**, shaped by the **Swiss Design tradition (International Typographic Style)** and **Geometric Abstraction**. The visual language should communicate technology, precision, clarity, and data-informed intelligence while remaining human, editorial, and credible.

### Core principles

- **Structure before decoration.** Layout begins with a clear grid, deliberate alignment, stable proportions, and a visible hierarchy. Every element needs a communication or interaction role.
- **Typography carries the identity.** Sans-serif typography provides clarity and precision. The editorial serif supplies emphasis, judgment, and a human counterpoint. Large headings, concise labels, and controlled line lengths create the hierarchy.
- **Asymmetry remains ordered.** Compositions may use uneven columns, offset content, or open space, but their relationships remain anchored to the shared grid and spacing scale.
- **Geometric abstraction explains systems.** Lines, fields, vectors, grids, and other non-representational forms may express connection, direction, complexity, or change. They should feel structural and purposeful rather than ornamental.
- **Color is restrained and functional.** Dark ink, warm light surfaces, muted green-gray roles, and the lime accent come only from the design tokens. The accent marks emphasis, interaction, and moments of intelligence; it is not a general background decoration.
- **Motion reveals relationships.** Animation should respond to interaction, clarify hierarchy, or show how a system behaves. It must remain subtle, efficient, and compatible with reduced-motion preferences.
- **Precision does not mean sterility.** Editorial typography, considered language, and warm neutral surfaces keep the system approachable without weakening its rigor.

### Geometric motion scope

`HeroVectorField` is the first expression of this motion language. It translates the grid into a pointer-reactive field using `--color-ink` and `--color-accent`, while preserving the hero's semantic content and actions. It redraws only after interaction or resizing and becomes static when reduced motion is requested.

The vector field is currently approved **only for the homepage hero**. Service heroes continue to use the standard `PageHero` surface without a canvas. Future service animations may use related geometric ideas, but each one requires explicit approval and must reuse design tokens, preserve text readability, respect reduced motion, and avoid duplicating the homepage treatment without a meaningful reason.

### Visual guardrails

Avoid generic technology aesthetics such as decorative gradients, glass effects, glowing interfaces, arbitrary three-dimensional objects, dense dashboard styling, or motion without an explanatory role. Do not add geometric elements merely to fill space. The result should remain minimal, legible, and recognizably Eloquent.

## Implementation contract

This contract applies to every feature, component, element, section, and page. New work must use the existing design system and shared components before introducing new markup, CSS, behavior, or tokens. Visual similarity alone is not enough: repeated patterns must share the same semantic DOM and implementation.

### Architecture layers

| Layer            | Owns                                                                               | Location                                                |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Tokens           | Color, type, spacing, measures, borders, elevation, motion, and shared sizes       | [src/styles/tokens.css](../../src/styles/tokens.css)    |
| Elements         | Container, eyebrow, buttons, text links, focus treatment, and base typography      | [src/styles/global.css](../../src/styles/global.css)    |
| Components       | Repeatable semantic DOM, typed inputs, interaction states, and responsive behavior | [src/components/](../../src/components/) and global.css |
| Page composition | Relationships unique to one approved layout                                        | A clearly named page stylesheet                         |
| Pages            | Content, metadata, structured data, and composition of shared components           | [src/pages/](../../src/pages/)                          |

Dependencies point upward in this table: pages use components, components use elements and tokens, and page styles never reach into a shared component to redefine its internal typography or spacing.

### Reuse rules

1. Search the component inventory and global element classes before writing markup or CSS.
2. Reuse an existing component when its meaning and structure match. Supply differences through typed props, content data, or named slots.
3. Extend a component API when a recurring, meaningful variation is needed. Keep variant names semantic and define their DOM and CSS centrally.
4. Extract a pattern into src/components when it appears on a second page, or immediately when upcoming approved layouts are known to need it.
5. Do not copy a component's markup or styles into a page. Do not create page-specific font sizes, colors, spacing, controls, cards, or interaction behavior.
6. A one-off page composition may stay local only when it has a genuinely unique structure. It must still use tokens, shared elements, and established section rules.
7. If a shared change affects an approved page, review that page again at desktop and mobile widths.

### Component contract

Every shared component must provide:

- Semantic HTML and a stable, minimal DOM structure.
- Typed Astro or TypeScript inputs. Use props for data and named slots for structured content.
- One clear styling owner in global.css. Page stylesheets may position a component as a whole but may not style its internal selectors.
- Keyboard, focus, hover, active, disabled, and open states where those states apply.
- Responsive behavior using the shared breakpoints and design tokens.
- Reduced-motion behavior and readable content without JavaScript.
- Accessible names, heading order, landmarks, alternative text, and ARIA only where native HTML is insufficient.
- Static primary content and links for SEO and generative search.
- Explicit whitespace around inline Astro elements. When prose and an inline link are split across
  lines, render `{' '}` at the boundary instead of relying on source indentation.
- A short entry in the component inventory when introduced.

A component may expose a variant only when the variation changes meaning, hierarchy, or layout across multiple uses. A variant must not be used to bypass the type, spacing, or color system.

### Section DOM contract

Each section owns its full-width surface and vertical padding. Its first layout child is one .container, which owns horizontal gutters and maximum width. Within that container:

- Use `section` for a named topic, `article` for standalone content, `figure` for meaningful media, and `ul` or `ol` for collections. Prefer a visible section heading; when an approved layout intentionally omits it, supply an accurate accessible label.
- Keep headings and reading order logical without relying on visual placement.
- Apply Grid or Flex directly to the container or semantic collection when possible.
- Add a wrapper only when it groups content or performs a real layout role.
- Keep decorative geometry in CSS, an `aria-hidden` SVG, or an approved `aria-hidden` canvas component.
- Use the shared PageHero component for standard pages and CaseStudyHero for case studies.

### Page contract

Every indexable page uses BaseLayout and supplies a distinct title, description, canonical URL, and appropriate social metadata. It composes SiteHeader, the hero component assigned to its page type, reusable sections, and SiteFooter through shared implementations. BaseLayout also owns the single shared image-lightbox dialog. Pages own their copy and structured data; shared components own recurring markup, styling, and behavior.

The optional parts of a component do not change its core contract. `PageHero` always renders its eyebrow and H1. It renders the decorative background, copy container, breadcrumbs, actions, and footnote only when the page supplies that content, avoiding empty DOM elements.

The [page layout contracts](page-layouts.md) document defines the complete page-level contract for the homepage, service detail, Work index, Case Study, Dossier landing, Dossier issue, article archive, Dossier article, and legal pages. It is the source of truth for semantic section order, hero assignment, collection layout, responsive behavior, and page-style ownership. Update it together with any structural implementation change.

### Work index contract

- `src/data/projects.ts` is the shared source for project titles, summaries, destinations, classifications, images, and alternative text used by the homepage and Work index.
- `ProjectCard` owns each preview's semantic DOM, optimized responsive image, descriptive link, and internal styling in `global.css`.
- `work-index.css` owns only the Work page surface and responsive three-, two-, and one-column grid composition.
- The collection currently has no visible section heading or count. Its section uses an accessible label, and the project cards supply the collection's visible hierarchy.

### Dossier contract

- `src/content/issues/` is the source for issue titles, numbers, summaries, introductions, and ordered article references.
- `src/content/articles/` stores each canonical article once. An issue reuses an article by reference; it never copies the article body.
- Astro content collection references validate every issue-to-article relationship during type checking and builds.
- `ArticlePreview` owns one article link's semantic DOM, publication metadata, title, summary, and internal styling in `global.css`. Its compact variant supports constrained editorial lists; its archive variant lets titles and summaries use the full row width; its media variant lets text use the full card column and supports issue collections with optimized images in a responsive three-, two-, and one-column grid.
- `DossierIssueHero` owns the issue navigation, exploration number, H1, Markdown introduction, article count, and responsive behavior.
- `DossierArticleHero` owns the article H1, summary, author, publication and update dates, derived issue links, full-width optimized feature image, and responsive behavior.
- The dynamic article route renders every canonical Markdown body inside one restrained prose template and publishes matching `Article` structured data.
- `dossier-index.css`, `dossier-issue.css`, `dossier-archive.css`, and `dossier-article.css` own only their respective page compositions.
- The article archive sorts canonical articles by original publication date, newest first, and reuses the compact `ArticlePreview` variant.
- Issue, archive, and article previews link to local canonical routes.

### Case Study contract

- `CaseStudyHero` owns the full-width project image, readable overlay, H1, lead, and compact metadata strip.
- `EditorialSection` uses the shared section heading and accepts prose-width content, wide content, or an optional evidence rail. Its semantic reading order remains heading, narrative, then evidence when the responsive layout becomes one column.
- `MediaGallery` owns the semantic list and optimized responsive thumbnails. Pages provide image data and layout intent (`single`, `duo`, or `triptych`).
- Case Study-specific narrative patterns such as facts, findings, phases, and results live in `case-study.css` and use shared tokens. They do not redefine shared component internals.
- Verified qualitative findings may use structured cards. Numerical outcomes are shown only when the source material supports them.

### Image enlargement contract

- Use `LightboxImage` for Case Study evidence and gallery images. It renders an optimized responsive thumbnail inside a normal link to the original asset.
- `ImageLightbox` is rendered once by `BaseLayout`. JavaScript enhances a lightbox link with the native `dialog` element and loads the full image only when opened.
- Click and keyboard activation open the dialog. The close control, Escape key, and backdrop close it; native dialog behavior restores focus to the trigger.
- The trigger supplies accurate alternative text and a useful caption. When JavaScript or `dialog.showModal()` is unavailable, the normal full-image link remains usable.
- Hover, focus, and touch treatments communicate that the image can be enlarged. Motion and colors use shared tokens.

### Current component inventory

| Component or element   | Responsibility                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| BaseLayout             | Document shell, metadata, consent defaults, shared chrome, lightbox dialog, reveal behavior, and back-to-top control                       |
| SiteHeader             | Primary navigation, services menu, logo, and contact action                                                                                |
| SiteFooter             | Shared contact, legal navigation, analytics preference control, DCC link, and logo                                                         |
| EloquentLogo           | One accessible, reusable logo implementation                                                                                               |
| PageHero               | Breadcrumbs, eyebrow, H1, optional decorative background, lead and introduction, actions, footnote, responsive layout, and entrance motion |
| HeroVectorField        | Decorative, pointer-reactive canvas field using design tokens, resize-aware rendering, and a static reduced-motion state                   |
| StrategicServicePage   | Shared data-driven DOM, metadata, editorial sections, optional scope boundaries, and responsive layout for strategic services              |
| CaseStudyHero          | Full-width project image, overlaid case-study title and lead, and project metadata strip                                                   |
| EditorialSection       | Shared heading, prose or wide content, optional evidence rail, surface roles, and responsive behavior                                      |
| MediaGallery           | Semantic single, paired, or triptych collections composed from optimized, lightbox-enabled images                                          |
| ProjectCard            | One project preview with optimized media, sector, title, summary, and a descriptive destination link                                       |
| CollectionHeading      | Shared eyebrow, H2, supporting copy, two-column alignment, and responsive stacking for editorial collections                               |
| ArticlePreview         | Compact or media-rich Dossier article link with sequence, publication date, title, summary, and destination                                |
| DossierIssueHero       | Shared issue navigation, exploration metadata, title, Markdown introduction, article count, and responsive layout                          |
| DossierArticleHero     | Shared article title, summary, publication metadata, issue relationships, and optimized feature image                                      |
| LegalPageLayout        | Shared legal hero, optional status summary, contents navigation, article slot, and responsive composition                                  |
| LightboxImage          | Progressive image-enlargement trigger with a normal full-image link fallback                                                               |
| ImageLightbox          | Shared native dialog, enlarged image, caption, close behavior, and keyboard handling                                                       |
| ConsentBanner          | Explicit analytics choice, persistent preference, policy link, and consent-change event                                                    |
| .container             | Shared horizontal gutters and maximum content width                                                                                        |
| .eyebrow               | Section label typography                                                                                                                   |
| .button and .text-link | Shared action hierarchy and interaction states                                                                                             |
| .section-heading       | Reusable heading and supporting-content alignment                                                                                          |

## Where to change things

| Change                                                | Edit                             |
| ----------------------------------------------------- | -------------------------------- |
| Palette, contrast, hover or focus color               | `tokens.css` color roles         |
| Type scale, fonts, weights, line height or tracking   | `tokens.css` typography          |
| Gaps, gutters, section rhythm or card padding         | `tokens.css` spacing             |
| Container width, controls, cards or text line lengths | `tokens.css` sizes and measures  |
| Borders, corners, shadows or stacking                 | `tokens.css` edges and elevation |
| Animation distance, duration or easing                | `tokens.css` motion              |
| Scroll thresholds and reveal trigger                  | `interaction.ts`                 |
| Shared components, lightbox behavior, and composition | `components/` and `global.css`   |
| Page-specific composition                             | The page stylesheet              |

The spacing scale uses quarter-rem steps: `--space-1` is `0.25rem`, `--space-4` is `1rem`, and `--space-8` is `2rem`. Half steps handle compact controls. Use semantic fluid tokens when the value changes with the viewport: `--section-space` supplies standard section rhythm, `--section-space-compact` supplies tighter collection rhythm, `--collection-top-space` separates collection content, and `--page-gutter` controls responsive page edges.

Color names describe roles. `--color-ink` is primary text and dark surfaces; `--color-paper` is the warm page background; `--color-surface` is the light card surface; `--color-accent` marks actions and editorial emphasis. On dark surfaces, use the `--color-on-dark-*` roles. Hover, focus, and border colors have their own roles so they can change without editing components.

Text uses `--text-*` sizes, `--leading-*` line heights, and `--tracking-*` letter spacing. The `--measure-*` tokens limit line lengths. `--container-width` is `85rem`, equivalent to 1360px at the default 16px root size, and supplies the maximum width for grids and visual sections. Responsive `--page-gutter` values keep space at the viewport edges. Use `--prose-width` (`70ch`) for sustained reading.

## Building or changing a component

1. Identify the semantic pattern and check the component inventory.
2. Reuse or extend an existing component before creating another one.
3. Reuse an existing token. If a new role is necessary, add one clearly named token and document why it is shared.
4. Keep the component API small and typed. Prefer content data and slots over page-specific selectors.
5. Put shared structure, states, and responsive rules in global.css. Keep only unique page composition in the page stylesheet.
6. Review every existing use after changing the component.
7. Check semantic DOM, keyboard and focus behavior, desktop and mobile layout, reduced motion, no-JavaScript reading, metadata, and links.
8. Run npm run check, npm run lint, npm run design:check, npm run format, and npm run build.

Do not put raw colors, lengths, font sizes, radii, shadows, or animation durations in component rules. The design check enforces this for src/styles/*.css. Breakpoint numbers remain in media rules because CSS custom properties cannot be used in media-query conditions. Numeric grid fractions, column counts, percentages, and zero are structural CSS and may stay with the layout.

The current layout breakpoints are 1100px for service and Case Study content grids, 850px for the header and two-column compositions, 600px for the phone layout, and 360px for narrow-phone type. Shared responsive rules stay in the responsive layer of global.css; page-specific responsive rules stay in that page stylesheet.

## Motion and accessibility

The shared `ConsentBanner` is the single consent interface. It uses the color, spacing, control, focus, elevation, and stacking tokens; pages do not restyle or duplicate it. It appears only when no preference exists or when the footer control reopens it. Analytics and advertising are independent choices, accept and reject have equal prominence, keyboard focus moves into the reopened interface, and all optional processing remains off without JavaScript.

Pages use the shared reveal behavior for content entering the viewport. Content is present and visible in static HTML; JavaScript only adds motion. The `prefers-reduced-motion` rule removes animation and smooth scrolling. Interactive controls use the focus and touch-size tokens. The image lightbox uses a native dialog, preserves a full-image link fallback, supports Escape and backdrop closing, and restores focus after closing. Review color contrast when changing the palette; a token name does not guarantee sufficient contrast by itself.
