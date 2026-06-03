# v607 Controlled read-only shard preview summary export digest scope

## Purpose

v607 is feature version 10 of the requested 20-version feature run and closes the v603-v607 local batch.

v606 added a digest for summary export lines. v607 labels that digest with an explicit scope and adds stability coverage so the digest contract is easier to read and harder to accidentally repurpose.

## Change

Added `summaryDigest.scope = "archive-snapshot-summary-lines"` to `preview.sourceMatrixArchiveSnapshotSummaryExport`.

Added a focused test that builds the same archive snapshot summary export twice and verifies the summary digest is stable.

The profile active/source/next chain is now:

- active: `Node v607`;
- source: `Node v606`;
- next: `Node v608`.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: the summary digest needed a named material scope before becoming a batch anchor;
- later consumer: Node v608 can add handoff notes without redefining digest material;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: digest scope stays fixed unless summary material changes.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v607 consumes Node v606 output and requires no fresh sibling evidence. It does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 11 tests.
- Build passed.

CI note:

- v607 closes the v603-v607 local batch. Push commits and tags together, then verify GitHub `Node Evidence` once for the batch.
