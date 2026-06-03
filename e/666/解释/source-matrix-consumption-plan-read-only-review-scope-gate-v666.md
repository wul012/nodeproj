# v666 Source matrix consumption plan read-only review scope gate

## Purpose

v666 makes `readOnlyReviewScope` enforceable in readiness checks.

The scope must have consistent counts, at least one allowed operation, and explicit forbidden operation boundaries for routing, writes, service startup, and sibling mutation.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- focused profile and checks tests.

The new readiness check is:

- `sourceMatrixConsumptionPlanReadOnlyReviewScopeSafe`.

The new blocker is:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_REVIEW_SCOPE_UNSAFE`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: v665 scope was visible but not enforced;
- later consumer: review tooling can trust top-level checks to catch unsafe review operation scopes;
- reuse decision: this consumes existing `readOnlyReviewScope`;
- stop condition: the gate validates only counts and the four forbidden-operation boundaries.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v666 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

