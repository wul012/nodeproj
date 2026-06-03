# v641 Controlled read-only shard preview plan-backed next actions

## Purpose

v641 makes `nextActions` derive from `sourceMatrixConsumptionPlan`.

After v640, recommendations are plan-aware. v641 applies the same principle to the top-level next actions so JSON consumers get actionable guidance without re-deriving it from lower-level fields.

## Change

Added:

- `createNextActions(...)` in the controlled read-only shard preview support module.

Updated:

- the service now sets `nextActions` from `createNextActions(ready, sourceMatrixConsumptionPlan)`.

Ready output now includes:

- the digest-covered consumption plan steps;
- the reminder that Java and mini-kv remain independently started services.

Blocked output now includes:

- the consumption plan blocked reasons;
- the no-start/no-write/no-routing boundary.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: top-level next actions were generic and did not consume the plan;
- later consumer: JSON consumers can use `nextActions` directly;
- reuse decision: it reuses the existing top-level `nextActions` array;
- stop condition: next actions are derived from one plan object, with no extra artifact chain.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v641 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v641 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused preview test passed: 1 file, 2 tests.
- Build passed.

CI note:

- v641 remains inside the local v638-v642 batch before the next push/CI verification.
