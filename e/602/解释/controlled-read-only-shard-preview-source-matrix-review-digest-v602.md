# v602 Controlled read-only shard preview source matrix review digest

## Purpose

v602 is feature version 5 of the requested 20-version feature run and closes the first v598-v602 batch.

v601 created a controlled review checklist. v602 adds a deterministic digest over that checklist so the route output can be compared across local runs and CI without adding a new verifier, approval chain, or route.

## Change

Added `preview.sourceMatrixReviewDigest`.

The digest covers:

- checklist version;
- checklist state;
- operator review readiness;
- item counts;
- checklist item order, check id, status, severity, evidence, and routing activation flag;
- safety boundaries.

The digest reports:

- digest and input checklist versions;
- algorithm and sha256 value;
- covered fields;
- archive readiness;
- checklist state and blocked item count;
- safety flags showing no approval, routing activation, fresh sibling evidence, service start, or sibling mutation is required.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: the first source-matrix feature batch needs a stable digest for route-output comparison;
- later consumer: Node v603 can archive or snapshot the digest without re-computing checklist material externally;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: the digest should remain the batch anchor until a future version introduces a materially different review artifact.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v602 consumes Node v601 checklist output and requires no fresh Java or mini-kv evidence. It does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/catalog tests passed: 5 files, 8 tests.
- Build passed.

CI note:

- v602 closes the v598-v602 local batch. Push commits and tags together, then verify GitHub `Node Evidence` once for the batch.
