# Node v625 code walkthrough: controlled read-only shard preview handoff route coverage archive summary receipt

## Goal

v625 turns the v624 archive summary into a receipt with stable receipt lines and a digest.

## Builder

`createSourceMatrixHandoffRouteCoverageArchiveSummaryReceipt(...)` consumes archive summary and emits:

- `receiptState`;
- summary digest value;
- receipt lines;
- `handoff-route-coverage-archive-summary-receipt` digest;
- summary line count;
- gate counts and blocked reason count;
- false safety boundary flags.

## Loader and renderer

The preview loader attaches `sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt` after archive summary.

The Markdown renderer adds `## Source Matrix Handoff Route Coverage Archive Summary Receipt`.

## Tests

The handoff artifact test covers ready, blocked, and stable receipt digest output.

The main preview and route tests verify:

- active/source versions `Node v625` and `Node v624`;
- ready receipt state in the mock read-only service path;
- blocked receipt state when upstream probes are disabled;
- Markdown section visibility.

## Cross-project status

Java and mini-kv can continue in parallel. v625 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 15 tests.
- Build passed.
