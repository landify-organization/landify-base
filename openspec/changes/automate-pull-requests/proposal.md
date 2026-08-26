## Why

Pull requests are currently opened and documented manually after a branch is
pushed. That makes review metadata and change summaries inconsistent, and adds
unnecessary steps to the development flow.

## What Changes

- Add repository automation that creates one pull request for a pushed
  non-default branch and updates that same pull request on later pushes.
- Populate a standard pull request body from a repository template, with the
  first branch commit as the summary and all branch commits as the change list.
- Derive a clean PR summary and same-repository issue link from commit subjects
  that use the `type: [ticket] description` convention.
- Assign the person who pushed the branch by default, while allowing optional
  reviewer configuration without storing a personal access token.
- Rename the existing non-standard merge-request template to GitHub's standard
  pull-request template location and add explicit placeholders for automation.

## Capabilities

### New Capabilities

- `pull-request-automation`: Automatically create and maintain documented pull
  requests for feature branches.

### Modified Capabilities

- None.

## Impact

- Adds a GitHub Actions workflow and updates `.github/pull_request_template.md`.
- Requires the repository's GitHub Actions `GITHUB_TOKEN` to be permitted to
  write pull requests and issues; no MCP, external service, or PAT is required
  for the base workflow.
