## Why

The Layer currently mixes Tailwind's default shadow utilities across components, so its visual elevation has no stable, consumer-overridable contract. A small neutral elevation scale is needed before more shared components introduce additional one-off shadow values.

## What Changes

- Add a six-step custom elevation scale that exposes `shadow-1` through `shadow-6`; retain Tailwind's built-in `shadow-none` instead of defining a duplicate zero token.
- Organize CSS tokens so Tailwind-facing aliases, category-specific semantic values, and the stylesheet entry point have clear ownership as more token categories are added.
- Define light and dark neutral shadow values based on the approved geometry and opacity references; do not retain the source project's blue-tinted, brand-specific shadow colors.
- Register the custom shadow scale with `tailwind-merge` so consumer classes correctly replace Layer defaults when public components call `cn()`.
- Migrate existing shared Card and Block shadow usages to the new custom scale and document the scale's physical geometry.

## Capabilities

### New Capabilities

- `theme-elevation-tokens`: Provide a documented, theme-aware elevation token scale that generates compatible Tailwind shadow utilities for Layer components and consumers.

### Modified Capabilities

- None.

## Impact

- Affects `app/assets/css/main.css`, new files under `app/assets/css/tokens/`, and the `cn()` helper in `app/lib/utils.ts`.
- Updates existing Card and Block class usage and any related stories or documentation needed to demonstrate the contract.
- No dependency, runtime API, consumer configuration, or brand token is added.
