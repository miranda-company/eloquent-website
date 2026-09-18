# Eloquent design system

The source of truth for visual values is [`src/styles/tokens.css`](src/styles/tokens.css). Layout and component rules in [`src/styles/global.css`](src/styles/global.css) use those tokens. Scroll thresholds and reveal settings live in [`src/design/interaction.ts`](src/design/interaction.ts). This is Eloquent's editorial system, guided by Material Design principles of consistent roles, readable hierarchy, clear interaction states, responsive layout, and purposeful motion. It does not depend on a component library.

## Where to change things

| Change                                                   | Edit                             |
| -------------------------------------------------------- | -------------------------------- |
| Palette, contrast, hover or focus color                  | `tokens.css` color roles         |
| Type scale, fonts, weights, line height or tracking      | `tokens.css` typography          |
| Gaps, gutters, section rhythm or card padding            | `tokens.css` spacing             |
| Container width, controls, cards or text line lengths    | `tokens.css` sizes and measures  |
| Borders, corners, shadows or stacking                    | `tokens.css` edges and elevation |
| Animation distance, duration or easing                   | `tokens.css` motion              |
| Scroll thresholds and reveal trigger                     | `interaction.ts`                 |
| Grid structure, flex alignment or responsive composition | `global.css`                     |

The spacing scale uses quarter-rem steps: `--space-1` is `0.25rem`, `--space-4` is `1rem`, and `--space-8` is `2rem`. Half steps handle compact controls. Use semantic fluid tokens such as `--page-gutter`, `--section-space`, and `--collection-top-space` when the value changes with the viewport.

Color names describe roles. `--color-ink` is primary text and dark surfaces; `--color-paper` is the warm page background; `--color-surface` is the light card surface; `--color-accent` marks actions and editorial emphasis. On dark surfaces, use the `--color-on-dark-*` roles. Hover, focus, and border colors have their own roles so they can change without editing components.

Text uses `--text-*` sizes, `--leading-*` line heights, and `--tracking-*` letter spacing. The `--measure-*` tokens limit line lengths. Use `--container-width` for grids and visual sections; `--prose-width` is reserved for sustained reading in later layouts.

## Adding a component or layout

1. Reuse an existing token before adding a new one.
2. If a new value is needed, name it for its role in `tokens.css`, then reference it with `var(...)` in the component rule.
3. Keep structural CSS beside the component: Grid and Flex relationships, placement, and state selectors remain in `global.css`.
4. Check focus, hover, mobile layout, reduced motion, and reading without JavaScript.
5. Run `npm run design:check` with the usual type, lint, format, and build checks.

Do not put raw colors, lengths, font sizes, radii, shadows, or animation durations in component rules. The design check enforces this for `src/styles/*.css`. Breakpoint numbers remain in `@media` rules because CSS custom properties cannot be used in media-query conditions. Numeric grid fractions, column counts, percentages, and zero are structural CSS and may stay with the layout.

The current layout breakpoints are 1100px (service grid), 850px (header and two-column compositions), 600px (phone layout), and 360px (narrow phone type). Keep future responsive rules in the responsive layer of `global.css` until there are enough layouts to justify a separate responsive file.

## Motion and accessibility

The homepage reveals content as it enters view. Content is present and visible in static HTML; JavaScript only adds motion. The `prefers-reduced-motion` rule removes animation and smooth scrolling. Interactive controls use the focus and touch-size tokens. Review color contrast when changing the palette; a token name does not guarantee sufficient contrast by itself.
