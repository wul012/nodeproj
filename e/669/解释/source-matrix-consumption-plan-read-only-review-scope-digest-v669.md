# v669 Source matrix consumption plan read-only review scope digest

## Purpose

v669 adds a stable digest to `readOnlyReviewScope`.

The allowed and forbidden operation boundaries are now hashable evidence inside the existing consumption plan.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanArtifacts.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.ts`;
- focused consumption-plan and route tests.

The new scope digest includes:

- algorithm;
- scope;
- value;
- covered allowed operation count;
- covered forbidden operation count.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: read-only review scope had no stable digest for later validation;
- later consumer: readiness gates and guidance can reference scope evidence without recomputing operation boundaries;
- reuse decision: the digest is embedded inside existing `readOnlyReviewScope`;
- stop condition: only the existing scope state and operation arrays are covered.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v669 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

