# v639 Controlled read-only shard preview consumption plan readiness gate

## Purpose

v639 consumes the v638 `sourceMatrixConsumptionPlan` in the profile readiness checks.

v638 made the plan visible. v639 makes it operational: a preview is no longer ready unless the read-only consumption plan is also ready.

## Change

Added:

- `sourceMatrixConsumptionPlanReady` to `ControlledReadOnlyShardPreviewChecks`;
- the consumption plan as an input to `createChecks(...)`;
- a fail-closed blocker code: `SOURCE_MATRIX_CONSUMPTION_PLAN_BLOCKED`.

Updated:

- ready preview summary counts from 23 checks to 24 checks;
- blocked preview expectations to include the new blocker when the plan is blocked.

## Behavior

Ready case:

- source matrix consumption plan is ready;
- `sourceMatrixConsumptionPlanReady=true`;
- preview remains ready.

Blocked case:

- source matrix consumption plan is blocked;
- `sourceMatrixConsumptionPlanReady=false`;
- production blockers include `SOURCE_MATRIX_CONSUMPTION_PLAN_BLOCKED`;
- preview stays blocked.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: the v638 plan was visible but not yet part of readiness;
- later consumer: future preview consumers can trust the top-level ready flag to include the plan gate;
- reuse decision: it reuses the v638 plan instead of adding a new report or receipt;
- stop condition: readiness has one plan gate, with no follow-on verification chain.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v639 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v639 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused preview/route tests passed: 2 files, 3 tests.
- Build passed.

CI note:

- v639 remains inside the local v638-v642 batch before the next push/CI verification.
