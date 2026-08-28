## Context

See proposal.md for motivation. `main.css` currently contains the Tailwind entry point, all semantic color and radius definitions, and Tailwind theme aliases in one file. Shared components also use a mixture of Tailwind's default shadow utilities, while `cn()` delegates conflicts to `tailwind-merge`, which does not discover CSS-defined custom token scales automatically.

## Goals / Non-Goals

**Goals:**

- Establish a stable, neutral six-step elevation API: `shadow-1` through `shadow-6`.
- Preserve consumer CSS override capability for both light and dark themes.
- Create an asset layout that lets colors, radii, shadows, and future categories grow without reworking the public utility contract.
- Preserve `cn()` override semantics for built-in and custom shadow utilities.

**Non-Goals:**

- Introduce component-specific or brand-specific shadow tokens.
- Remove Tailwind's built-in shadow utilities from consumer use.
- Add a TypeScript token object, a JavaScript Tailwind preset, or a new runtime dependency.

## Decisions

### A continuous scale is the public API

`shadow-1` through `shadow-6` replace the source convention's irregular `2`, `4`, `6`, `8`, `8.5`, and `12` keys. They are easier to extend, avoid a decimal utility name, and do not imply an inaccurate measurement. `shadow-none` remains Tailwind-owned because Tailwind v4 already supplies it.

Each level retains the source scale's geometry and opacity reference in increasing order. Comments express the actual y-offset, blur, and opacity in pixels for design review. The source's blue-tinted values are converted to neutral `oklch(0 0 0 / <alpha>)`, consistent with Base's neutral, non-brand contract.

Alternative considered: retain source numeric keys. Rejected because `6` does not match its current geometry/comment, `8.5` adds avoidable friction, and values would become a misleading public API.

### Separate semantic values from Tailwind aliases

`app/assets/css/main.css` remains the composition entry point. It will import category files under `app/assets/css/tokens/`:

```text
tokens/
  colors.css     # :root and .dark color values
  radius.css     # :root radius value
  shadows.css    # :root and .dark --elevation-* values
  theme.css      # @theme inline aliases consumed by Tailwind
```

`shadows.css` owns `--elevation-1` through `--elevation-6`; `theme.css` maps these into `--shadow-1` through `--shadow-6`. The distinct names avoid custom-property self-references. Existing color and radius token definitions move into their category files as part of this refactor, preserving their current utility names and values.

Alternative considered: keep all tokens in `main.css`. Rejected because the file is already both a Tailwind entry point and token source, and every new category would add unrelated implementation detail to it.

### Register the scale with tailwind-merge

`cn()` will use an `extendTailwindMerge` instance configured with all six custom shadow keys. This lets a public component's default shadow be replaced by either another custom shadow or a built-in shadow supplied through its `class` prop.

Alternative considered: leave `twMerge` unchanged. Rejected because it preserves conflicting custom and default shadow classes, making consumer override behavior order-dependent in CSS rather than deterministic in the rendered class list.

### Migrate Layer-owned usage to the scale

Existing Layer Card and Block components will use the new numbered utilities instead of Tailwind default shadow utilities. The chosen level follows their current relative prominence: base surfaces use the low level, hover surfaces increase one level, and the card wrapper's stronger default maps to the highest level. Existing class merge and Storybook conventions remain unchanged.

## Risks / Trade-offs

- [Numbered levels require maintainers to consult documentation] → keep a concise scale table and pixel comments alongside the values.
- [Dark shadows can appear too heavy on dark surfaces] → provide separate dark values and verify the affected stories visually in both themes.
- [A future key is omitted from tailwind-merge] → document that adding an elevation level requires updating the CSS alias and merge configuration together.
- [Token file imports change stylesheet ordering] → retain one entry point and run Nuxt and Storybook builds after the refactor.

## Migration Plan

1. Add token category files and preserve existing color/radius output through imports from `main.css`.
2. Define and expose the six elevation levels; configure `cn()` to merge them.
3. Replace Layer-owned default shadow classes with the matching custom level.
4. Validate generated classes, merge precedence, formatting, type checking, and Storybook build; review affected stories in light and dark modes.
5. Roll back by restoring the single stylesheet and prior built-in utility classes; the change adds no stored data or consumer migration.
