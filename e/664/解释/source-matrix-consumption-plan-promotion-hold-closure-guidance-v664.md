# v664 Source matrix consumption plan promotion hold closure guidance

## Purpose

v664 adds promotion hold closure count to recommendations and next actions.

The route already renders full closure criteria. This version makes the compact promotion-hold guidance include `closureCriterionCount` as well.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- focused profile and route tests.

Guidance now includes:

- `closureCriterionCount=5` for read-only review holds;
- `closureCriterionCount=4` for repair holds.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: closure criteria were rendered but not summarized in next-action guidance;
- later consumer: operator guidance can verify a hold has closure criteria without parsing the full criteria list;
- reuse decision: this formats the existing `promotionHold.closureCriterionCount`;
- stop condition: only the compact promotion hold summary changes.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v664 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

