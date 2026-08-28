## Purpose

Provide Landify consumers with an accessible responsive image primitive that
handles image lifecycle states and layout reservation consistently.

## ADDED Requirements

### Requirement: Public responsive image primitive

The system SHALL expose a `UiImage` public component for consumer image content.
It MUST accept a source and an explicit alternative-text value, including an
empty value for decorative images. It MUST support intrinsic dimensions and
responsive sizing inputs without requiring consumers to import the underlying
image renderer.

#### Scenario: Responsive content image

- **WHEN** a consumer provides source, alternative text, dimensions, and
  responsive sizing information
- **THEN** `UiImage` renders the image with those semantics and responsive
  source selection behavior

#### Scenario: Decorative image

- **WHEN** a consumer provides an empty alternative-text value
- **THEN** `UiImage` renders the image as decorative without inventing an
  accessible name

### Requirement: Image lifecycle feedback

The system SHALL expose loading, loaded, and error presentation states without
requiring a consumer to control state manually. It MUST transition according to
the active image source, reset when that source changes, and expose load and
error notifications to consumers.

#### Scenario: Successful image load

- **WHEN** the active image source finishes loading
- **THEN** `UiImage` replaces its loading presentation with the loaded image and
  emits a load notification

#### Scenario: Image load failure

- **WHEN** the active image source fails to load
- **THEN** `UiImage` displays fallback content instead of the browser broken-image
  presentation and emits an error notification

#### Scenario: Source replacement

- **WHEN** a consumer changes the image source while a previous source is still
  loading
- **THEN** `UiImage` returns to loading for the new source and does not let a
  late result from the previous source change the current presentation

### Requirement: Layout reservation

The system SHALL reserve image layout space when consumers supply intrinsic
dimensions or a ratio. It MUST remain usable without either input, while clearly
not promising layout-shift prevention in that case.

#### Scenario: Intrinsic dimensions reserve space

- **WHEN** a consumer supplies both image width and height
- **THEN** `UiImage` preserves the corresponding intrinsic aspect ratio before
  the image has loaded

#### Scenario: Ratio reserves space

- **WHEN** a consumer supplies a ratio without intrinsic dimensions
- **THEN** `UiImage` reserves container space according to that ratio while the
  image is loading or has failed

### Requirement: Accessible customizable fallback

The system SHALL provide a neutral default fallback and permit consumers to
replace it entirely. The default fallback MUST preserve meaningful alternative
text after an error, remain silent for decorative images, and avoid
brand-specific visual decisions.

#### Scenario: Default fallback for meaningful image

- **WHEN** an image with non-empty alternative text fails
- **THEN** the default fallback exposes that alternative text to assistive
  technologies

#### Scenario: Consumer fallback replacement

- **WHEN** a consumer provides fallback content
- **THEN** `UiImage` renders that content in place of its default fallback

### Requirement: Image element customization

The system SHALL forward applicable native image, ARIA, and data attributes to
the rendered image element. Consumer classes MUST merge with the component's
required image classes so consumers can select object fitting without removing
required behavior.

#### Scenario: Consumer image presentation

- **WHEN** a consumer supplies image attributes and an object-fit class
- **THEN** the rendered image receives those attributes and the merged class

### Requirement: Consumer-owned image delivery configuration

The system SHALL provide image rendering without imposing an image provider,
remote-domain allowlist, preset, or deployment configuration on consumers.

#### Scenario: Consumer configures remote delivery

- **WHEN** a consumer configures its own permitted image source and provider
- **THEN** `UiImage` uses that consumer configuration without requiring a
  component API change
