# Node v634 code walkthrough: controlled read-only shard preview archive handoff artifact builder split

## Goal

v634 separates source matrix archive/handoff construction from the source matrix review builder.

## Split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveHandoffArtifacts.ts` now owns:

- source matrix archive snapshot;
- archive snapshot summary export;
- read-only handoff notes.

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` now focuses on:

- source matrix consumer;
- drift summary;
- review checklist;
- review digest.

It re-exports the moved functions so existing import sites continue to work.

## Behavior

This is a production organization refactor:

- artifact versions are unchanged;
- digest scopes are unchanged;
- archive section lists are unchanged;
- handoff messages are unchanged;
- downstream tests keep using the existing public module surface.

## Cross-project status

Java and mini-kv can continue in parallel. v634 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifactStability.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused source matrix / handoff artifact tests passed: 3 files, 11 tests.
- Build passed.
