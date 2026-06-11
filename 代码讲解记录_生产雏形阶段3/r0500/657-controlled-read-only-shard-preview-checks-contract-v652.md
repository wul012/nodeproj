# Node v652 code walkthrough: controlled read-only shard preview checks contract

## Goal

v652 gives the new checks module direct contract coverage.

## Unsafe plan case

The test builds a normal ready profile, then creates an unsafe copy of the source matrix consumption plan with:

- `routingActivationAllowedStepCount: 1`;
- `writesAllowedStepCount: 1`.

`createChecks(...)` must mark `sourceMatrixConsumptionPlanHasNoUnsafeSteps` false.

`collectProductionBlockers(...)` must include:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_UNSAFE_STEPS`.

## Guidance case

The same unsafe plan must carry non-zero safety counts through:

- recommendations;
- next actions.

## Ready read-only case

The ready-path test confirms warnings and guidance remain read-only:

- inactive routing is a warning;
- next actions still say consumption must happen without routing activation;
- safety counts stay at zero.

## Cross-project status

Java and mini-kv can continue in parallel. v652 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 4 files, 6 tests.
- Typecheck passed.

