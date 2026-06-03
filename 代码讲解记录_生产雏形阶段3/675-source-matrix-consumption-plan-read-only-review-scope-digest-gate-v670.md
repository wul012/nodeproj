# Node v670 code walkthrough: source matrix consumption plan read-only review scope digest gate

## Goal

v670 validates read-only review scope digest evidence.

## Check contract

`sourceMatrixConsumptionPlanReadOnlyReviewScopeDigestStable` requires:

- digest value matches SHA-256 hex shape;
- digest scope is `read-only-review-scope`;
- covered allowed operation count matches actual allowed operations;
- covered forbidden operation count matches actual forbidden operations.

## Blocker mapping

Failed digest stability maps to:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_REVIEW_SCOPE_DIGEST_UNSTABLE`.

## Cross-project status

Java and mini-kv can continue in parallel. v670 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

