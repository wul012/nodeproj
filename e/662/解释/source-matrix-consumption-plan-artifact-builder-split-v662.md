# v662 Source matrix consumption plan artifact builder split

## Purpose

v662 splits the source matrix consumption plan builder out of the source matrix flow artifact module.

`SourceMatrixFlowArtifacts` had started carrying consumer, drift, consumption plan, risk, promotion hold, and closure criteria logic in one file. This split keeps future plan changes localized.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanArtifacts.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts`.

Moved:

- `createSourceMatrixConsumptionPlan`;
- consumption plan step builder;
- risk summary builder;
- promotion hold builder;
- promotion hold closure criteria builder.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: the source matrix flow builder had grown to 334 lines and mixed multiple responsibilities;
- later consumer: upcoming consumption-plan changes can stay in a dedicated module;
- reuse decision: the existing review-artifacts barrel still exports the same public function;
- stop condition: source matrix flow now owns consumer and drift only, while consumption-plan construction owns plan details.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v662 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.
- `SourceMatrixFlowArtifacts` reduced from 334 lines to 148 lines.

