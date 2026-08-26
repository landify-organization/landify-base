## Context

The repository contains a manually written merge-request template but no pull
request automation. This is a public GitHub repository, so an in-repository
GitHub Actions workflow can use the ephemeral repository `GITHUB_TOKEN` rather
than a user-owned secret.

## Goals / Non-Goals

**Goals:**

- Create or update a single PR per non-default branch push.
- Make the generated PR body deterministic from the branch's commit range.
- Keep reviewer configuration optional and visible in repository configuration.

**Non-Goals:**

- Creating PRs from forks, assigning PR authorship to the human contributor, or
  approving pull requests automatically.
- Replacing the normal UI for per-PR labels, reviewers, milestones, or issues.

## Decisions

- Use one first-party GitHub Actions workflow triggered by `push`, excluding
  `main`. The workflow will search for an existing PR with the pushed branch as
  head, then create or update it through the GitHub REST API. This avoids a PAT
  and avoids creating a separate automation branch, as some generic PR actions
  do.
- Use `actions/github-script` for the small amount of REST and body-generation
  logic. It receives the built-in token and avoids adding a runtime dependency
  or committing a standalone script.
- Rename the template to `.github/pull_request_template.md` and use
  `{{SUMMARY}}`, `{{CHANGES}}`, and `{{RELATED_ISSUE}}` placeholders. The
  workflow reads the same template that GitHub shows for manually created pull
  requests.
- Parse the optional `type: [ticket-number] description` commit convention. The
  parser uses `description` for human-facing PR text and fills
  `Closes #ticket-number` only for a same-repository ticket; non-matching
  commit subjects remain untouched.
- Assign `github.actor` by default. Read optional reviewer configuration from
  repository-level Actions variables (`DEFAULT_REVIEWERS` and
  `DEFAULT_TEAM_REVIEWERS`), so no secret is needed and maintainers can change
  it without editing workflow logic.

## Risks / Trade-offs

- [Repository policy denies write access to `GITHUB_TOKEN`] → Document the
  required Actions setting and request only `pull-requests` and `issues` write
  permission in the workflow.
- [A configured reviewer cannot review their own PR] → Reviewer variables are
  optional; GitHub API validation errors for an ineligible reviewer will be
  surfaced in the workflow log rather than silently ignored.
- [Very large commit ranges] → The workflow retrieves paginated comparison data
  and limits the displayed commit subject to the PR's commit range.

## Migration Plan

1. Commit the workflow and renamed template to the default branch.
2. Enable read/write workflow permissions in GitHub repository settings if the
   organization policy permits it.
3. Optionally set `DEFAULT_REVIEWERS` and/or `DEFAULT_TEAM_REVIEWERS` as
   comma-separated Actions variables.
4. Push a short-lived feature branch and verify the created PR; remove the
   workflow to roll back if the repository does not want automatic PRs.
