# v652 Controlled read-only shard preview checks contract

## Purpose

v652 adds focused contract coverage for the split checks module.

v651 moved readiness policy into a dedicated file. v652 verifies that the new module independently blocks unsafe source matrix consumption plans.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts`.

The test covers:

- unsafe plan safety counts produce `SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_UNSAFE_STEPS`;
- unsafe plans make `readyForControlledReadOnlyShardPreview` false;
- unsafe plan guidance carries the non-zero safety counts;
- read-only ready guidance still includes the inactive-routing warning and read-only next actions.

## Growth control

This version does not add a new product surface, route, artifact chain, sibling evidence requirement, service startup path, or approval rule.

Necessity proof:

- blocker resolved: v651 split policy logic, but the new module needed direct regression coverage;
- later consumer: upcoming plan changes can fail fast in a small checks test rather than only through the large profile test;
- reuse decision: the test reuses the existing service fixtures and generated plan, then only changes `stepSafetySummary` to model unsafe future input;
- stop condition: coverage is limited to checks/guidance behavior and does not introduce new runtime behavior.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v652 consumes no fresh sibling evidence, starts no sibling services, and is not a pre-approval blocker.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 4 files, 6 tests.
- Typecheck passed.

