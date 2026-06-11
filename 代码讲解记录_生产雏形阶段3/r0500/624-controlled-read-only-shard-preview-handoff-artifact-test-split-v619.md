# Node v619 code walkthrough: controlled read-only shard preview handoff artifact test split

## Goal

v619 splits the handoff artifact tests out of the base review artifact test.

## Test structure

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts` now covers:

- source matrix consumer;
- drift summary;
- review checklist;
- review digest;
- archive snapshot;
- summary export;
- handoff notes.

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts` covers:

- handoff summary;
- handoff summary consumer;
- consumer export;
- consumer receipt;
- receipt archive snapshot;
- archive verification;
- stability checks.

Shared ready/blocked source matrices live in `test/support/controlledReadOnlyShardPreviewReviewArtifactFixtures.ts`.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 12 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v619 consumes no fresh sibling evidence.
