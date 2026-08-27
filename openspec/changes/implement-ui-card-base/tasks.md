## 1. Card primitive foundation

- [x] 1.1 Add the semantic Card primitive source components and their exports
      under `app/components/ui/card/`.
- [x] 1.2 Apply semantic-token default styles and `cn()` class merging to the
      Card root while preserving native Card section semantics.

## 2. Public Card wrapper

- [x] 2.1 Implement typed `UiCardBase` props and explicit root attribute
      forwarding.
- [x] 2.2 Implement slot precedence and conditional header, content, and
      footer rendering without empty sections.

## 3. Documentation and verification

- [x] 3.1 Add Storybook stories for default content, omitted optional sections,
      and custom header/content/footer slots.
- [ ] 3.2 Run formatting, lint, typecheck, and Storybook build; inspect the
      stories at 320px, 768px, and 1280px.

## 4. API refinement and Storybook taxonomy

- [x] 4.1 Add the typed per-part `ui` customization API and apply default
      generated-text limits without clamping default-slot content.
- [x] 4.2 Organize primitive stories under `Components/*` and composition
      stories under `Blocks/*`, including Card override coverage.
- [x] 4.3 Re-run relevant validation and update the pull request with the
      refined API and verification status.
