## Why

Landing-page consumers currently need to compose responsive image rendering,
layout reservation, loading feedback, error handling, and accessible fallback
independently. This duplicates behavior and makes a future framework port touch
every consumer instead of one public primitive.

## What Changes

- Add Nuxt Image as a runtime capability of the Nuxt Layer.
- Introduce `UiImage`, a public responsive image primitive backed by Nuxt Image.
- Standardize image loading, loaded, and error states; accessible default and
  custom fallbacks; and layout reservation through intrinsic dimensions or a
  ratio.
- Update component architecture guidance to recognize `UiImage` as a justified
  public wrapper while preserving consumer ownership of image providers,
  domains, presets, and deployment configuration.

## Capabilities

### New Capabilities

- `ui-image`: Responsive, accessible image rendering with state and fallback
  behavior for Landify consumers.

### Modified Capabilities

- None.

## Impact

- Adds the `@nuxt/image` runtime dependency and module registration.
- Adds `app/components/ui/UiImage.vue` and its Storybook coverage.
- Updates component architecture documentation and the Sprint 2 plan.
- Extends the public Nuxt Layer component API without changing existing
  components.
