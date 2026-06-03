# Node v646 code walkthrough: controlled read-only shard preview no blocked plan steps gate

## Goal

v646 makes blocked structured plan steps part of preview readiness.

## Check

`createChecks(...)` now emits:

- `sourceMatrixConsumptionPlanHasNoBlockedSteps`.

It is true when `stepStatusSummary.blockedStepCount` is zero.

## Blocker

`collectProductionBlockers(...)` now emits:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_BLOCKED_STEPS`.

## Behavior

Ready previews now pass 25 checks. Blocked previews include the new plan-step blocker when applicable.

## Cross-project status

Java and mini-kv can continue in parallel. v646 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused preview test passed: 1 file, 2 tests.
- Build passed.
