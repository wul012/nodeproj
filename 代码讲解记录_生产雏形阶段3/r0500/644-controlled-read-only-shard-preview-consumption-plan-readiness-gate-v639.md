# Node v639 code walkthrough: controlled read-only shard preview consumption plan readiness gate

## Goal

v639 makes the v638 source matrix consumption plan part of controlled read-only shard preview readiness.

## Checks

`createChecks(...)` now receives `sourceMatrixConsumptionPlan` and emits:

- `sourceMatrixConsumptionPlanReady`.

The existing ready calculation already checks every field except `readyForControlledReadOnlyShardPreview`, so this new check is automatically included in the top-level ready flag.

## Blocker

`collectProductionBlockers(...)` now emits:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_BLOCKED`.

This keeps blocked plan states fail-closed.

## Behavior

Ready previews now pass 24 checks instead of 23.

Blocked previews include the plan blocker when probes are disabled and the plan cannot be consumed.

## Cross-project status

Java and mini-kv can continue in parallel. v639 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused preview/route tests passed: 2 files, 3 tests.
- Build passed.
