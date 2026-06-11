# Node v666 code walkthrough: source matrix consumption plan read-only review scope gate

## Goal

v666 enforces read-only review operation boundaries.

## Check contract

`sourceMatrixConsumptionPlanReadOnlyReviewScopeSafe` requires:

- allowed operation count matches the allowed operation array;
- forbidden operation count matches the forbidden operation array;
- at least one allowed operation exists;
- forbidden operations include shard router activation;
- forbidden operations include write routing;
- forbidden operations include sibling service startup;
- forbidden operations include sibling state mutation.

## Blocker mapping

Failed scope safety maps to:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_REVIEW_SCOPE_UNSAFE`.

## Cross-project status

Java and mini-kv can continue in parallel. v666 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

