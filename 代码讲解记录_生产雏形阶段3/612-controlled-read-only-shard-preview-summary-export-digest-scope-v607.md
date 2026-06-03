# Node v607 code walkthrough: controlled read-only shard preview summary export digest scope

## Goal

v607 names the digest material used by the v606 summary export digest.

The new scope value is `archive-snapshot-summary-lines`.

## Code

`ControlledReadOnlyShardPreviewSourceMatrixArchiveSnapshotSummaryExport.summaryDigest` now includes:

- `algorithm`;
- `scope`;
- `value`;
- `coveredLineCount`.

The builder fills the scope next to the existing sha256 value.

## Tests

The review artifacts test now checks that two exports built from the same snapshot produce the same `summaryDigest`.

The main preview test and Markdown route checks verify the scope is surfaced.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 11 tests.
- Build passed.

## Batch closeout

v607 closes the v603-v607 batch. Push the five commits and tags together and verify one CI run for the batch.
