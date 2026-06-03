# Node v681 code walkthrough: source matrix route coverage archive summary types split

## Goal

v681 makes source matrix handoff route coverage archive summary type maintenance local.

## New type module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveSummaryTypes.ts` owns:

- handoff route coverage archive summary;
- handoff route coverage archive summary receipt.

## Re-export behavior

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` imports and re-exports these types so existing service imports remain stable.

The archive summary input version derives from the route coverage archive verification type, and the summary receipt input version derives from the summary type.

## Behavior

No runtime behavior changes in v681.

## Cross-project status

Java and mini-kv can continue in parallel. v681 consumes no fresh sibling evidence and starts no sibling services.

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
- Main controlled preview types file reduced from 445 lines to 401 lines.
- New route coverage archive summary types file is 55 lines.
