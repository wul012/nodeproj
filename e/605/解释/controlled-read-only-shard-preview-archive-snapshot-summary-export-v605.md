# v605 Controlled read-only shard preview archive snapshot summary export

## Purpose

v605 is feature version 8 of the requested 20-version feature run.

v603 added an archive snapshot and v604 split review artifact coverage. v605 adds a compact summary export for the snapshot so later reports can consume a short deterministic summary without re-reading the full review artifact chain.

## Change

Added `preview.sourceMatrixArchiveSnapshotSummaryExport`.

The export records:

- export and input archive snapshot versions;
- export state;
- summary export readiness;
- digest value;
- five summary lines;
- archived section and blocked item counts;
- safety flags showing no raw credential, runtime payload, routing activation, fresh sibling evidence, service start, or sibling mutation.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: later report/export work needs a compact stable summary instead of parsing the full snapshot;
- later consumer: Node v606 can add focused coverage for summary export behavior;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: keep this as a summary field until a future version explicitly writes archive files.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v605 consumes Node v604/v603 local outputs and requires no fresh sibling evidence. It does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 10 tests.
- Build passed.

CI note:

- v605 remains local for the current v603-v607 batch.
