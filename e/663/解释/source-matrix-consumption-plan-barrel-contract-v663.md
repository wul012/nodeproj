# v663 Source matrix consumption plan barrel contract

## Purpose

v663 updates the review artifact barrel contract after the v662 consumption plan builder split.

The barrel still exports `createSourceMatrixConsumptionPlan`, but the source module is now `ConsumptionPlanArtifacts` instead of `SourceMatrixFlowArtifacts`.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts`.

The test now verifies:

- `createSourceMatrixConsumptionPlan` is re-exported from `ConsumptionPlanArtifacts`;
- source matrix consumer and drift summary remain re-exported from `SourceMatrixFlowArtifacts`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: v662 changed module ownership and the barrel test needed to describe the new boundary;
- later consumer: service imports through the barrel remain protected by a focused contract;
- reuse decision: existing barrel test is updated rather than adding another test surface;
- stop condition: the test checks ownership boundaries only.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v663 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

