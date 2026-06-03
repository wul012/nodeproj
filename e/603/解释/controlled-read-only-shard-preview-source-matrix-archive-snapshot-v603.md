# v603 Controlled read-only shard preview source matrix archive snapshot

## Purpose

v603 is feature version 6 of the requested 20-version feature run.

v602 added a deterministic review digest. v603 adds a controlled archive snapshot over the source-matrix review sections and splits the review artifact builders out of the general support module.

## Change

Added `preview.sourceMatrixArchiveSnapshot`.

The snapshot records:

- snapshot and input review digest versions;
- archive state;
- review digest value;
- archived section names and count;
- checklist state and item counts;
- safety flags showing it includes no raw credential or runtime payload and requires no routing activation, fresh sibling evidence, service start, or sibling mutation.

Refactor included:

- added `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts`;
- moved consumer, drift summary, review checklist, and review digest builders out of the general support module;
- reduced the support module from about 610 lines to about 342 lines.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: the review digest needs a route-level snapshot before later archival coverage can assert the same sections consistently;
- later consumer: Node v604 can split and focus tests around review artifacts and snapshot coverage;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: snapshot fields should remain descriptive until a future version explicitly writes archive files.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v603 consumes Node v602 digest output and requires no fresh Java or mini-kv evidence. It does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/catalog tests passed: 5 files, 8 tests.
- Build passed.

CI note:

- v603 starts the next local batch after v598-v602. Push with the next 4-5 versions.
