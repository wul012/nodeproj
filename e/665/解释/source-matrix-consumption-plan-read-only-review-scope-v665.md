# v665 Source matrix consumption plan read-only review scope

## Purpose

v665 adds `readOnlyReviewScope` to the source matrix consumption plan.

The plan now states which operations are allowed during read-only review and which operations remain forbidden.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanArtifacts.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.ts`;
- focused consumption-plan and route tests.

The new scope includes:

- `scopeState`;
- `allowedOperations`;
- `forbiddenOperations`;
- `allowedOperationCount`;
- `forbiddenOperationCount`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: promotion hold described the boundary, but not the exact read-only review operation scope;
- later consumer: review tooling can distinguish allowed review operations from forbidden routing/write/startup operations;
- reuse decision: the scope is derived from existing risk state;
- stop condition: scope is embedded in the existing consumption plan and creates no execution path.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v665 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

