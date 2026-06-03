# v601 Controlled read-only shard preview source matrix review checklist

## Purpose

v601 is feature version 4 of the requested 20-version feature run.

v600 explains source drift. v601 turns that drift summary into a controlled review checklist so the next operator-facing consumer has explicit items to inspect without adding approval, routing activation, or sibling-service orchestration.

## Change

Added `preview.sourceMatrixReviewChecklist`.

The checklist includes:

- checklist and input drift summary versions;
- checklist state and operator-review readiness;
- ready, needs-review, and blocked item counts;
- four explicit review items:
  - confirm source-matrix consumer;
  - review controlled drift findings;
  - confirm routing remains disabled;
  - confirm sibling projects can continue;
- safety flags showing no approval, routing activation, fresh sibling evidence, service start, or sibling mutation is required.

In the ready fixture path, the checklist is `ready-for-controlled-review` with one `needs-review` item for controlled drift findings.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: drift findings need a stable operator-facing review shape before digesting or archiving;
- later consumer: Node v602 can add a deterministic digest over this checklist;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: keep checklist work read-only until a separate version explicitly opens an activation plan.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v601 consumes Node v600 drift summary output. It does not require fresh Java or mini-kv evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/catalog tests passed: 5 files, 8 tests.
- Build passed.

CI note:

- v601 remains local for the planned v598-v602 batch push and CI run.
