# v654 Source matrix consumption plan risk gate

## Purpose

v654 makes the v653 risk summary a readiness input.

The controlled read-only shard preview now accepts consumption-plan risk only when the plan is not blocked and not unsafe. A `review` risk remains acceptable because it represents read-only drift review, not routing activation or writes.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts`.

The new readiness check is:

- `sourceMatrixConsumptionPlanRiskAccepted`.

The new blocker is:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_RISK_BLOCKED`.

## Growth control

This version does not add a new route, artifact chain, approval workflow, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: v653 risk summary would otherwise be rendered but not enforced;
- later consumer: future plan consumption can trust the top-level checks rather than re-reading risk internals;
- reuse decision: this consumes the existing `riskSummary` instead of adding another evidence surface;
- stop condition: readiness now accepts `none` and `review` risk while blocking `blocked` and `unsafe`.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v654 consumes no fresh sibling evidence, starts no sibling services, and does not block Java or mini-kv progress.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 4 files, 6 tests.
- Typecheck passed.

