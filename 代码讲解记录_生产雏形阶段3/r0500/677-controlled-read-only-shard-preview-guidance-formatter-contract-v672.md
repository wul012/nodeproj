# Node v672 code walkthrough: controlled read-only shard preview guidance formatter contract

## Goal

v672 gives guidance formatter output direct contract coverage.

## Test coverage

The new formatter test loads ready and blocked profiles through existing fixtures, then asserts:

- step record summary text;
- safety summary text;
- risk summary text;
- promotion hold summary text;
- read-only review scope summary text;
- scope digest coverage text.

## Behavior

No production behavior changes in v672.

## Cross-project status

Java and mini-kv can continue in parallel. v672 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 7 files, 15 tests.
- Typecheck passed.

