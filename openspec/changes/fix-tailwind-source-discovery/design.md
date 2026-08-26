## Context

The Base stylesheet imports Tailwind CSS v4 but does not register the Layer's source files. A consumer build scans its own project automatically, but Tailwind excludes dependency-resident files from this scan. See proposal.md for motivation and the `tailwind-source-discovery` spec for the observable contract.

## Goals / Non-Goals

**Goals:**

- Include static utilities referenced by Base application source in consumer output.
- Keep consumer setup free of paths into the Base's installed location.
- Make the ownership and dynamic-class limitation explicit in architecture documentation.

**Non-Goals:**

- Safelist every possible Tailwind utility.
- Scan arbitrary consumer directories from the Base layer.
- Add a legacy Tailwind JavaScript `content` configuration.

## Decisions

### Register the Base `app/` directory in the Base stylesheet

The stylesheet at `app/assets/css/main.css` will explicitly register its parent `app/` directory using Tailwind v4's CSS-native source directive. Paths are resolved relative to the stylesheet, so this remains correct regardless of where Nuxt installs the Remote Git Layer.

Alternative considered: configure paths in every Template consumer. Rejected because the consumer cannot safely rely on the Base's installation path and the requirement belongs to the source owner.

### Preserve consumer automatic detection

The Base will not name consumer paths. Tailwind automatically scans the consumer project; adding consumer-specific paths to the Base would make the Layer coupled to a consumer directory layout.

Alternative considered: disable automatic detection and enumerate all source folders. Rejected because it adds maintenance burden and can omit future consumer directories.

### Document static-class requirement

Documentation will describe `@source` as file discovery, not a solution for dynamic class construction. Dynamic classes must be represented statically or safelisted with Tailwind's explicit mechanism.

## Risks / Trade-offs

- [The source directory may include non-component files] → Tailwind ignores irrelevant files; scope remains limited to Base `app/` rather than a dependency root.
- [A class is dynamically constructed] → Document static mapping or explicit safelisting as the required solution.

## Migration Plan

1. Add the source directive and documentation in Base.
2. Verify a Template consumer renders a Base component with its static utilities.
3. Release a new patch tag before consumers upgrade; rollback consists of pinning the prior Base tag.
