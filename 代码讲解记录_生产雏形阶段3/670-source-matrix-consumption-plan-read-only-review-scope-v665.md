# Node v665 code walkthrough: source matrix consumption plan read-only review scope

## Goal

v665 defines what the read-only review phase may and may not do.

## Builder logic

`createReadOnlyReviewScope(...)` derives scope state from `riskSummary`.

Blocked plans allow only repair and closure review.

Review-ready plans allow:

- consuming plan step records;
- reviewing risk summary;
- verifying promotion hold closure.

All scopes forbid:

- activating shard routing;
- enabling write routing;
- starting sibling services;
- mutating sibling state.

## Renderer

Markdown now shows scope state, allowed operations, forbidden operations, and operation counts.

## Cross-project status

Java and mini-kv can continue in parallel. v665 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

