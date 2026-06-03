# v630 Controlled read-only shard preview source matrix renderer split

## Purpose

v630 is maintenance version 12 of the 20-version run after v618 closeout.

v628 and v629 split the route coverage and handoff summary rendering blocks. v630 finishes the large renderer cleanup by moving source matrix, consumer, drift, review, digest, archive snapshot, and summary export rendering into a dedicated helper.

## Change

Added `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.ts`.

The new helper renders:

- source matrix;
- source matrix consumer;
- source matrix drift summary;
- source matrix review checklist;
- source matrix review digest;
- source matrix archive snapshot;
- source matrix archive snapshot summary export.

The main renderer now delegates those sections through `renderControlledReadOnlyShardPreviewSourceMatrixSections(...)`.

Line-count impact:

- main renderer: 195 lines down to 70 lines;
- new source matrix renderer: 136 lines.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: source matrix rendering was still the last large domain block inside the main renderer;
- later consumer: future source matrix changes can touch a focused renderer file;
- reuse decision: output text stays on the existing controlled read-only preview route;
- stop condition: the main renderer now only assembles header, preview summaries, delegated sections, and footer blocks.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v630 is Node-only renderer refactoring. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v630 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/renderer tests passed: 2 files, 4 tests.
- Build passed.

CI remains batched. v630 stays in the local v628-v632 batch.
