# Node v677 code walkthrough: source matrix handoff consumer types split

## Goal

v677 makes source matrix handoff consumer contract maintenance local.

## New type module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffConsumerTypes.ts` owns:

- handoff summary consumer gates;
- handoff summary consumer;
- handoff summary consumer export;
- handoff summary consumer receipt.

## Re-export behavior

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` imports and re-exports these types so existing service imports remain stable.

The consumer derives its input version and summary digest scope from the handoff summary type; the export and receipt derive their input versions from the previous type in the chain.

## Behavior

No runtime behavior changes in v677.

## Cross-project status

Java and mini-kv can continue in parallel. v677 consumes no fresh sibling evidence and starts no sibling services.

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
- Main controlled preview types file reduced from 629 lines to 565 lines.
- New handoff consumer types file is 78 lines.
