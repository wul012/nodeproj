# Node v664 code walkthrough: source matrix consumption plan promotion hold closure guidance

## Goal

v664 adds closure criterion count to compact promotion hold guidance.

## Change

`formatPlanPromotionHold(...)` now includes:

- `closureCriterionCount`.

## Behavior

Recommendations and next actions now show whether the promotion hold has a closure checklist size without requiring readers to scan the full Markdown criteria list.

## Cross-project status

Java and mini-kv can continue in parallel. v664 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

