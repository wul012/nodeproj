# v650 Source matrix plan safety guidance

## Purpose

v650 makes the source matrix consumption plan safety counts visible in operator guidance.

v649 made unsafe plan steps a readiness gate. v650 carries the same evidence into recommendations and next actions so the route output explains why the next move is still read-only.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`.

Recommendations and next actions now include:

- `routingActivationAllowedSteps=0`;
- `writesAllowedSteps=0`.

## Growth control

This version does not add a new artifact chain, route, approval workflow, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: v649 readiness consumed safety counts, but operator guidance did not surface them;
- later consumer: route readers and downstream plan consumers need the same safety basis before using `planStepRecords`;
- reuse decision: the existing `stepSafetySummary` is reused and formatted through a local helper;
- stop condition: guidance stops at the two safety counters already produced by v647 and gated by v649.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v650 consumes no fresh sibling evidence and does not start, stop, or mutate sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 3 files, 4 tests.
- Typecheck passed.

