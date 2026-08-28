## 1. Token foundation

- [x] 1.1 Split existing color, radius, and Tailwind alias definitions from the stylesheet entry point into the documented token category files without changing their public utilities.
- [x] 1.2 Define neutral light- and dark-theme `--elevation-1` through `--elevation-6` values with pixel-equivalent geometry comments, and expose `shadow-1` through `shadow-6` through the Tailwind token mapping.

## 2. Override and component migration

- [x] 2.1 Extend the shared class-merging configuration so custom and built-in shadow utilities conflict correctly.
- [x] 2.2 Replace Layer-owned Card and Block default shadow utilities with the approved numbered elevation scale.
- [x] 2.3 Document the numbered scale, `shadow-none` ownership, and the required CSS/merge configuration updates for future levels.

## 3. Verification

- [x] 3.1 Verify generated custom utilities, variant support, and `cn()` precedence for every elevation level.
- [ ] 3.2 Run formatting, linting, type checking, Nuxt build, and Storybook build; inspect the affected stories in light and dark themes at 320px, 768px, and 1280px.
