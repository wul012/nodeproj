# Node v605 code walkthrough: controlled read-only shard preview archive snapshot summary export

## Goal

v605 adds a compact summary export for the v603 archive snapshot.

The export is designed for later reporting and archive comparison. It is still read-only and does not write archive files.

## Builder

`createSourceMatrixArchiveSnapshotSummaryExport(snapshot)` lives in the review artifacts module.

It creates five stable summary lines:

- archive state;
- digest value;
- archived section count;
- blocked item count;
- routing activation flag.

## Profile and renderer

The loader attaches `preview.sourceMatrixArchiveSnapshotSummaryExport`.

The Markdown renderer includes `## Source Matrix Archive Snapshot Summary Export`.

## Tests

The review artifacts test now asserts ready and blocked summary export behavior.

The main preview test asserts the export is present and uses the same digest value as the review digest. The route group test checks Markdown registration.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 10 tests.
- Build passed.

## Safety

No route, approval, routing activation, fresh sibling evidence, service start, sibling mutation, or credential read was added.
