# Node v603 code walkthrough: controlled read-only shard preview source matrix archive snapshot

## Goal

v603 adds an archive snapshot for the source-matrix review chain and trims the support module back down.

The snapshot is descriptive only. It does not write files, approve work, activate routing, or start sibling services.

## New module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` now owns:

- `createSourceMatrixConsumer`;
- `createSourceMatrixDriftSummary`;
- `createSourceMatrixReviewChecklist`;
- `createSourceMatrixReviewDigest`;
- `createSourceMatrixArchiveSnapshot`.

The original support module keeps the lower-level preview observation and source-matrix construction helpers.

## Snapshot

`createSourceMatrixArchiveSnapshot(reviewDigest)` creates `preview.sourceMatrixArchiveSnapshot`.

The snapshot records:

- digest value;
- archived section list;
- archive readiness;
- checklist state and blocked item count;
- safety boundaries.

## Tests

The main preview test asserts both ready and blocked snapshot states. The route group test verifies that Markdown includes the archive snapshot section.

## Safety

v603 remains read-only:

- no new route;
- no archive file writes;
- no approval requirement;
- no routing activation;
- no fresh sibling evidence requirement;
- no service start/stop;
- no sibling mutation;
- no credential value read.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/catalog tests passed: 5 files, 8 tests.
- Build passed.

## Maintainability

The support module dropped from about 610 lines to about 342 lines. The review artifact builder module is now about 303 lines and isolated from upstream read logic.
