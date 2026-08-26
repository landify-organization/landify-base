## Why

Pull requests are currently opened and documented manually after a branch is
pushed. That makes review metadata and change summaries inconsistent, and adds
unnecessary steps to the development flow.

## What Changes

- Add repository automation that creates one pull request for the first push
  to a non-default branch and preserves that pull request on later pushes.
- Populate the initial pull request body from a repository template, with the
  first branch commit as the summary and all branch commits as the change list.
- Derive a clean PR summary and same-repository issue link from commit subjects
  that use the `type: [ticket] description` convention.
- Assign the person who pushed the branch by default, while allowing optional
  reviewer configuration without storing a personal access token.
- Rename the existing non-standard merge-request template to GitHub's standard
  pull-request template location and add explicit placeholders for automation.

## Capabilities

### New Capabilities

- `pull-request-automation`: Automatically create a documented pull request
  for a feature branch while preserving later manual edits.

### Modified Capabilities

- None.

## Impact

- Adds a GitHub Actions workflow and updates `.github/pull_request_template.md`.
- Requires the repository's GitHub Actions `GITHUB_TOKEN` to be permitted to
  write pull requests and issues; no MCP, external service, or PAT is required
  for the base workflow.
