# Node v657 code walkthrough: source matrix consumption plan promotion hold

## Goal

v657 makes the read-only promotion boundary explicit.

## Builder logic

`createConsumptionPlanPromotionHold(...)` derives hold state from `riskSummary`.

If risk is blocked, the next allowed action is:

- `repair-plan-risk`.

If risk requires review, the next allowed action is:

- `review-read-only-risk`.

If no risk is present, the next allowed action is:

- `consume-read-only-plan`.

## Safety

Every promotion hold keeps these false:

- `routingPromotionAllowed`;
- `writePromotionAllowed`;
- `serviceStartupAllowed`.

## Renderer

Markdown now renders promotion hold state, next allowed action, reason codes, and the three promotion denial flags.

## Cross-project status

Java and mini-kv can continue in parallel. v657 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

