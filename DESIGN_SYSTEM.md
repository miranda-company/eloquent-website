# Eloquent design system

The source of truth for visual values is [`src/styles/tokens.css`](src/styles/tokens.css). Shared layout and component rules live in [`src/styles/global.css`](src/styles/global.css). Page composition lives in focused stylesheets such as [`src/styles/home.css`](src/styles/home.css) and [`src/styles/landing-page-personal.css`](src/styles/landing-page-personal.css); both use the same tokens. Scroll thresholds and reveal settings live in [`src/design/interaction.ts`](src/design/interaction.ts). This is Eloquent's editorial system, guided by Material Design principles of consistent roles, readable hierarchy, clear interaction states, responsive layout, and purposeful motion. It does not depend on a component library.

## Implementation contract

This contract applies to every feature, component, element, section, and page. New work must use the existing design system and shared components before introducing new markup, CSS, behavior, or tokens. Visual similarity alone is not enough: repeated patterns must share the same semantic DOM and implementation.

### Architecture layers

| Layer            | Owns                                                                               | Location                                          |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------- |
| Tokens           | Color, type, spacing, measures, borders, elevation, motion, and shared sizes       | [src/styles/tokens.css](src/styles/tokens.css)    |
| Elements         | Container, eyebrow, buttons, text links, focus treatment, and base typography      | [src/styles/global.css](src/styles/global.css)    |
| Components       | Repeatable semantic DOM, typed inputs, interaction states, and responsive behavior | [src/components/](src/components/) and global.css |
| Page composition | Relationships unique to one approved layout                                        | A clearly named page stylesheet                   |
| Pages            | Content, metadata, structured data, and composition of shared components           | [src/pages/](src/pages/)                          |

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
- A short entry in the component inventory when introduced.

A component may expose a variant only when the variation changes meaning, hierarchy, or layout across multiple uses. A variant must not be used to bypass the type, spacing, or color system.

### Section DOM contract

Each section owns its full-width surface and vertical padding. Its first layout child is one .container, which owns horizontal gutters and maximum width. Within that container:

- Use section for a headed topic, article for standalone content, figure for meaningful media, and ul or ol for collections.
- Keep headings and reading order logical without relying on visual placement.
- Apply Grid or Flex directly to the container or semantic collection when possible.
- Add a wrapper only when it groups content or performs a real layout role.
- Keep decorative geometry in CSS or an aria-hidden SVG.
- Use the shared PageHero component for the primary hero of every standard page.

### Page contract

Every indexable page uses BaseLayout and supplies a distinct title, description, canonical URL, and appropriate social metadata. It composes SiteHeader, PageHero where applicable, reusable sections, and SiteFooter through shared implementations. Pages own their copy and structured data; shared components own recurring markup, styling, and behavior.

The optional parts of a component do not change its core contract. For example, PageHero can render breadcrumbs or an additional introduction, while its hero body always keeps the same eyebrow, H1, copy, actions, and footnote structure.

### Current component inventory

| Component or element   | Responsibility                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| BaseLayout             | Document shell, metadata, skip link, shared header and footer, reveal behavior, and back-to-top control             |
| SiteHeader             | Primary navigation, services menu, logo, and contact action                                                         |
| SiteFooter             | Shared contact, legal navigation, DCC link, and logo                                                                |
| EloquentLogo           | One accessible, reusable logo implementation                                                                        |
| PageHero               | Breadcrumbs, eyebrow, H1, lead and optional introduction, actions, footnote, responsive layout, and entrance motion |
| .container             | Shared horizontal gutters and maximum content width                                                                 |
| .eyebrow               | Section label typography                                                                                            |
| .button and .text-link | Shared action hierarchy and interaction states                                                                      |
| .section-heading       | Reusable heading and supporting-content alignment                                                                   |

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
| Shared components and responsive composition          | `components/` and `global.css`   |
| Page-specific composition                             | The page stylesheet              |

The spacing scale uses quarter-rem steps: `--space-1` is `0.25rem`, `--space-4` is `1rem`, and `--space-8` is `2rem`. Half steps handle compact controls. Use semantic fluid tokens such as `--page-gutter`, `--section-space`, and `--collection-top-space` when the value changes with the viewport.

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

The current layout breakpoints are 1100px for the service grid, 850px for the header and two-column compositions, 600px for the phone layout, and 360px for narrow-phone type. Shared responsive rules stay in the responsive layer of global.css; page-specific responsive rules stay in that page stylesheet.

## Motion and accessibility

The homepage and Landing Page Personal reveal content as it enters view. Content is present and visible in static HTML; JavaScript only adds motion. The `prefers-reduced-motion` rule removes animation and smooth scrolling. Interactive controls use the focus and touch-size tokens. Review color contrast when changing the palette; a token name does not guarantee sufficient contrast by itself.
