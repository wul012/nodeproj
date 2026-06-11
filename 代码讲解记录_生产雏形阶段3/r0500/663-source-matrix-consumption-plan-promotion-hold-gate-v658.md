# Node v658 code walkthrough: source matrix consumption plan promotion hold gate

## Goal

v658 turns `promotionHold` into a readiness gate.

## Check contract

`sourceMatrixConsumptionPlanPromotionHoldSafe` passes only when:

- `routingPromotionAllowed === false`;
- `writePromotionAllowed === false`;
- `serviceStartupAllowed === false`.

## Blocker mapping

Failed promotion hold safety maps to:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_PROMOTION_HOLD_UNSAFE`.

## Runtime pollution test

The checks contract test casts a polluted runtime plan with all three promotion flags set to true. This verifies the gate catches non-type-safe inputs, not only TypeScript literals.

## Cross-project status

Java and mini-kv can continue in parallel. v658 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

