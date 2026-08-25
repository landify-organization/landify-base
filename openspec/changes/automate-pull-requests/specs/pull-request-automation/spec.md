## Purpose

Automatically maintains a review-ready pull request for each pushed feature
branch, so its context and ownership remain consistent throughout development.

## ADDED Requirements

### Requirement: Feature branches receive one maintained pull request
The repository SHALL create a pull request from a pushed non-default branch to
the default branch when no open pull request for that branch exists. Later
pushes to the same branch SHALL update that existing pull request and SHALL NOT
create a duplicate. Pushes to the default branch SHALL NOT create a pull
request.

#### Scenario: First push to a feature branch
- **WHEN** a contributor pushes a branch other than the default branch and no
  open pull request exists for that branch
- **THEN** the repository creates one pull request targeting the default branch

#### Scenario: Later push to an existing pull request branch
- **WHEN** a contributor pushes additional commits to a branch with an open
  pull request targeting the default branch
- **THEN** the repository updates that pull request without creating another

### Requirement: Pull request content reflects the branch commit range
The automation SHALL construct the pull request body from the repository pull
request template. It SHALL replace the summary placeholder with the first
commit subject in the default-branch-to-head range and the changes placeholder
with a bullet list of every commit in that range.

#### Scenario: Branch contains commits ahead of the default branch
- **WHEN** the pull request is created or updated for a branch with one or more
  commits ahead of the default branch
- **THEN** its summary identifies the first commit and its changes section lists
  every commit in order

### Requirement: Pull request ownership is configurable without secrets
The automation SHALL assign the push actor to the pull request by default. It
SHALL allow a repository maintainer to optionally configure review requests for
an eligible collaborator or team without requiring a personal access token.

#### Scenario: No reviewer configuration is present
- **WHEN** a feature branch is pushed and no default reviewer is configured
- **THEN** the pull request is assigned to the push actor and no reviewer is
  requested

#### Scenario: Default reviewer configuration is present
- **WHEN** a feature branch is pushed and a valid default reviewer is configured
- **THEN** the automation requests review from that configured collaborator or
  team
