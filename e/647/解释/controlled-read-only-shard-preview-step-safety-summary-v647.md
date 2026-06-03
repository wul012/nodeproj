# v647 Controlled read-only shard preview step safety summary

## Purpose

v647 adds `stepSafetySummary` to `sourceMatrixConsumptionPlan`.

Structured plan steps already carry `routingActivationAllowed=false` and `writesAllowed=false`. v647 provides count summaries so consumers can confirm those boundaries without scanning every step.

## Change

Added:

- `stepSafetySummary.routingActivationAllowedStepCount`;
- `stepSafetySummary.writesAllowedStepCount`.

Updated:

- plan digest material to include the safety summary;
- Markdown rendering for both counts;
- ready and blocked preview tests;
- route Markdown tests.

## Behavior

Ready and blocked plans both report:

- routing activation allowed step count: 0;
- writes allowed step count: 0.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: consumers had to scan structured records to verify safety flags;
- later consumer: v648+ can use summary counts for safety checks and display;
- reuse decision: it summarizes existing step records instead of adding a new artifact;
- stop condition: summary is count-only and does not authorize or verify any new capability.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v647 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v647 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused preview/route tests passed: 2 files, 3 tests.
- Build passed.

CI note:

- v647 closes the local v643-v647 batch for push/CI verification.
