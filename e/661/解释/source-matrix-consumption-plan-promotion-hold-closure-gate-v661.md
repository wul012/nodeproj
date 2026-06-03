# v661 Source matrix consumption plan promotion hold closure gate

## Purpose

v661 makes promotion hold closure criteria enforceable.

The controlled read-only shard preview now blocks if closure criteria are missing, count-mismatched, or missing promotion-denial criteria.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- focused profile and checks tests.

The new readiness check is:

- `sourceMatrixConsumptionPlanPromotionHoldClosureReady`.

The new blocker is:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_PROMOTION_HOLD_CLOSURE_NOT_READY`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: v660 closure criteria were visible but not enforced;
- later consumer: read-only review can trust readiness checks to catch incomplete hold closure criteria;
- reuse decision: this consumes existing `promotionHold.closureCriteria`;
- stop condition: the gate only validates non-empty criteria, count consistency, and the three promotion denial criteria.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v661 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

