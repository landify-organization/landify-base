## Why

Landing-page consumers repeatedly assemble the same Card header, content, and
footer structure, which duplicates conditional rendering and styling rules.
A public base component is needed now to make the common layout quick to use
while retaining consumer control over semantic content and local styling.

## What Changes

- Add shadcn-vue-style Card primitives under `app/components/ui/card/`.
- Add the public `UiCardBase` wrapper with typed text props and named slots for
  replacing its header and supplying its footer.
- Define intentional conditional rendering so optional card sections are not
  emitted empty.
- Forward non-prop attributes to the Card root and merge a consumer `class`
  with the component's semantic base styles.
- Add Storybook coverage for the default, optional-section, and slot-customized
  uses.

## Capabilities

### New Capabilities

- `ui-card-base`: Provide an accessible, semantic, reusable Card wrapper whose
  default content can be selectively replaced by consumers.

### Modified Capabilities

- None.

## Impact

- Adds public Vue components under `app/components/ui/` and internal Card
  primitive support files.
- Adds Storybook stories; no dependencies, API routes, business data, or
  existing component APIs change.
- The implementation branch and pull request will target `main`.
