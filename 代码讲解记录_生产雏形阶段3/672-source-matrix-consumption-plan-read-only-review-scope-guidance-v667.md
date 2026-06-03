# Node v667 code walkthrough: source matrix consumption plan read-only review scope guidance

## Goal

v667 moves read-only review scope into compact guidance.

## Formatting

`formatReadOnlyReviewScope(...)` renders:

- scope state;
- allowed operations;
- forbidden operations.

## Recommendations

Ready and blocked recommendations now include `reviewScope` after safety, risk, and promotion hold summaries.

## Next actions

Ready next actions limit work to read-only scope.

Blocked next actions limit repair work to the blocked read-only review scope.

## Cross-project status

Java and mini-kv can continue in parallel. v667 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

