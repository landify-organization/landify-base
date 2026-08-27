# Landify Issue Conventions

This document defines the shared conventions for creating and managing issues across the Landify ecosystem.

> This document is currently maintained in `landify-base` and may be moved to `landify-devkit` when shared developer tooling and standards are introduced.

For the reusable issue description structure and a complete `UiCardBase`
example, see [Landify Issue Description Template](./issue-template.md).

## Issue Naming

Use the following format:

`[Area] [Work Type] <Title>`

Examples:

* `[LF-Base] [Setup] Initialize Nuxt 4 Layer`
* `[LF-Base] [Architecture] Define design token system`
* `[LF-Base] [Markup] Implement LandingHero responsive layout`
* `[LF-Base] [FE] Add controlled state to UiDialog`
* `[LF-Base] [Bug] Fix UiDialog focus restoration`
* `[LF-Template] [Setup] Create starter Nuxt template`

### Area

Use the repository/domain prefix to identify where the work belongs:

* `[LF-Base]` - Nuxt Layer, Design System, shared UI foundation
* `[LF-Template]` - starter template for new Landify projects
* `[LF-Tooling]` - shared linting, formatting, and development tooling
* `[LF-DevKit]` - shared workflows, AI, agents, MCP, and automation

## Work Types

Use the second prefix to describe the primary type of work:

* `[Setup]` - initial setup, configuration, or dependency integration
* `[Architecture]` - architecture, conventions, abstractions, or technical design
* `[Markup]` - HTML structure, CSS/Tailwind styling, responsive layout, and visual implementation
* `[FE]` - frontend behavior, state, interaction, composables, or integration
* `[BE]` - backend, API, server, or data-processing work
* `[Bug]` - fix behavior that is not working as expected
* `[Refactor]` - improve internal implementation without changing expected behavior
* `[Docs]` - documentation-only work
* `[Release]` - versioning, release preparation, or publishing work

Use one primary work type per issue whenever possible.

## Labels

Labels are used as searchable technical or domain metadata.

An issue may have multiple labels.

Example:

`[LF-Base] [Bug] Fix UiDialog keyboard navigation`

Labels:

* `bug`
* `ui`
* `accessibility`

Guidelines:

* Prefer existing labels before creating new ones.
* Do not use labels to duplicate Priority, Sprint, Phase, or Status.
* Label definitions and descriptions are maintained in GitHub repository settings.
* Work type and label do not have to be identical.

For example:

`[LF-Base] [Markup] Implement UiButton responsive styles`

may use:

* `markup`
* `ui`
* `accessibility`

## Priority

Use:

* `Urgent` - blocker or critical issue preventing further work
* `High` - important work for the current phase or near-term delivery
* `Medium` - valuable work that does not block progress
* `Low` - optional, exploratory, or deferrable work

`Urgent` should be used sparingly.

## Size

Use relative sizing to estimate the amount of work:

* `XS` - trivial change
* `S` - small task
* `M` - moderate task
* `L` - large task
* `XL` - very large task; consider splitting into smaller issues

Size represents effort, not priority.

## Sprint

Sprint is managed using the GitHub Project `Sprint` iteration field.

* Issues not assigned to a Sprint remain in the Backlog.
* Issues assigned to the current iteration appear in Active Sprint.
* Sprint belongs to the Landify Platform project, not to an individual repository.

## Status

Use the project status to represent workflow progress.

Recommended flow:

`Todo → In Progress → Done`

Additional states such as `Review` may be introduced later if the workflow requires them.

## General Rules

* Keep issue titles short and action-oriented.
* One issue should represent one clear deliverable.
* Split very large issues instead of using `XL` indefinitely.
* Do not include Priority, Sprint, or Status in the issue title.
* Use labels for filtering and discovery, not for information already represented by Project fields.
* Create issues in the repository where the implementation belongs, then add them to the shared `Landify Platform` project.
