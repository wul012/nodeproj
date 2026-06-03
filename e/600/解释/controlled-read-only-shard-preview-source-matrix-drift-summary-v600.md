# v600 Controlled read-only shard preview source matrix drift summary

## Purpose

v600 is feature version 3 of the requested 20-version feature run.

v598 normalized Java and mini-kv shard readiness into `preview.sourceMatrix`. v599 added a consumer report. v600 adds a controlled drift summary so operators and later Node versions can see which source dimensions differ without activating routing or treating prototype differences as production approval.

## Change

Added `preview.sourceMatrixDriftSummary`.

The drift summary includes:

- summary and input consumer versions;
- drift state;
- readiness for controlled drift review;
- finding, drift, blocker, and comparable finding counts;
- drift findings for routing mode, shard count, and slot count;
- fail-closed consumer readiness finding when the source-matrix consumer is blocked;
- explicit safety flags showing no routing activation, fresh sibling evidence, service start, or sibling mutation is required.

In the current ready fixture path, the summary reports controlled drift across routing mode, shard count, and slot count. These are warnings for read-only review, not production blockers.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: source-matrix consumers need a stable drift explanation instead of manual comparison in later versions;
- later consumer: Node v601 can use the summary to generate a review checklist;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: keep future work as checklist/report consumption unless a real routing activation version is explicitly opened.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v600 consumes Node v599 output and existing read-only source surfaces. It does not require fresh Java or mini-kv release evidence and is not a sibling pre-approval blocker.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/catalog tests passed: 5 files, 8 tests.
- Build passed.

CI note:

- v600 remains local for the planned v598-v602 batch push and CI run.
