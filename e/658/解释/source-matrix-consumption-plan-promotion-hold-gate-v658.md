# v658 Source matrix consumption plan promotion hold gate

## Purpose

v658 makes the v657 promotion hold enforceable in readiness checks.

If a future runtime plan claims routing promotion, write promotion, or service startup is allowed, Node now blocks the controlled read-only shard preview.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- focused profile and checks tests.

The new readiness check is:

- `sourceMatrixConsumptionPlanPromotionHoldSafe`.

The new blocker is:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_PROMOTION_HOLD_UNSAFE`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: v657 made promotion hold visible but not part of the readiness checks;
- later consumer: read-only preview consumers can trust top-level checks to catch promotion leakage;
- reuse decision: this consumes the existing `promotionHold` instead of creating a new report;
- stop condition: the gate only verifies the three promotion-denial flags.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v658 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

