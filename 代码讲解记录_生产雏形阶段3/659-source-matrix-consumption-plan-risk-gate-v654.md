# Node v654 code walkthrough: source matrix consumption plan risk gate

## Goal

v654 makes `riskSummary` enforceable.

## Check contract

`ControlledReadOnlyShardPreviewChecks` now includes:

- `sourceMatrixConsumptionPlanRiskAccepted`.

The check passes only when:

- `riskSummary.blocked` is false;
- `riskSummary.riskLevel` is not `unsafe`.

## Blocker mapping

`collectProductionBlockers(...)` maps a failed risk check to:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_RISK_BLOCKED`.

## Ready-path behavior

The normal source matrix plan has `riskLevel: review` because routing mode and count drift must still be reviewed. This is accepted because the plan is read-only and has no unsafe steps.

## Blocked-path behavior

When probes are disabled, the plan risk is blocked and the new blocker appears beside the blocked-step blocker.

## Cross-project status

Java and mini-kv can continue in parallel. v654 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 4 files, 6 tests.
- Typecheck passed.

