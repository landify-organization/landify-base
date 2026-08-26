## Purpose

Ensure a Remote Git Layer's static Tailwind utilities remain available to every consumer build.

## ADDED Requirements

### Requirement: Base component utilities are discoverable by consumer builds

The system SHALL explicitly register the Base application source so that Tailwind generates utilities used by Base components when `landify-base` is consumed through a Remote Git Layer.

#### Scenario: Template renders a Base component

- **WHEN** a Template consumer builds an application that renders a Base component containing static Tailwind utilities
- **THEN** the generated consumer stylesheet SHALL contain the utilities required by that component

### Requirement: Source-discovery ownership is documented

The system SHALL document that consumers rely on Tailwind's normal project scanning for their own source files, while the Base explicitly registers its dependency-resident source.

#### Scenario: Developer adds a consumer component

- **WHEN** a developer adds static Tailwind utilities to a component in the consumer project
- **THEN** the documentation SHALL state that no Base-specific source path configuration is required for that consumer component

#### Scenario: Developer constructs a class name dynamically

- **WHEN** a developer needs utilities represented only by dynamically constructed class names
- **THEN** the documentation SHALL direct the developer to use static alternatives or explicit Tailwind safelisting
