## Context

See proposal.md for motivation. The current public primitive pattern is a thin
`Ui*` wrapper over source files in a sibling lowercase folder; `UiButton`
already demonstrates typed props and explicit attribute forwarding.

## Goals / Non-Goals

**Goals:**

- Establish the Card primitive set as owned support source and expose one
  consumer-friendly card composition.
- Make absent card regions structurally absent, rather than styling empty
  wrappers.
- Preserve semantic-token styling and consumer override precedence.

**Non-Goals:**

- Add Card variants, interactions, business content, or brand presentation.
- Change the APIs or behavior of existing public components.

## Decisions

### Thin public wrapper over Card primitives

Create source Card, CardHeader, CardTitle, CardDescription, CardContent, and
CardFooter primitives under `ui/card`, then compose them in `UiCardBase`.
This matches the existing source/wrapper boundary and lets a later shared
primitive API evolve without forcing consumers to import Reka UI directly.

Alternative considered: expose only a monolithic Card component. It would be
smaller initially but would make consistent internal markup and future generic
compositions harder to share.

### Explicit fallthrough attribute routing

`UiCardBase` will disable automatic attribute inheritance and bind `$attrs` to
the Card root. Its typed `class` prop is merged with root base classes using
the existing `cn()` helper. This makes the target of aria/data attributes
deterministic and prevents automatic fallthrough from competing with manual
class handling.

Alternative considered: rely on Vue automatic inheritance. It is less explicit
and would not give the wrapper reliable control of class merging as its template
evolves.

### Slot precedence and conditional sections

Header slot replaces generated header; the default slot replaces description;
footer is created only when its named slot exists. Generated header exists only
when title or subtitle exists, and generated content exists only for a
description. These rules directly satisfy the observable contract while
avoiding empty landmarks and spacing.

## Risks / Trade-offs

- [Slot-presence detection can be sensitive to empty slot content] → Stories
  will exercise omitted slots and supplied slots; the implementation will use
  Vue slot presence only for section creation.
- [Tailwind class conflicts can alter defaults] → Merge root classes with
  `cn()` so intentional consumer utilities take precedence while non-conflicting
  base classes remain.
- [Visual regressions at narrow widths] → Use stack-friendly spacing and verify
  each Storybook scenario at 320px, 768px, and 1280px.

## Migration Plan

The change is additive. Consumers can adopt the new public component without
migrating existing markup; rollback consists of removing the new files before
release.
