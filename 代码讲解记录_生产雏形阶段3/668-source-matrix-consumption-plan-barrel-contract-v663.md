# Node v663 code walkthrough: source matrix consumption plan barrel contract

## Goal

v663 keeps the review artifact barrel contract aligned with the v662 split.

## Contract update

The barrel test now imports:

- `ConsumptionPlanArtifacts`;
- `SourceMatrixFlowArtifacts`.

It asserts:

- `createSourceMatrixConsumptionPlan` comes from `ConsumptionPlanArtifacts`;
- consumer and drift summary builders still come from `SourceMatrixFlowArtifacts`.

## Behavior

No production behavior changes in v663.

## Cross-project status

Java and mini-kv can continue in parallel. v663 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

