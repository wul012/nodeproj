# Node v626 code walkthrough: controlled read-only shard preview handoff route coverage archive summary receipt archive snapshot

## Goal

v626 archives the v625 archive summary receipt into a compact snapshot.

## Builder

`createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot(...)` consumes the receipt and records:

- receipt digest value;
- snapshot digest;
- archived sections;
- receipt and summary line counts;
- blocked reason count;
- raw credential/runtime payload exclusion flags;
- false safety boundary flags.

## Loader and renderer

The preview loader attaches `sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot` after the summary receipt.

The Markdown renderer adds `## Source Matrix Handoff Route Coverage Archive Summary Receipt Archive Snapshot`.

## Tests

The handoff artifact test covers ready, blocked, and stable snapshot digest output.

The main preview and route tests verify:

- active/source versions `Node v626` and `Node v625`;
- ready snapshot state in the mock read-only service path;
- blocked snapshot state when upstream probes are disabled;
- Markdown section visibility.

## Cross-project status

Java and mini-kv can continue in parallel. v626 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 16 tests.
- Build passed.
