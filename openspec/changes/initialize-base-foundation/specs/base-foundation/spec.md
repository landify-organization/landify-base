## Purpose

Provide a reusable, versioned foundation that landing-page repositories can consume consistently while retaining control over their own brand and product code.

## ADDED Requirements

### Requirement: Consumers can use a versioned public base layer
The system SHALL allow a Nuxt consumer to extend a public, version-tagged `landify-base` Git repository with its runtime dependencies installed automatically, without installing a published Landify package manually.

#### Scenario: Consumer pins a released base version
- **WHEN** a consumer configures `landify-base` at a release tag with dependency installation enabled
- **THEN** Nuxt SHALL resolve the Layer and its declared runtime dependencies during consumer development and production builds

#### Scenario: Consumer selects a newer base release
- **WHEN** a consumer changes its configured base tag from one release to another
- **THEN** the consumer SHALL retain the previous base behavior until that configuration change is made and validated

### Requirement: Consumers receive reusable runtime foundations only
The system SHALL provide shared UI primitives, generic UI blocks, composables, layouts, utility functions, CSS tokens, and Nuxt runtime configuration while excluding brand-specific content, business data, permission decisions, campaign integrations, tracking identifiers, and secrets.

#### Scenario: Consumer uses a shared UI primitive
- **WHEN** a consumer extends the base Layer
- **THEN** it SHALL be able to use the Layer's reusable UI primitives without copying their source files into the consumer repository

#### Scenario: Consumer needs business-specific behavior
- **WHEN** a consumer requires a brand-, campaign-, product-, or business-specific feature
- **THEN** that feature SHALL remain in the consumer repository rather than be added to `landify-base`

### Requirement: The base provides overrideable design foundations
The system SHALL expose shadcn-vue-compatible semantic design tokens, including background, foreground, primary, and border roles, that consumers can override without modifying shared component source code.

#### Scenario: Consumer customizes a semantic token
- **WHEN** a consumer defines a replacement value for a documented semantic token
- **THEN** shared components using that token SHALL render with the consumer's replacement value

#### Scenario: Consumer uses a shared block in an admin or marketing surface
- **WHEN** a consumer renders a generic shared block in an admin, dashboard, or marketing surface
- **THEN** the block SHALL not require consumer business data access, permission logic, analytics, or campaign-specific source code from the base Layer

### Requirement: Local tooling and preview are reproducible
The system SHALL provide documented local quality commands, automatic Tailwind class sorting through the project's formatter, and a Storybook preview that reports accessibility findings without making automated tests a Sprint 1 release gate.

#### Scenario: Developer formats a Vue component
- **WHEN** a developer formats a supported source file using the project's Prettier configuration
- **THEN** Tailwind utility classes in supported class attributes and configured class helper calls SHALL be ordered according to the configured Tailwind formatter plugin

#### Scenario: Developer reviews a component story
- **WHEN** a developer opens a Storybook story
- **THEN** the Storybook accessibility panel SHALL display detected accessibility violations and incomplete checks without failing the Storybook static build solely because of those findings

### Requirement: Consumer tooling has a documented ownership boundary
The system SHALL document which configuration is inherited through the Layer and which local developer-tooling configuration must be supplied by `landify-template` or `landify-tooling`.

#### Scenario: Developer creates a consumer from the template
- **WHEN** a developer creates a new consumer using `landify-template`
- **THEN** the consumer SHALL receive the template's local linting, formatting, Tailwind sorting, and editor configuration without relying on Nuxt Layer inheritance for those tools
