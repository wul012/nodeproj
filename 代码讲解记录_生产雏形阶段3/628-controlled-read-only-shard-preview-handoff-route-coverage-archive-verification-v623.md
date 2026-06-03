# Node v623 code walkthrough: controlled read-only shard preview handoff route coverage archive verification

## Goal

v623 verifies the v622 handoff route coverage archive snapshot.

## Builder

`createSourceMatrixHandoffRouteCoverageArchiveVerification(...)` consumes the v622 snapshot and evaluates seven gates:

- snapshot readiness;
- digest presence;
- archived section completeness;
- preserved verification gate counts;
- routing activation disabled;
- fresh sibling evidence not required;
- read-only verification mode.

The ready path reports `ready-for-read-only-handoff-route-coverage-archive-verification`. The blocked path keeps digest and archive metadata while reporting blocked reason codes.

## Loader and renderer

The preview loader attaches `sourceMatrixHandoffRouteCoverageArchiveVerification` after the v622 snapshot.

The Markdown renderer adds `## Source Matrix Handoff Route Coverage Archive Verification` and a gate subsection so route snapshots expose the same state as JSON.

## Tests

The handoff artifact test checks ready, blocked, and stable verification output.

The main preview and route tests verify:

- active/source versions `Node v623` and `Node v622`;
- ready archive verification in the mock read-only service path;
- blocked archive verification when upstream probes are disabled;
- Markdown section visibility.

## Cross-project status

Java and mini-kv can continue in parallel. v623 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 13 tests.
- Build passed.
