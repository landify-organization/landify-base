## Purpose

Automatically maintains a review-ready pull request for each pushed feature
branch, so its context and ownership remain consistent throughout development.

## ADDED Requirements

### Requirement: Feature branches receive one preserved pull request

The repository SHALL create a pull request from a pushed non-default branch to
the default branch when no open pull request for that branch exists. Later
pushes to the same branch SHALL leave that existing pull request unchanged and
SHALL NOT create a duplicate. Pushes to the default branch SHALL NOT create a
pull request.

#### Scenario: First push to a feature branch

- **WHEN** a contributor pushes a branch other than the default branch and no
  open pull request exists for that branch
- **THEN** the repository creates one pull request targeting the default branch

#### Scenario: Later push to an existing pull request branch

- **WHEN** a contributor pushes additional commits to a branch with an open
  pull request targeting the default branch
- **THEN** the repository does not create another pull request and does not
  modify the existing pull request's title, body, assignees, or reviewers

### Requirement: Initial pull request content reflects the branch commit range and ticket prefix

The automation SHALL construct the pull request body from the repository pull
request template. For a commit subject matching
`type: [ticket-number] description`, it SHALL retain the full subject as the PR
title, use `description` as the summary and text in the change list, and set the
related issue field to `Closes #ticket-number`. It SHALL preserve the full
subject text for commits that do not match this convention. The change list
SHALL include every commit in the default-branch-to-head range without commit
SHA identifiers.

#### Scenario: First commit contains a ticket prefix

- **WHEN** the first commit subject is `feat: [1] Set up git PR github`
- **THEN** the PR title is `feat: [1] Set up git PR github`, the summary is
  `Set up git PR github`, and the PR body contains `Closes #1`

#### Scenario: Initial branch contains commits ahead of the default branch

- **WHEN** a pull request is created for a branch with one or more
  commits ahead of the default branch
- **THEN** its changes section lists every commit in order using the cleaned text
  when that commit has a ticket prefix and without a commit SHA

#### Scenario: Commit has no ticket prefix

- **WHEN** a commit subject does not match the ticket-prefix convention
- **THEN** its original subject is kept and no issue link is inferred from it

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
