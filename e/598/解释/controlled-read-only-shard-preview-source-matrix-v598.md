# v598 Controlled read-only shard preview source matrix

## Purpose

v598 is feature version 1 of the requested 20-version feature run after the v582-v597 maintenance/refactor sequence.

Node v581 introduced a controlled read-only Java/mini-kv shard preview. That preview already exposed each upstream observation, but consumers still had to compare Java and mini-kv fields by hand.

v598 adds a structured `preview.sourceMatrix` so later Node versions can consume the preview as a compact cross-source matrix without activating routing, credentials, writes, managed audit execution, or service start/stop behavior.

## Change

Added `ControlledReadOnlyShardPreviewSourceMatrix` and `ControlledReadOnlyShardPreviewSourceMatrixEntry`.

The matrix records:

- per-source project, version, status, readiness, read-only safety, execution block, shard count, slot count, routing mode, endpoint or command, and latency;
- source totals for ready, failed, and skipped observations;
- routing modes seen across sources;
- Java/mini-kv shard and slot count deltas when both sides are comparable;
- a single `allSourcesReady` boolean for future read-only consumers.

The Markdown renderer now includes a `## Source Matrix` section under the preview route.

## Growth control

This version does not add a new approval rule, route family, archival verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: later source-matrix consumers need stable source comparison fields instead of repeatedly reading nested Java and mini-kv observations;
- later consumer: Node v599 can build a read-only source-matrix consumer/report from this field;
- reuse decision: the existing preview route is reused, and the matrix is an additive field inside its existing profile;
- stop condition: do not add another matrix layer unless a later consumer needs a different aggregation shape that cannot be represented by `preview.sourceMatrix`.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v598 consumes the existing read-only shard readiness surfaces and requires no fresh Java or mini-kv release evidence. It does not make Node a pre-approval blocker for either sibling project.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/catalog tests passed: 5 files, 8 tests.
- Build passed.

CI note:

- Per current batching rule, v598 is intended to be pushed with the next 4-5 feature versions instead of running CI after every single local version.
