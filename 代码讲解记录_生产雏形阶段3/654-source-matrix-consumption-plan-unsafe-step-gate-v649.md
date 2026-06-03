# Node v649 code walkthrough: source matrix consumption plan unsafe step gate

## Goal

v649 makes the source matrix consumption plan safety summary enforceable.

## Type contract

`ControlledReadOnlyShardPreviewChecks` now includes:

- `sourceMatrixConsumptionPlanHasNoUnsafeSteps`.

This keeps the JSON profile explicit: readers can see whether plan safety was checked, not only infer it from counts.

## Support logic

`createChecks(...)` sets the new check to true only when:

- `stepSafetySummary.routingActivationAllowedStepCount === 0`;
- `stepSafetySummary.writesAllowedStepCount === 0`.

`collectProductionBlockers(...)` maps a failed check to:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_UNSAFE_STEPS`.

## Tests

The ready-path profile test now expects:

- 26 checks;
- 26 passed checks;
- `sourceMatrixConsumptionPlanHasNoUnsafeSteps: true`.

The disabled-probe path still reports the blocked-plan blockers, but not the unsafe-step blocker, because the fallback blocked plan remains read-only and write-disabled.

## Cross-project status

Java and mini-kv can continue in parallel. v649 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 3 files, 4 tests.
- Typecheck passed.

