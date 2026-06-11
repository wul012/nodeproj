# Node v660 code walkthrough: source matrix consumption plan promotion hold closure criteria

## Goal

v660 records how a promotion hold can close without opening routing, writes, or service startup.

## Builder logic

`createPromotionHoldClosureCriteria(...)` creates criteria by hold state:

- repair holds require risk repair plus the three promotion denials;
- read-only review holds require risk review, read-only plan consumption, and the three promotion denials;
- no-hold plans still require read-only consumption and promotion denials.

## Renderer

Markdown now displays:

- closure criterion count;
- closure criteria.

## Tests

The consumption-plan test owns ready and blocked criteria details. The route test confirms the Markdown exposes the ready review criteria.

## Cross-project status

Java and mini-kv can continue in parallel. v660 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

