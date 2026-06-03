# Node v679 code walkthrough: source matrix route coverage types split

## Goal

v679 makes source matrix handoff route coverage contract maintenance local.

## New type module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageTypes.ts` owns:

- handoff route coverage;
- handoff route coverage verification gates;
- handoff route coverage verification.

## Re-export behavior

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` imports and re-exports these types so existing service imports remain stable.

The route coverage input version derives from the handoff receipt archive verification type, and the route coverage verification input version derives from the route coverage type.

## Behavior

No runtime behavior changes in v679.

## Cross-project status

Java and mini-kv can continue in parallel. v679 consumes no fresh sibling evidence and starts no sibling services.

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
- Main controlled preview types file reduced from 524 lines to 486 lines.
- New route coverage types file is 51 lines.
