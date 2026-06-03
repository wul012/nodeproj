# v606 Controlled read-only shard preview summary export digest

## Purpose

v606 is feature version 9 of the requested 20-version feature run.

v605 added a compact archive snapshot summary export. v606 adds a sha256 digest for the summary lines so the export can be compared independently from the larger review digest.

## Change

Added `summaryDigest` to `preview.sourceMatrixArchiveSnapshotSummaryExport`.

The digest records:

- algorithm: `sha256`;
- value;
- covered line count.

The digest material covers the export version, input archive snapshot version, and summary lines.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: summary exports need a compact stability check separate from the full review digest;
- later consumer: Node v607 can add stability coverage around the summary export digest;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: do not add another digest unless new summary material is introduced.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v606 consumes Node v605 output and requires no fresh sibling evidence. It does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 10 tests.
- Build passed.

CI note:

- v606 remains local for the current v603-v607 batch.
