# Node v650 code walkthrough: source matrix plan safety guidance

## Goal

v650 puts the plan safety counters into user-facing recommendations and next actions.

## Support helper

`formatPlanSafetySummary(...)` formats:

- `routingActivationAllowedSteps`;
- `writesAllowedSteps`.

This keeps the recommendation and next-action wording consistent.

## Recommendation behavior

`collectRecommendations(...)` now appends the safety summary to both ready and repair guidance.

Ready plans say the plan records can be consumed while routing remains disabled and show the two zero safety counts.

Blocked plans say the plan must be repaired and still show that the repair must preserve the read-only safety state.

## Next actions

`createNextActions(...)` now includes a dedicated step telling the operator to preserve `sourceMatrixConsumptionPlan.stepSafetySummary` before follow-up review.

## Cross-project status

Java and mini-kv can continue in parallel. v650 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 3 files, 4 tests.
- Typecheck passed.

