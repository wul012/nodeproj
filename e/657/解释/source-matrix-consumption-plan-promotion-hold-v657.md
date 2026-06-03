# v657 Source matrix consumption plan promotion hold

## Purpose

v657 adds a structured promotion hold to the source matrix consumption plan.

The plan can be ready for read-only consumption while still requiring drift review. `promotionHold` makes that boundary explicit: Node may consume and review read-only plan records, but it must not promote to routing, writes, or service startup.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.ts`;
- focused consumption-plan and route tests.

The new `promotionHold` includes:

- `holdState`;
- `nextAllowedAction`;
- `reasonCodes`;
- `routingPromotionAllowed`;
- `writePromotionAllowed`;
- `serviceStartupAllowed`.

## Growth control

This version does not add a new route, approval workflow, sibling evidence requirement, service startup path, or archive chain.

Necessity proof:

- blocker resolved: `riskSummary.review` needed a structured boundary so it could not be mistaken for permission to promote routing;
- later consumer: future preview-to-review steps can consume `promotionHold` directly;
- reuse decision: the hold is derived from existing `riskSummary` and embedded inside the consumption plan;
- stop condition: the hold only records next allowed action and promotion denials, with no new execution path.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v657 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

