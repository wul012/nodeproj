# Node v662 code walkthrough: source matrix consumption plan artifact builder split

## Goal

v662 keeps source matrix flow and consumption plan construction separate.

## New module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanArtifacts.ts` owns:

- consumption plan creation;
- plan step record creation;
- risk summary creation;
- promotion hold creation;
- closure criteria creation.

## Source matrix flow after split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.ts` now owns:

- source matrix consumer;
- source matrix drift summary;
- drift finding helpers.

## Public API

The review artifact barrel still exports `createSourceMatrixConsumptionPlan`, so service wiring remains unchanged.

## Cross-project status

Java and mini-kv can continue in parallel. v662 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.
- `SourceMatrixFlowArtifacts` reduced from 334 lines to 148 lines.

