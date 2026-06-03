# Node v653 code walkthrough: source matrix consumption plan risk summary

## Goal

v653 makes the consumption plan risk state easy to consume without re-deriving it in every later gate.

## Type contract

`ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlan` now has `riskSummary`.

The summary exposes:

- `riskLevel`: `none`, `review`, `blocked`, or `unsafe`;
- `reviewRequired`;
- `blocked`;
- `unsafeStepCount`;
- `riskReasonCodes`.

## Builder logic

`createConsumptionPlanRiskSummary(...)` derives risk from:

- plan step status counts;
- plan safety counts;
- drift summary blocking finding count.

Unsafe steps win over blocked state, blocked steps or blocking findings produce `blocked`, review steps produce `review`, and clean plans produce `none`.

## Renderer

The Markdown source-matrix section now renders the risk summary directly under the consumption plan safety counts.

## Cross-project status

Java and mini-kv can continue in parallel. v653 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 4 files, 6 tests.
- Typecheck passed.

