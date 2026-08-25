## Context

See `proposal.md` for motivation. This repository has no application or dependency configuration yet. It must become a reusable Nuxt Layer while remaining easy for future landing-page repositories to consume and override.

## Goals / Non-Goals

**Goals:**

- Deliver a public, tag-pinned Remote Git Layer with an explicit runtime/developer-tooling boundary.
- Establish a shadcn-vue-compatible semantic token system and accessible component foundation before adding the core component set.
- Make local development, formatting, preview, and static Storybook deployment repeatable.

**Non-Goals:**

- Publishing an npm package or creating `landify-tooling` and `landify-template` during Sprint 1.
- Building complete component documentation, automated component tests, visual regression testing, or a CI quality gate for accessibility.
- Adding business-specific marketing pages, admin features, backend services, analytics, or brand assets.

## Decisions

### Public Remote Git Layer is the Sprint 1 distribution model

Consumers will extend `github:landify-organization/landify-base#vX.Y.Z` with `install: true`. Tags are immutable release boundaries; branches are not supported as consumer pins.

This avoids npm publication and consumer package-install steps while preserving explicit, per-consumer upgrades. An npm package is deferred because distribution simplicity is the current priority. A public repository avoids authentication configuration; secrets and restricted assets are prohibited from the repository.

### Runtime and developer tooling use separate distribution paths

The Layer will own Nuxt runtime configuration, CSS, components, composables, layouts, utilities, and dependencies imported by those files. ESLint, Prettier, Tailwind class sorting, editor settings, and Storybook remain local development tooling.

Nuxt's remote Layer mechanism cannot make tooling dependencies available to a consumer's formatter or linter. `landify-template` will initially provide a snapshot of consumer tooling; `landify-tooling` will later centralize the proven configuration. Consumers will retain minimal local wrappers where their file paths differ, especially the Tailwind v4 stylesheet path used by Prettier.

### Tailwind v4 uses shadcn-vue semantic tokens

Tailwind CSS v4 will be integrated through its Vite plugin. The Layer will use the standard semantic token vocabulary expected by shadcn-vue, such as `--background`, `--foreground`, `--primary`, and `--border`, with a neutral default theme. `@theme inline` will expose those variables through Tailwind utilities such as `bg-primary` and `text-foreground`.

The prior Landify-prefixed color primitive and semantic variables will be removed. Consumers override the standard semantic tokens in CSS loaded after the Layer, rather than modifying shared component source. This preserves direct compatibility with shadcn-vue source components and avoids a duplicate token mapping.

The supported-browser baseline is Safari 16.4+, Chrome 111+, and Firefox 128+, matching Tailwind v4's browser requirements.

### shadcn-vue supplies source-owned `Ui*` primitives above Reka UI

Reka UI provides accessible low-level behavior. shadcn-vue will generate selected, source-owned primitives in `app/components/ui/`; Landify's public naming convention uses `Ui*` names. This gives Landify editable component source while preventing consumer code from coupling directly to Reka's primitive structure.

Only components needed by the Base contract will be added. The CLI configuration remains in the repository so new primitives can be added deliberately and reviewed as source changes.

### `Block*` replaces the landing-only pattern convention

`Block*` denotes generic compositions of `Ui*` primitives that can serve marketing, dashboard, or back-office surfaces: for example `BlockHero`, `BlockPageHeader`, `BlockStats`, and `BlockEmptyState`. A generic `UiCard` remains a primitive; a composed `BlockFeatureCard` can represent a reusable marketing pattern.

Blocks must not contain consumer business data, permission decisions, API calls, analytics, or campaign-specific content. Those remain in each consumer repository.

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
- [Generated component source can diverge from upstream shadcn-vue] → treat generated files as owned source, add components selectively, and review any CLI overwrite before accepting it.

## Migration Plan

1. Create the Layer and local tooling baseline in the public repository.
2. Validate it through local development, static Storybook build, and a minimal consumer fixture in Sprint 4.
3. Tag the first stable release as `v1.0.0`.
4. Configure consumers to extend the release tag with `install: true`.
5. Roll back a consumer by restoring its previously pinned tag; do not retag published releases.
