# v645 Controlled read-only shard preview step status summary

## Purpose

v645 adds `stepStatusSummary` to `sourceMatrixConsumptionPlan`.

v643 introduced structured step records. Consumers still had to count ready, needs-review, and blocked records themselves. v645 provides those counts directly.

## Change

Added:

- `stepStatusSummary.readyStepCount`;
- `stepStatusSummary.reviewStepCount`;
- `stepStatusSummary.blockedStepCount`.

Updated:

- plan digest material to include the summary;
- Markdown rendering for the three counts;
- ready and blocked preview tests;
- route Markdown tests.

## Behavior

Ready plan:

- 3 ready steps;
- 1 review step;
- 0 blocked steps.

Blocked plan:

- 1 ready step;
- 0 review steps;
- 2 blocked steps.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: consumers had to derive step counts from records;
- later consumer: v646+ can use summary counts for checks and rendering;
- reuse decision: it summarizes existing records instead of adding another artifact;
- stop condition: summary is count-only and does not create a new verification chain.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v645 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v645 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused preview/route tests passed: 2 files, 3 tests.
- Build passed.

CI note:

- v645 remains inside the local v643-v647 batch before the next push/CI verification.
