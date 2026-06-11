# Node v671 code walkthrough: source matrix consumption plan read-only review scope digest guidance

## Goal

v671 brings read-only review scope digest coverage into compact guidance.

## Formatter change

`formatReadOnlyReviewScope(...)` now renders:

- scope state;
- allowed operations;
- forbidden operations;
- digest scope;
- covered allowed operation count;
- covered forbidden operation count.

## Behavior

Recommendations and next actions show the digest coverage without changing readiness behavior.

## Cross-project status

Java and mini-kv can continue in parallel. v671 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

