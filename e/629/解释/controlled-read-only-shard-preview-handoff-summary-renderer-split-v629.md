# v629 Controlled read-only shard preview handoff summary renderer split

## Purpose

v629 is maintenance version 11 of the 20-version run after v618 closeout.

v628 split route coverage rendering. v629 continues the renderer cleanup by moving the handoff notes, summary, consumer, export, receipt, and receipt archive verification Markdown block into a dedicated helper module.

## Change

Added `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffSummaryRenderer.ts`.

The new helper renders:

- handoff notes;
- handoff summary;
- handoff summary consumer;
- handoff summary consumer export;
- handoff summary consumer receipt;
- handoff summary consumer receipt archive snapshot;
- handoff summary consumer receipt archive verification.

The main renderer now delegates those sections through `renderControlledReadOnlyShardPreviewHandoffSummarySections(...)`.

Line-count impact:

- main renderer: 336 lines down to 195 lines;
- new handoff summary renderer: 152 lines.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: handoff summary rendering was still a large unrelated block in the main renderer;
- later consumer: future handoff changes can touch a focused renderer file;
- reuse decision: output text stays on the existing controlled read-only preview route;
- stop condition: this split only moves handoff summary rendering and does not split source matrix sections.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v629 is Node-only renderer refactoring. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v629 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/renderer tests passed: 2 files, 4 tests.
- Build passed.

CI remains batched. v629 stays in the local v628-v632 batch.
