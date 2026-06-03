# Node v627 code walkthrough: controlled read-only shard preview handoff route coverage archive summary receipt archive verification

## Goal

v627 verifies the v626 route coverage archive summary receipt snapshot.

## Builder

`createSourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification(...)` consumes the v626 snapshot and evaluates eight gates:

- snapshot readiness;
- digest presence;
- archived section completeness;
- raw credential exclusion;
- runtime payload exclusion;
- routing activation disabled;
- fresh sibling evidence not required;
- read-only verification mode.

The ready path reports `ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification`. The blocked path keeps snapshot metadata while reporting blocked reason codes.

## Loader and renderer

The preview loader attaches `sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification` after the v626 snapshot.

The Markdown renderer adds `## Source Matrix Handoff Route Coverage Archive Summary Receipt Archive Verification` and a gate subsection.

## Tests

The handoff artifact test covers ready, blocked, and stable verification output.

The main preview and route tests verify:

- active/source versions `Node v627` and `Node v626`;
- ready archive verification in the mock read-only service path;
- blocked archive verification when upstream probes are disabled;
- Markdown section visibility.

## Cross-project status

Java and mini-kv can continue in parallel. v627 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 17 tests.
- Build passed.
