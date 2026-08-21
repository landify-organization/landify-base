# Landify Platform - Sprint & Ticket Plan

*Planning baseline for GitHub Projects*

> Baseline: 10 sprints total, 2 weeks per sprint. Phase dates are planning estimates; actual execution is reflected by child issues, sprint assignment, status, and sub-issue progress.

## 1. Planning Model

- Phase = high-level roadmap outcome. Parent phase issues do not belong to a Sprint.

- Sprint = fixed 2-week execution window across the whole Landify Platform project.

- Issue = actionable work item created in the repository where implementation belongs.

- Roadmap = parent phase issues only, using Start date and Target date.

- Active Sprint = issues assigned to the current Sprint.

- Backlog = actionable issues that have a parent phase but no Sprint assignment.

## 2. Phase & Sprint Timeline

| Phase | Sprints | Start | Target | Duration | Primary Outcome |
| --- | --- | --- | --- | --- | --- |
| Phase 1 - Base | Sprint 1-4 | 07 Sep 2026 | 01 Nov 2026 | 8 weeks | Nuxt Layer, UI foundation, Storybook, validation, v1.0 |
| Phase 2 - Template | Sprint 5-6 | 02 Nov 2026 | 29 Nov 2026 | 4 weeks | Starter template, demo, GitHub template setup, validation |
| Phase 3 - Tooling | Sprint 7-8 | 30 Nov 2026 | 27 Dec 2026 | 4 weeks | Shared ESLint/Prettier package and adoption |
| Phase 4 - DevKit | Sprint 9-10 | 28 Dec 2026 | 24 Jan 2027 | 4 weeks | Reusable CI, AI/MCP standards, sync strategy, CLI exploration |

## 3. Sprint Ticket Plan

### Sprint 1 - Base Foundation

07 Sep - 20 Sep 2026

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-Base] [Setup] Initialize Nuxt 4 Layer | High | M | architecture, enhancement |
| [LF-Base] [Architecture] Define project structure | High | S | architecture |
| [LF-Base] [Setup] Configure Tailwind CSS v4 | High | M | theme, build |
| [LF-Base] [Architecture] Define design token system | High | L | architecture, theme |
| [LF-Base] [Setup] Add Reka UI and core dependencies | High | S | ui, accessibility |
| [LF-Base] [Setup] Configure Storybook | High | M | storybook, documentation |
| [LF-Base] [Setup] Configure Storybook accessibility checks | Medium | S | storybook, accessibility |
| [LF-Base] [FE] Create shared cn() utility | Medium | XS | architecture, ui |
| [LF-Base] [Architecture] Define component conventions | High | M | architecture, ui, documentation |
| [LF-Base] [Markup] Implement UiButton | Medium | M | markup, ui, accessibility, enhancement |

### Sprint 2 - Core UI Foundation

21 Sep - 04 Oct 2026

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-Base] [Architecture] Define typography foundation | High | M | theme, ui |
| [LF-Base] [Architecture] Define responsive breakpoint conventions | High | S | architecture, ui |
| [LF-Base] [Markup] Implement UiInput | High | M | markup, ui, accessibility |
| [LF-Base] [Markup] Implement UiCheckbox | Medium | M | markup, ui, accessibility |
| [LF-Base] [Markup] Implement UiDialog | High | L | markup, ui, accessibility |
| [LF-Base] [Markup] Implement UiTooltip | High | M | markup, ui, accessibility |
| [LF-Base] [Markup] Implement UiSelect | Medium | L | markup, ui, accessibility |
| [LF-Base] [Markup] Implement UiTabs | Medium | M | markup, ui, accessibility |

### Sprint 3 - Landing Foundation

05 Oct - 18 Oct 2026

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-Base] [Markup] Implement UiAccordion | Low | M | markup, ui, accessibility |
| [LF-Base] [Markup] Implement LandingContainer | High | M | markup, ui |
| [LF-Base] [Markup] Implement LandingSection | High | M | markup, ui |
| [LF-Base] [Markup] Implement LandingHero | High | L | markup, ui |
| [LF-Base] [Markup] Implement ResponsiveImage | High | M | markup, ui, performance |
| [LF-Base] [Architecture] Define motion and animation conventions | Medium | M | architecture, ui, accessibility |
| [LF-Base] [Architecture] Define component maturity model | Low | S | architecture, documentation |

### Sprint 4 - Validation & Release

19 Oct - 01 Nov 2026

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-Base] [Docs] Define component documentation guidelines | Medium | S | documentation, storybook |
| [LF-Base] [Setup] Create minimal consumer fixture | High | M | architecture, build |
| [LF-Base] [FE] Validate tree-shaking in consumer app | High | M | build, performance |
| [LF-Base] [FE] Validate SSR and hydration behavior | High | M | build, performance |
| [LF-Base] [Release] Prepare landify-base v1.0.0 | High | M | build, documentation |

### Sprint 5 - Template Foundation

02 Nov - 15 Nov 2026

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-Template] [Architecture] Define starter project structure | High | M | architecture |
| [LF-Template] [Setup] Create Nuxt template extending landify-base | High | M | architecture, enhancement |
| [LF-Template] [Setup] Integrate stable landify-base version | High | S | build, architecture |
| [LF-Template] [Setup] Add default repository configuration | Medium | S | enhancement |

### Sprint 6 - Template Validation

16 Nov - 29 Nov 2026

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-Template] [Markup] Add minimal landing page demo | Medium | M | markup, ui |
| [LF-Template] [Setup] Configure GitHub Template Repository | High | S | enhancement |
| [LF-Template] [Docs] Document project creation workflow | Medium | S | documentation |
| [LF-Template] [Setup] Validate project creation from template | High | M | build |

### Sprint 7 - Shared Tooling

30 Nov - 13 Dec 2026

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-Tooling] [Architecture] Define shared tooling scope | Medium | S | architecture |
| [LF-Tooling] [Setup] Extract shared ESLint configuration | High | M | enhancement |
| [LF-Tooling] [Setup] Extract shared Prettier configuration | Medium | S | enhancement |
| [LF-Tooling] [Setup] Publish shared tooling package | High | M | build, enhancement |

### Sprint 8 - Tooling Adoption

14 Dec - 27 Dec 2026

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-Tooling] [Refactor] Adopt shared tooling in landify-base | High | M | architecture, build |
| [LF-Tooling] [Docs] Document tooling integration | Low | S | documentation |

### Sprint 9 - DevKit Foundation

28 Dec 2026 - 10 Jan 2027

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-DevKit] [Architecture] Define developer platform scope | Medium | S | architecture |
| [LF-DevKit] [Setup] Create reusable GitHub Actions workflow | High | M | build, enhancement |
| [LF-DevKit] [Setup] Define default pull request template | Medium | S | documentation |
| [LF-DevKit] [Setup] Define shared AI coding rules | High | M | documentation, enhancement |
| [LF-DevKit] [Setup] Create shared agent definitions | Medium | M | enhancement |

### Sprint 10 - DevKit Integration

11 Jan - 24 Jan 2027

| Issue | Priority | Size | Labels |
| --- | --- | --- | --- |
| [LF-DevKit] [Setup] Define reusable skills structure | Medium | M | enhancement |
| [LF-DevKit] [Setup] Create Figma MCP configuration template | Medium | M | enhancement |
| [LF-DevKit] [Architecture] Define configuration sync strategy | Medium | L | architecture |
| [LF-DevKit] [Architecture] Explore init / sync / doctor CLI | Low | L | architecture, enhancement |

## 4. Parent Phase Issues for Roadmap

| Parent Issue | Status | Priority | Sprint | Start | Target |
| --- | --- | --- | --- | --- | --- |
| [LF-Base] [Architecture] Phase 1 - Base | Todo / In Progress | High | Empty | 07 Sep 2026 | 01 Nov 2026 |
| [LF-Template] [Architecture] Phase 2 - Template | Todo | Medium | Empty | 02 Nov 2026 | 29 Nov 2026 |
| [LF-Tooling] [Architecture] Phase 3 - Tooling | Todo | Medium | Empty | 30 Nov 2026 | 27 Dec 2026 |
| [LF-DevKit] [Architecture] Phase 4 - DevKit | Todo | Medium | Empty | 28 Dec 2026 | 24 Jan 2027 |

- Do not assign Sprint to parent phase issues.

- Use Start date and Target date on parent issues as planning estimates.

- Use Sub-issues progress and Status to reflect actual execution progress.

- Recommended Roadmap filter: show issues with no Parent issue.

- Recommended Active Sprint filter: Sprint = current iteration.

- Recommended Backlog filter: Sprint is empty AND Parent issue has a value.

## 5. Ticket Conventions

- Naming: [Area] [Work Type] <Action-oriented title>.

- Areas: [LF-Base], [LF-Template], [LF-Tooling], [LF-DevKit].

- Work types: [Setup], [Architecture], [Markup], [FE], [BE], [Bug], [Refactor], [Docs], [Release].

- Priority: Urgent, High, Medium, Low. Use Urgent only for blockers or critical failures.

- Size: XS, S, M, L, XL. XL should usually be split into smaller issues.

- Labels describe searchable technical/domain concerns; do not duplicate Sprint, Priority, Phase, or Status.

- Recommended status flow: Todo -> In Progress -> In Review -> Done.

- For landify-base, Done means implementation is accepted/merged; release/deployment can be tracked separately.

## 6. Planning Notes

- This schedule is a planning baseline, not a fixed delivery commitment.

- Phase 1 is intentionally larger because it establishes the reusable foundation and reference implementation.

- Phases 2-4 are initially planned as two sprints each and may be adjusted after Phase 1 reveals actual velocity.

- DevKit has the highest scope-expansion risk because AI, MCP, skills, sync, and CLI requirements can grow independently.

- Move unfinished issues to the next sprint rather than extending the sprint duration.
