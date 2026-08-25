## Context

See `proposal.md` for motivation. This repository has no application or dependency configuration yet. It must become a reusable Nuxt Layer while remaining easy for future landing-page repositories to consume and override.

## Goals / Non-Goals

**Goals:**

- Deliver a public, tag-pinned Remote Git Layer with an explicit runtime/developer-tooling boundary.
- Establish a CSS-first semantic token system and accessible component foundation before adding the core component set.
- Make local development, formatting, preview, and static Storybook deployment repeatable.

**Non-Goals:**

- Publishing an npm package or creating `landify-tooling` and `landify-template` during Sprint 1.
- Building complete component documentation, automated component tests, visual regression testing, or a CI quality gate for accessibility.
- Adding business-specific landing pages, backend services, analytics, or brand assets.

## Decisions

### Public Remote Git Layer is the Sprint 1 distribution model

Consumers will extend `github:landify-organization/landify-base#vX.Y.Z` with `install: true`. Tags are immutable release boundaries; branches are not supported as consumer pins.

This avoids npm publication and consumer package-install steps while preserving explicit, per-consumer upgrades. An npm package is deferred because distribution simplicity is the current priority. A public repository avoids authentication configuration; secrets and restricted assets are prohibited from the repository.

### Runtime and developer tooling use separate distribution paths

The Layer will own Nuxt runtime configuration, CSS, components, composables, layouts, utilities, and dependencies imported by those files. ESLint, Prettier, Tailwind class sorting, editor settings, and Storybook remain local development tooling.

Nuxt's remote Layer mechanism cannot make tooling dependencies available to a consumer's formatter or linter. `landify-template` will initially provide a snapshot of consumer tooling; `landify-tooling` will later centralize the proven configuration. Consumers will retain minimal local wrappers where their file paths differ, especially the Tailwind v4 stylesheet path used by Prettier.

### Tailwind v4 uses CSS-first semantic tokens

Tailwind CSS v4 will be integrated through its Vite plugin. Primitive values and semantic aliases will be separated in CSS. `@theme` creates utility-backed tokens; standard CSS variables hold values that do not need utilities. Shared components consume semantic tokens, allowing consumer themes to override appearance without source forks.

The supported-browser baseline is Safari 16.4+, Chrome 111+, and Firefox 128+, matching Tailwind v4's browser requirements.

### Reka UI is wrapped, not exposed as Landify's public component API

Reka UI provides accessible low-level behavior. Landify will build and document `Ui*` components above it. This prevents consumer code from becoming coupled to a third-party primitive structure and keeps Landify's public API controlled.

### Storybook is preview-only in Sprint 1

Storybook will render the same token CSS as the Layer and include manual a11y feedback with `@storybook/addon-a11y`. Its a11y setting will report findings in the UI but will not make static Storybook builds fail. Storybook is local development tooling and will not be included in the Layer's runtime configuration consumed by applications.

Vercel will host `storybook-static` as a public static site using the `build-storybook` command, consistent with the public repository decision.

### Testing is deliberately deferred, with an architectural escape hatch

Sprint 1 will not install a unit-test runner. Utilities and composables will remain isolated and component APIs typed so that Vitest and Nuxt test utilities can be introduced in Sprint 4 without redesigning the Layer. Sprint 4 will test the stable public API, prioritizing `cn()`, `UiButton`, `UiInput`, `UiDialog`, and logic-heavy composables.

## Risks / Trade-offs

- [Remote Git dependency resolution is slower and less lockfile-visible than a package dependency] → pin immutable tags, retain a consumer fixture in Sprint 4, and reconsider package distribution only if this becomes operationally costly.
- [A public Layer exposes its entire Git history] → never commit secrets, customer data, restricted assets, or proprietary brand behavior; review public visibility before each release.
- [Template configuration is a snapshot] → document the ownership boundary and introduce shared tooling only after the Base configuration has proven stable.
- [Manual a11y review can miss regressions] → retain the addon panel now and add automated tests and a release gate in Sprint 4.
- [Tailwind v4 excludes older browsers] → establish and document the supported-browser baseline before component implementation.

## Migration Plan

1. Create the Layer and local tooling baseline in the public repository.
2. Validate it through local development, static Storybook build, and a minimal consumer fixture in Sprint 4.
3. Tag the first stable release as `v1.0.0`.
4. Configure consumers to extend the release tag with `install: true`.
5. Roll back a consumer by restoring its previously pinned tag; do not retag published releases.
