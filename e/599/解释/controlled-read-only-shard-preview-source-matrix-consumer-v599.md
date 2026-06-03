# v599 Controlled read-only shard preview source matrix consumer

## Purpose

v599 is feature version 2 of the requested 20-version feature run.

v598 added `preview.sourceMatrix`. v599 consumes that matrix and turns it into a stable read-only consumer report so later versions can decide from one compact shape instead of re-reading nested Java and mini-kv preview objects.

## Change

Added `preview.sourceMatrixConsumer`.

The consumer report includes:

- consumer and input source versions;
- required, observed, and missing sources;
- gate totals and passed gate count;
- consumer gates for required sources, source readiness, shard comparability, slot comparability, routing mode declaration, and read-only consumer-only behavior;
- a comparison summary with routing modes and Java/mini-kv shard and slot deltas;
- blocked reason codes when the matrix cannot be consumed;
- explicit safety flags showing it does not activate routing, start services, or mutate sibling state.

The Markdown route now includes a `## Source Matrix Consumer` section.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: future source-matrix work needs a decision-ready consumer shape rather than ad hoc checks in every version;
- later consumer: Node v600 can add a drift summary from this report;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: consumer gates should remain the stable contract unless a later feature needs a new readiness dimension.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v599 consumes the existing Node v598 matrix and does not require fresh Java or mini-kv release evidence. It is not a pre-approval blocker for sibling projects.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/catalog tests passed: 5 files, 8 tests.
- Build passed.

CI note:

- Per batching rule, v599 remains local until the v598-v602 feature batch is ready to push together.
