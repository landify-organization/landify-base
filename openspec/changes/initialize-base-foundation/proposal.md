## Why

`landify-base` needs a reproducible foundation before shared UI components are introduced. The repository currently has the agreed platform direction but no Nuxt Layer, design-token implementation, development tooling, or component preview environment.

## What Changes

- Establish `landify-base` as a public, version-tagged Nuxt 4 Remote Git Layer that consumers extend with `install: true`, without installing a published Landify package.
- Add the initial Nuxt Layer structure, strict TypeScript, Tailwind CSS v4, semantic design-token foundation, Reka UI dependencies, and the shared `cn()` utility.
- Define public component and landing-pattern conventions that exclude brand- and campaign-specific behavior.
- Add local-only ESLint, Prettier, Tailwind class sorting, VS Code formatting recommendations, and standard quality scripts.
- Add Storybook as a lightweight component preview with manual accessibility feedback; automated component, accessibility, and visual tests are deferred.
- Document the boundary between runtime configuration inherited through Nuxt `extends` and developer tooling supplied to future consumers through the template and shared tooling package.
- Document static Storybook deployment to Vercel.

## Capabilities

### New Capabilities

- `base-foundation`: Provides the reusable Nuxt Layer runtime, foundational styling and component contracts, and local development/preview quality baseline for Landify.

### Modified Capabilities

- None.

## Impact

- Adds the initial application, configuration, documentation, and development-tooling files to `landify-base`.
- Adds runtime dependencies for the Layer and development dependencies for local tooling and Storybook.
- Establishes the public Git-tag consumption contract for future landing-page repositories.
- Updates architecture and Sprint 1 planning documentation; future `landify-template` and `landify-tooling` work will reuse the documented tooling boundary.
