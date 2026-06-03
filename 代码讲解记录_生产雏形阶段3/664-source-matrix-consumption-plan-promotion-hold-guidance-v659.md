# Node v659 code walkthrough: source matrix consumption plan promotion hold guidance

## Goal

v659 makes the promotion hold visible wherever next-step guidance is read.

## Formatting

`formatPlanPromotionHold(...)` renders:

- hold state;
- next allowed action;
- routing promotion allowed;
- write promotion allowed;
- service startup allowed;
- reasons.

## Recommendations

Ready and blocked recommendations now include promotion hold state after safety and risk summaries.

## Next actions

Ready next actions keep the hold active until read-only review closes.

Blocked next actions keep the hold closed while repairing the plan.

## Cross-project status

Java and mini-kv can continue in parallel. v659 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

