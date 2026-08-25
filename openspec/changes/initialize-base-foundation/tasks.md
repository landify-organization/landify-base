## 1. Repository and Layer setup

- [ ] 1.1 Pin the Node and pnpm development environment and create the root package manifest, lockfile, ignore rules, and quality scripts.
- [ ] 1.2 Initialize the Nuxt 4 Layer configuration and the documented application, shared-code, and local-playground structure.
- [ ] 1.3 Configure the Layer's public, tag-based consumer contract and resolve layer-relative asset paths safely.

## 2. Styling and component foundations

- [ ] 2.1 Add Tailwind CSS v4 through the Vite integration and load the Layer stylesheet from Nuxt configuration.
- [ ] 2.2 Define primitive and semantic CSS token files, including documented consumer override points and the supported-browser baseline.
- [ ] 2.3 Add Reka UI and the runtime class utilities, then implement and type the shared `cn()` helper.
- [ ] 2.4 Document and enforce the `Ui*` primitive and `Landing*` pattern conventions, including the boundary against brand-specific behavior.

## 3. Local developer tooling

- [ ] 3.1 Configure ESLint flat config for the Base repository without adding development-only lint modules to the shared Layer runtime configuration.
- [ ] 3.2 Configure Prettier, Prettier compatibility with ESLint, and the Tailwind class-sorting plugin with the Layer stylesheet and supported helper functions.
- [ ] 3.3 Add VS Code extension recommendations and format-on-save settings for Vue, TypeScript, and JavaScript.
- [ ] 3.4 Verify linting, formatting, and type-check commands against the initial Layer files.

## 4. Storybook preview and static hosting

- [ ] 4.1 Configure Storybook as local-only development tooling and load the same global token CSS used by the Layer.
- [ ] 4.2 Add smoke stories that demonstrate the foundation and configure the a11y addon for non-blocking manual feedback.
- [ ] 4.3 Add the static Storybook build command and Vercel configuration that publishes `storybook-static` as a public site.
- [ ] 4.4 Verify local Storybook preview and static build without adding automated component or accessibility tests.

## 5. Documentation and release readiness

- [ ] 5.1 Update the platform architecture document with the public Remote Git Layer contract, versioning rules, and runtime/tooling ownership boundary.
- [ ] 5.2 Add consumer-tooling documentation covering template snapshots, future shared tooling, Tailwind formatter ownership, and Vercel Storybook hosting.
- [ ] 5.3 Update the Sprint 1 plan to reflect Tailwind class sorting, preview-only Storybook, deferred automated tests, and documentation deliverables.
- [ ] 5.4 Validate the OpenSpec change and confirm `lint`, `format:check`, `typecheck`, `build`, and `build-storybook` as Sprint 1 acceptance commands.
