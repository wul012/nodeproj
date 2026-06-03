# v628 Controlled read-only shard preview route coverage renderer split

## Purpose

v628 is maintenance version 10 of the 20-version run after v618 closeout.

v623-v627 added a complete route coverage archive summary receipt verification chain. That made the controlled read-only shard preview Markdown renderer too large for comfortable maintenance, so v628 splits the route coverage rendering block into a dedicated helper module before adding more versions.

## Change

Added `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageRenderer.ts`.

The new helper renders:

- handoff route coverage;
- route coverage verification;
- route coverage archive snapshot;
- route coverage archive verification;
- route coverage archive summary;
- route coverage archive summary receipt;
- route coverage archive summary receipt archive snapshot;
- route coverage archive summary receipt archive verification.

The main renderer now delegates those sections through `renderControlledReadOnlyShardPreviewHandoffRouteCoverageSections(...)`.

Line-count impact:

- main renderer: 500 lines down to 336 lines;
- new route coverage renderer: 175 lines.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: the main Markdown renderer was becoming too large after v623-v627;
- later consumer: future versions can extend or close route coverage output in a focused renderer file;
- reuse decision: output text stays on the existing controlled read-only preview route;
- stop condition: this split only moves route coverage rendering and does not split unrelated sections.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v628 is Node-only renderer refactoring. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v628 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/renderer tests passed: 2 files, 4 tests.
- Build passed.

CI remains batched. v628 starts the next local batch after v623-v627.
