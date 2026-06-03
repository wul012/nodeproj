# Node v624 code walkthrough: controlled read-only shard preview handoff route coverage archive summary

## Goal

v624 compresses the v623 archive verification into stable summary lines with a digest.

## Builder

`createSourceMatrixHandoffRouteCoverageArchiveSummary(...)` consumes archive verification and emits:

- `summaryState`;
- snapshot digest value;
- six summary lines;
- `handoff-route-coverage-archive-summary-lines` digest;
- gate counts and blocked reason count;
- false safety boundary flags.

## Loader and renderer

The preview loader attaches `sourceMatrixHandoffRouteCoverageArchiveSummary` after archive verification.

The Markdown renderer adds `## Source Matrix Handoff Route Coverage Archive Summary`.

## Tests

The handoff artifact test covers ready, blocked, and stable summary digest output.

The main preview and route tests verify:

- active/source versions `Node v624` and `Node v623`;
- ready summary state in the mock read-only service path;
- blocked summary state when upstream probes are disabled;
- Markdown section visibility.

## Cross-project status

Java and mini-kv can continue in parallel. v624 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 14 tests.
- Build passed.
