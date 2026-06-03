# v660 Source matrix consumption plan promotion hold closure criteria

## Purpose

v660 adds closure criteria to the source matrix consumption plan promotion hold.

The hold now says exactly what must be checked before leaving read-only review or repair state.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.ts`;
- focused consumption-plan and route tests.

Promotion hold now includes:

- `closureCriteria`;
- `closureCriterionCount`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: hold state described the boundary but not the concrete closure criteria;
- later consumer: read-only review can close only after checking criteria without activating routing or writes;
- reuse decision: criteria are derived from existing risk and hold state;
- stop condition: criteria remain embedded in `promotionHold` and no new execution path is created.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v660 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

