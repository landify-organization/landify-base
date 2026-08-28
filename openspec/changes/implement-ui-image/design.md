## Context

The Nuxt Layer currently exposes public `Ui*` wrappers but has no image module
or image primitive. `UiImage` introduces a runtime dependency, stateful
presentation, responsive output, Storybook coverage, and an architecture-policy
exception. The public behavior is defined in `specs/ui-image/spec.md`.

## Goals / Non-Goals

**Goals:**

- Keep `UiImage` as the sole public landing-image primitive while retaining the
  platform renderer's optimization and responsive-source capabilities.
- Provide deterministic lifecycle, fallback, layout, and accessibility behavior.
- Keep core public concepts portable enough to implement a sibling adapter in a
  future framework without pretending the Vue source is portable.

**Non-Goals:**

- Building an optimizer, CDN provider, or Next/React implementation.
- Normalizing every renderer-specific option into one public API.
- Setting provider, domain, preset, or deployment policy for consumers.

## Decisions

### Wrap Nuxt Image rather than native image rendering

`@nuxt/image` will be a runtime dependency and registered by the Layer.
`UiImage` will render through Nuxt Image, using its custom rendering capability
only when required to control presentation states. This retains provider URL
generation and responsive output.

Using native `<img>` directly was rejected because it duplicates or loses the
optimization and responsive delivery behavior that the dependency supplies.

### Define a small renderer-neutral public contract

The core component API will cover source, alternative text, dimensions, ratio,
responsive sizing, common image attributes, presentation classes, fallback, and
load/error notifications. It will not expose `srcset`; the renderer generates
that output. Nuxt-specific options remain internal until a concrete consumer
need justifies a deliberate escape hatch.

This makes an eventual Next adapter a reimplementation of behavior, not a
translation layer for Nuxt-specific props. Renderer-specific sizing syntax is
documented as such where exposed.

### Use dimensions first and ratio second for layout reservation

Width plus height yields an intrinsic aspect ratio and supports optimized image
generation. A numeric ratio reserves space for layouts where those dimensions
are not suitable. Without either, rendering remains supported but cannot promise
CLS prevention.

### Treat source identity as a request generation

The component will increment an internal generation whenever its source changes.
Load and error callbacks update presentation only when they correspond to the
active generation. A mounted/cached-image check prevents stale loading UI after
the browser has already completed the current image.

### Make fallback accessibility state-aware

The default fallback is a semantic-token neutral container with an aria-hidden
icon. For meaningful images it retains the supplied alternative text as the
fallback's accessible label; decorative images remain unnamed. The fallback slot
replaces visual content while the enclosing semantic behavior remains valid.

### Integrate Nuxt rendering in Storybook deliberately

The current Vue/Vite Storybook setup does not inherit Nuxt auto-imports. The
implementation will select and document a Storybook-safe integration or test
adapter that allows `UiImage` stories to exercise deterministic loaded, loading,
and error states without relying on external image URLs.

## Risks / Trade-offs

- [Nuxt custom rendering changes image lifecycle details] → Verify against
  cached, delayed, and failed local fixtures before accepting the component.
- [A stateful wrapper adds client work] → Keep state local to the primitive and
  do not add watchers beyond active source identity.
- [Storybook cannot use the Nuxt runtime automatically] → Make its integration
  an explicit task and gate on `build-storybook`.
- [A generic API obscures optimization-specific needs] → Keep a small core API
  and add a documented escape hatch only after a concrete use case.

## Migration Plan

1. Release the Layer with the new runtime dependency and public component.
2. Consumer repositories adopt `UiImage` for new and migrated landing media,
   retaining their own image configuration.
3. Roll back by reverting the release tag; no persisted data or consumer config
   migration is required.
