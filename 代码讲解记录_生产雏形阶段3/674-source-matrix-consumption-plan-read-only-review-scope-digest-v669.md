# Node v669 code walkthrough: source matrix consumption plan read-only review scope digest

## Goal

v669 makes the read-only review operation boundary digestible.

## Type contract

`readOnlyReviewScope.scopeDigest` includes:

- `algorithm`;
- `scope`;
- `value`;
- covered allowed operation count;
- covered forbidden operation count.

## Builder logic

`createReadOnlyReviewScope(...)` computes a SHA-256 stable JSON digest over:

- scope state;
- allowed operations;
- forbidden operations.

## Renderer

Markdown now renders the digest value, scope, and covered counts.

## Cross-project status

Java and mini-kv can continue in parallel. v669 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

