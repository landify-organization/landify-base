## 1. Pull Request Automation

- [x] 1.1 Move the pull request template to GitHub's standard location and add
      stable summary and change-list placeholders.
- [x] 1.2 Add a push-triggered GitHub Actions workflow that creates one pull
      request for each non-default branch.
- [x] 1.3 Generate the initial pull request title and body from the branch
      commit range and assign the push actor.
- [x] 1.4 Support optional default individual and team reviewers through
      repository Actions variables.
- [x] 1.5 Derive clean PR text and a related same-repository issue from the
      optional `type: [ticket] description` commit convention.
- [x] 1.6 Retain the full first commit as the PR title and remove commit SHA
      identifiers from the generated change list.
- [x] 1.7 Exit without modifying an existing pull request on later branch
      pushes, preserving manual title, body, assignee, and reviewer edits.

## 2. Verification and Guidance

- [x] 2.1 Validate the workflow syntax and the OpenSpec change strictly.
- [x] 2.2 Document the required GitHub Actions permission and optional reviewer
      variables for repository maintainers.
- [x] 2.3 Document immutable Base release tags and the create-only pull-request
      automation behavior, including manual Issue closing links.
