## Purpose

Provide a reusable, accessible Card layout that lets landing-page consumers use
common content fields while retaining control over optional sections and styles.

## ADDED Requirements

### Requirement: Reusable Card structure

The system SHALL expose a public Card component that renders a semantic Card
root with its default visual styling and supports title, subtitle, and
description content.

#### Scenario: Default content is supplied

- **WHEN** a consumer supplies title, subtitle, and description
- **THEN** the Card renders a header containing the title and subtitle and a
  content section containing the description

#### Scenario: Only a title is supplied

- **WHEN** a consumer supplies a title without subtitle or description
- **THEN** the Card renders its root and header without an empty content or
  footer section

### Requirement: Consumer-controlled Card sections and presentation

The system SHALL allow a consumer to replace the generated header, replace
description content, supply optional footer content through slots, and override
the classes of generated Card parts without replacing the Card structure.

#### Scenario: Custom header is supplied

- **WHEN** a consumer supplies header slot content
- **THEN** the Card renders that content and does not render its generated
  title/subtitle header

#### Scenario: Custom content is supplied

- **WHEN** a consumer supplies default slot content together with description
- **THEN** the Card renders the slot content instead of the description

#### Scenario: Footer is omitted

- **WHEN** a consumer does not supply footer slot content
- **THEN** the Card does not render a footer section

#### Scenario: Generated text uses default limits

- **WHEN** a consumer supplies generated title, subtitle, and description text
- **THEN** the title and subtitle are visually limited to one line each and
  the description is visually limited to three lines without overflowing the
  Card

#### Scenario: A consumer changes a generated text limit

- **WHEN** a consumer supplies a part-specific presentation override
- **THEN** the override changes only that generated Card part without requiring
  replacement slot content

#### Scenario: Custom content is supplied

- **WHEN** a consumer supplies default slot content
- **THEN** the Card renders that content without applying the generated
  description text limit

### Requirement: Root customization and accessibility metadata

The system SHALL apply consumer root classes together with its base classes and
forward non-prop root attributes, including accessibility and data attributes,
to the Card root.

#### Scenario: Root attributes are supplied

- **WHEN** a consumer supplies class, aria-label, and data attributes
- **THEN** the rendered Card root retains its base styling, includes the
  consumer class, and exposes the supplied aria-label and data attributes
