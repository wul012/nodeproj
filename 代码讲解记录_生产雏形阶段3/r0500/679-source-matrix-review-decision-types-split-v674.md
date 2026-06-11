# Node v674 code walkthrough: source matrix review decision types split

## Goal

v674 makes source matrix review decision type maintenance local.

## New type module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionTypes.ts` owns:

- review checklist item;
- review checklist;
- review digest.

## Re-export behavior

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` imports and re-exports these types so existing service imports remain stable.

The digest type now derives its input checklist version from the checklist type, and the checklist derives its input drift summary version from the drift summary type.

## Behavior

No runtime behavior changes in v674.

## Cross-project status

Java and mini-kv can continue in parallel. v674 consumes no fresh sibling evidence and starts no sibling services.

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
- Main controlled preview types file reduced from 739 lines to 703 lines.
- New review decision types file is 48 lines.
