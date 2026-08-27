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
