# v646 Controlled read-only shard preview no blocked plan steps gate

## Purpose

v646 adds a readiness check that consumes `stepStatusSummary.blockedStepCount`.

v645 exposed step status counts. v646 uses them to fail closed when the source matrix consumption plan contains blocked steps.

## Change

Added:

- `sourceMatrixConsumptionPlanHasNoBlockedSteps` check;
- blocker code `SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_BLOCKED_STEPS`.

Updated:

- ready preview check count from 24 to 25;
- blocked preview blocker expectations.

## Behavior

Ready case:

- `sourceMatrixConsumptionPlanReady=true`;
- `sourceMatrixConsumptionPlanHasNoBlockedSteps=true`;
- preview remains ready.

Blocked case:

- blocked plan steps produce `SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_BLOCKED_STEPS`;
- preview remains blocked.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: step status counts were visible but not part of readiness;
- later consumer: top-level ready now reflects blocked structured steps;
- reuse decision: it consumes the v645 summary instead of adding another artifact;
- stop condition: one check gates existing plan status; no receipt/verification chain follows.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v646 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v646 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused preview test passed: 1 file, 2 tests.
- Build passed.

CI note:

- v646 remains inside the local v643-v647 batch before the next push/CI verification.
