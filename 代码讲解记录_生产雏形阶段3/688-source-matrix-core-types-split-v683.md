# Node v683 code walkthrough: source matrix core types split

## Goal

v683 makes source matrix core and drift contract maintenance local.

## New type module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixTypes.ts` owns:

- preview project/status/transport aliases;
- source matrix source alias;
- observation preview;
- source matrix entry and matrix;
- source matrix consumer gates, comparison, and consumer;
- source matrix drift dimension, finding, and summary.

## Re-export behavior

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` imports and re-exports these types so existing service imports remain stable.

## Behavior

No runtime behavior changes in v683.

## Cross-project status

Java and mini-kv can continue in parallel. v683 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 7 files, 15 tests.
- Build passed.
- Main controlled preview types file reduced from 355 lines to 274 lines.
- New source matrix types file is 105 lines.
