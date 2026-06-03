# Node v602 code walkthrough: controlled read-only shard preview source matrix review digest

## Goal

v602 makes the v601 checklist stable enough for batch comparison.

The digest is deterministic and covers only the checklist fields that should matter for read-only review. It does not create a new route or approval artifact.

## Type model

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` adds `ControlledReadOnlyShardPreviewSourceMatrixReviewDigest`.

The profile now records active Node version `Node v602` and source Node version `Node v601`.

## Builder flow

`createSourceMatrixReviewDigest(checklist)` creates digest material from:

- checklist version;
- checklist state;
- operator review readiness;
- item counts;
- normalized checklist items;
- safety boundaries.

The digest uses the existing `sha256StableJson(...)` helper. No ad hoc serialization was added.

## Renderer

The Markdown renderer now includes `## Source Matrix Review Digest`.

The section shows the digest version, input checklist version, algorithm, value, covered fields, archive readiness, checklist state, and safety boundaries.

## Tests

The main preview test asserts:

- digest metadata and covered fields;
- 64-character sha256 value;
- ready archive state on the successful read-only path;
- blocked archive state when probes are disabled.

The minimal shard readiness route test verifies that Markdown includes the digest section.

## Safety

v602 remains read-only:

- no new route;
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

## Batch closeout

v602 closes the first feature batch after the v582-v597 maintenance run. Push v598-v602 and tags together, then verify one GitHub CI run for the batch.
