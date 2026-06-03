# Node v682 code walkthrough: source matrix route coverage archive receipt types split

## Goal

v682 makes source matrix handoff route coverage archive receipt verification type maintenance local.

## New type module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveReceiptTypes.ts` owns:

- handoff route coverage archive summary receipt archive snapshot;
- handoff route coverage archive summary receipt archive verification gates;
- handoff route coverage archive summary receipt archive verification.

## Re-export behavior

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` imports and re-exports these types so existing service imports remain stable.

The archive snapshot input version derives from the route coverage archive summary receipt type, and the archive verification input version derives from the archive snapshot type.

## Behavior

No runtime behavior changes in v682.

## Cross-project status

Java and mini-kv can continue in parallel. v682 consumes no fresh sibling evidence and starts no sibling services.

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
- Main controlled preview types file reduced from 401 lines to 355 lines.
- New route coverage archive receipt types file is 60 lines.
