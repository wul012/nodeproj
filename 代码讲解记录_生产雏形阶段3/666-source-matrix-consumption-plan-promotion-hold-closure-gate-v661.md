# Node v661 code walkthrough: source matrix consumption plan promotion hold closure gate

## Goal

v661 verifies promotion hold closure criteria before the preview can be ready.

## Check contract

`sourceMatrixConsumptionPlanPromotionHoldClosureReady` passes only when:

- closure count equals closure criteria length;
- closure criteria are non-empty;
- criteria include routing promotion denial;
- criteria include write promotion denial;
- criteria include service startup denial.

## Blocker mapping

Failed closure readiness maps to:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_PROMOTION_HOLD_CLOSURE_NOT_READY`.

## Test behavior

The checks contract test pollutes the runtime plan with empty closure criteria and confirms the blocker is emitted.

## Cross-project status

Java and mini-kv can continue in parallel. v661 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

