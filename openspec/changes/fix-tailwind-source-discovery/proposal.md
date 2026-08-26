## Why

Tailwind CSS v4 excludes dependency directories from automatic source detection. Because `landify-base` is consumed as a Remote Git Layer, its component classes can be omitted from a Template consumer's generated CSS.

## What Changes

- Explicitly register the Base `app/` directory as a Tailwind source from the Base stylesheet.
- Document the source-discovery boundary between the Base layer and its consumers.
- Document that dynamic class construction still requires static alternatives or explicit safelisting.

## Capabilities

### New Capabilities

- `tailwind-source-discovery`: ensure Base component utilities are generated when the Base is installed as a Remote Git Layer.

### Modified Capabilities

- None.

## Impact

- `app/assets/css/main.css`
- Architecture documentation for consumer tooling and the frontend platform
- No public component API, runtime dependency, or consumer configuration changes
