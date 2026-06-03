# v640 Controlled read-only shard preview plan-aware recommendations

## Purpose

v640 makes controlled read-only shard preview recommendations consume the `sourceMatrixConsumptionPlan`.

Before this version, recommendations were generic. After v638-v639, the profile has a compact plan and a readiness gate for it, so the recommendation should point at that plan directly.

## Change

Updated `collectRecommendations(...)` to accept:

- `ready`;
- `sourceMatrixConsumptionPlan`.

Ready output now emits:

- `CONSUME_SOURCE_MATRIX_PLAN_READ_ONLY`;
- a message that references the number of plan steps.

Blocked output now emits:

- `REPAIR_SOURCE_MATRIX_CONSUMPTION_PLAN`;
- a message that includes the plan blocked reasons.

## Behavior

This keeps the route and JSON output actionable:

- ready previews tell operators to consume the plan while routing remains disabled;
- blocked previews tell operators to repair the plan before consumption.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: recommendations did not reflect the v638-v639 plan surface;
- later consumer: route users can follow plan-specific guidance without re-reading all lower-level fields;
- reuse decision: it reuses the existing recommendation array and plan object;
- stop condition: only the recommendation text/code changes, with no new report or verification object.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v640 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v640 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused preview test passed: 1 file, 2 tests.
- Build passed.

CI note:

- v640 remains inside the local v638-v642 batch before the next push/CI verification.
