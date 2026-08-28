## 1. Nuxt Image foundation

- [x] 1.1 Add `@nuxt/image` as a runtime dependency and register the module in
      the Nuxt Layer without setting consumer-specific image configuration.
- [x] 1.2 Verify Nuxt Image types and components resolve in the Layer build.

## 2. UiImage public primitive

- [x] 2.1 Implement `UiImage` with the core public contract for source, alt,
      dimensions, ratio, responsive sizing, common attributes, classes,
      fallback, and load/error emits.
- [x] 2.2 Render through Nuxt Image while preserving generated responsive output
      and forwarding appropriate image attributes.
- [x] 2.3 Implement loading, loaded, and error presentation, including cached
      image handling and stale-event protection after a source change.
- [x] 2.4 Implement intrinsic-dimension and ratio layout reservation with the
      documented no-guarantee behavior when neither is supplied.
- [x] 2.5 Implement semantic-token default fallback and accessible custom
      fallback behavior for meaningful and decorative images.

## 3. Storybook and documentation

- [x] 3.1 Configure a Storybook-safe Nuxt Image integration or deterministic
      renderer test adapter for `UiImage` stories.
- [x] 3.2 Add stories for loaded, loading, error, custom fallback, intrinsic
      dimensions, ratio, responsive sizing, and consumer attribute/class usage.
- [x] 3.3 Update component conventions and the Sprint plan to document `UiImage`
      as the public wrapper over Nuxt Image and preserve consumer ownership of
      delivery configuration.

## 4. Verification

- [ ] 4.1 Review each story at 320px, 768px, and 1280px for overflow,
      object-fit behavior, fallback accessibility, and layout reservation.
- [x] 4.2 Run `pnpm lint`, `pnpm typecheck`, `pnpm build`, and
      `pnpm build-storybook` and resolve resulting issues.
