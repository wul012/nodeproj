# Node v640 code walkthrough: controlled read-only shard preview plan-aware recommendations

## Goal

v640 makes recommendations reflect the source matrix consumption plan.

## Implementation

`collectRecommendations(...)` now accepts `sourceMatrixConsumptionPlan`.

Ready profiles return:

- `CONSUME_SOURCE_MATRIX_PLAN_READ_ONLY`.

Blocked profiles return:

- `REPAIR_SOURCE_MATRIX_CONSUMPTION_PLAN`.

## Behavior

The recommendation array remains the same shape and count, but the message is now tied to the v638-v639 plan state.

## Cross-project status

Java and mini-kv can continue in parallel. v640 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused preview test passed: 1 file, 2 tests.
- Build passed.
