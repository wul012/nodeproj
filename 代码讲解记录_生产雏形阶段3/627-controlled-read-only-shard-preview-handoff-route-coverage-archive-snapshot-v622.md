# Node v622 code walkthrough: controlled read-only shard preview handoff route coverage archive snapshot

## Goal

v622 archives the v621 handoff route coverage verification into a compact snapshot.

## Builder

`createSourceMatrixHandoffRouteCoverageArchiveSnapshot(...)` consumes route coverage verification and records:

- coverage digest value;
- snapshot digest;
- archived sections;
- verification gate counts;
- safety boundaries.

## Renderer and tests

The Markdown renderer adds `## Source Matrix Handoff Route Coverage Archive Snapshot`.

The handoff artifact test checks ready and blocked snapshots. The main preview and route tests verify the v622/v621 profile chain and Markdown section.

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

Java and mini-kv can continue in parallel. v622 consumes no fresh sibling evidence.
