# Node v668 code walkthrough: controlled read-only shard preview guidance formatter split

## Goal

v668 separates guidance formatting from readiness policy.

## New module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.ts` exports:

- `formatPlanStepRecordSummary`;
- `formatPlanSafetySummary`;
- `formatPlanRiskSummary`;
- `formatPlanPromotionHold`;
- `formatReadOnlyReviewScope`.

## Checks module after split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts` imports the formatters and continues to own:

- checks;
- blockers;
- warnings;
- recommendations;
- next actions.

## Behavior

No behavior changes in v668. Existing tests lock the recommendation and next-action strings.

## Cross-project status

Java and mini-kv can continue in parallel. v668 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.
- Checks module reduced to 158 lines.

