# Node v606 code walkthrough: controlled read-only shard preview summary export digest

## Goal

v606 makes the v605 summary export independently digestible.

The full review digest still exists. The new summary digest is smaller and covers only the export version, input snapshot version, and five summary lines.

## Code

`createSourceMatrixArchiveSnapshotSummaryExport(...)` now fills:

- `summaryDigest.algorithm`;
- `summaryDigest.value`;
- `summaryDigest.coveredLineCount`.

It uses the existing `sha256StableJson(...)` helper.

## Tests

The review artifacts test asserts the summary digest in both ready and blocked paths.

The main preview test asserts the digest shape and Markdown renders the covered line count.

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
