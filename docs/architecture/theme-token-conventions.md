# Theme Token Conventions

## Source of truth and flow

```text
Category token CSS
  → app/assets/css/tokens/theme.css
  → Tailwind utility classes
  → Layer components and consumer templates
```

`app/assets/css/main.css` is the stylesheet entry point. Token values belong in a category file under `app/assets/css/tokens/`; Tailwind-facing aliases belong in `theme.css`.

## Elevation tokens

Tailwind provides `shadow-none`; do not add a duplicate zero token. Landify provides `shadow-1` through `shadow-6` as a neutral, ascending elevation scale.

| Utility    | Geometry reference     | Intended strength  |
| ---------- | ---------------------- | ------------------ |
| `shadow-1` | y 2px, blur 4px, 5%    | subtle surface     |
| `shadow-2` | y 4px, blur 10px, 10%  | low elevation      |
| `shadow-3` | y 4px, blur 10px, 7%   | low soft elevation |
| `shadow-4` | y 8px, blur 20px, 16%  | medium elevation   |
| `shadow-5` | y 8px, blur 24px, 15%  | strong elevation   |
| `shadow-6` | y 12px, blur 28px, 20% | highest elevation  |

The values in `shadows.css` have separate `.dark` overrides. Use ordinary Tailwind variants, for example `hover:shadow-2`.

## Adding a token category

1. Add or update the category value file in `app/assets/css/tokens/`.
2. Map values to Tailwind utilities in `tokens/theme.css` using a distinct variable name to avoid self-reference.
3. Import the category file from `main.css`.
4. If the utility conflicts with a Tailwind class family used through `cn()`, register its keys in the `extendTailwindMerge` configuration in `app/lib/utils.ts`.
5. Document the public utility contract and verify the generated utility and merge precedence.
