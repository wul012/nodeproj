# v604 Controlled read-only shard preview review artifacts test split

## Purpose

v604 is feature version 7 of the requested 20-version feature run.

v603 moved source-matrix review artifact builders into a dedicated module. v604 adds focused coverage for that module and narrows the main route/profile test so it remains an integration test instead of carrying every builder assertion.

## Change

Added `test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts`.

The new test covers:

- ready source-matrix consumer;
- ready controlled drift summary;
- ready review checklist;
- ready review digest;
- ready archive snapshot;
- fail-closed consumer, drift summary, checklist, digest, and snapshot.

The main preview test now keeps only route/profile integration assertions for the review artifacts.

The profile active/source/next version chain is now:

- active: `Node v604`;
- source: `Node v603`;
- next: `Node v605`.

## Maintainability

The main preview test dropped from about 679 lines to about 481 lines. The focused review artifacts test is about 266 lines and owns the detailed builder contract.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: review artifact assertions were making the main integration test too broad;
- later consumer: Node v605 can add summary exports without further bloating the main preview test;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: detailed builder assertions stay in the focused review artifacts test.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v604 is Node-only test coverage and profile version bookkeeping. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 10 tests.
- Build passed.

CI note:

- v604 remains local for the current v603-v607 batch.
