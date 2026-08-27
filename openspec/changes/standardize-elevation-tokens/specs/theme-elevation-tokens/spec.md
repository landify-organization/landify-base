## Purpose

Provide a neutral, documented elevation scale that consumers and shared Layer components can use consistently across light and dark themes.

## ADDED Requirements

### Requirement: Layer exposes a numbered elevation utility scale
The Layer SHALL expose custom Tailwind utilities `shadow-1` through `shadow-6` in addition to Tailwind's built-in `shadow-none`. The numbered scale SHALL remain ordered from the lightest to the strongest custom elevation and SHALL support standard Tailwind variants.

#### Scenario: Consumer applies an elevation utility
- **WHEN** a Layer component or consumer template includes `shadow-4` or `hover:shadow-5`
- **THEN** the generated stylesheet applies the corresponding custom box-shadow value

#### Scenario: Consumer suppresses elevation
- **WHEN** a Layer component or consumer template includes `shadow-none`
- **THEN** Tailwind's built-in no-shadow utility applies without requiring a duplicate Layer token

### Requirement: Elevation values are neutral and theme-aware
The Layer SHALL define each custom elevation token as a neutral shadow in both light and dark themes. The token geometry SHALL follow the approved six-step reference scale, documented with pixel-equivalent vertical offset, blur, and opacity comments. The Layer MUST NOT encode brand-specific shadow colors.

#### Scenario: Dark theme changes an elevation token
- **WHEN** the document has the `.dark` theme selector and an element uses a custom shadow utility
- **THEN** the element resolves to the dark-theme value for that elevation level

### Requirement: Public component overrides preserve precedence
The shared class-merging utility SHALL recognize every custom elevation utility as a conflicting shadow class, so a consumer-provided custom or built-in shadow utility replaces the component default according to class order.

#### Scenario: Consumer replaces a component elevation
- **WHEN** a public Layer component merges a default `shadow-1` with a consumer class of `shadow-4`
- **THEN** the rendered class list contains `shadow-4` and does not contain the conflicting default shadow utility

### Requirement: Token ownership remains extensible
The Layer SHALL keep its stylesheet entry point separate from category-specific token definitions and Tailwind-facing token aliases. A future token category SHALL be addable without making the stylesheet entry point the source of truth for its values.

#### Scenario: Maintainer locates shadow token values
- **WHEN** a maintainer needs to change a custom elevation value
- **THEN** the maintainer can find its theme-specific value in the shadow token category file and its generated utility alias in the Tailwind token mapping file
