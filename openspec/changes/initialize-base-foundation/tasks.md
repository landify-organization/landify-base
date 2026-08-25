## 1. Repository and Layer setup

- [x] 1.1 Pin the Node and pnpm development environment and create the root package manifest, lockfile, ignore rules, and quality scripts.
- [x] 1.2 Initialize the Nuxt 4 Layer configuration and the documented application, shared-code, and local-playground structure.
- [x] 1.3 Configure the Layer's public, tag-based consumer contract and resolve layer-relative asset paths safely.

## 2. Styling and component foundations

- [x] 2.1 Add Tailwind CSS v4 through the Vite integration and load the Layer stylesheet from Nuxt configuration.
- [x] 2.2 Replace the custom Landify token files with a neutral, shadcn-vue-compatible semantic token theme, Tailwind utility mapping, and documented consumer override points.
- [x] 2.3 Add shadcn-vue CLI configuration and selected source-owned `Ui*` primitives while retaining Reka UI and the typed shared `cn()` helper.
- [x] 2.4 Document and enforce `Ui*` primitive and `Block*` composition conventions, including the boundary against consumer business behavior.

## 3. Local developer tooling

- [x] 3.1 Configure ESLint flat config for the Base repository without adding development-only lint modules to the shared Layer runtime configuration.
- [x] 3.2 Configure Prettier, Prettier compatibility with ESLint, and the Tailwind class-sorting plugin with the Layer stylesheet and supported helper functions.
- [x] 3.3 Add VS Code extension recommendations and format-on-save settings for Vue, TypeScript, and JavaScript.
- [x] 3.4 Verify linting, formatting, and type-check commands against the initial Layer files.

## 4. Storybook preview and static hosting

- [x] 4.1 Configure Storybook as local-only development tooling and load the same global token CSS used by the Layer.
- [x] 4.2 Update smoke stories to demonstrate the shadcn-vue-based UI foundation and configure the a11y addon for non-blocking manual feedback.
- [x] 4.3 Add the static Storybook build command and Vercel configuration that publishes `storybook-static` as a public site.
- [x] 4.4 Verify local Storybook preview and static build without adding automated component or accessibility tests.

## 5. Documentation and release readiness

- [x] 5.1 Update the platform architecture document with the public Remote Git Layer contract, shadcn-vue source ownership, standard semantic token contract, and runtime/tooling ownership boundary.
- [x] 5.2 Update consumer-tooling documentation with semantic token overrides, shadcn-vue component-generation ownership, Tailwind formatter ownership, and Vercel Storybook hosting.
- [x] 5.3 Update the Sprint 1 plan to reflect shadcn-vue source primitives, `Block*` compositions, preview-only Storybook, deferred automated tests, and documentation deliverables.
- [x] 5.4 Validate the OpenSpec change and confirm `lint`, `format:check`, `typecheck`, `build`, and `build-storybook` as Sprint 1 acceptance commands.

## 6. Component customization demonstration

- [x] 6.1 Add a generic `Block*` composition and Storybook demo that uses a public `Ui*` primitive.
- [x] 6.2 Document the source, wrapper, reusable-variant, and consumer one-off customization boundaries for shadcn-vue-based primitives.
- [x] 6.3 Re-run Sprint 1 acceptance commands and strict OpenSpec validation.
