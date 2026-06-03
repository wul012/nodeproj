# v673 Source matrix consumption plan types split

## Purpose

v673 splits consumption plan types out of the large controlled read-only shard preview types file.

The public import path remains stable because the original types file re-exports the moved types.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlanTypes.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`.

Moved:

- consumption plan step code;
- consumption plan step type;
- consumption plan type.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: the main types file had grown past 800 lines and mixed profile, handoff, route coverage, and consumption plan types;
- later consumer: consumption plan type changes can happen in a focused file;
- reuse decision: existing imports keep working through type re-exports;
- stop condition: only consumption plan types move in this version.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v673 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`

Result:

- Typecheck passed.
- Focused tests passed: 7 files, 15 tests.
- Main controlled preview types file reduced from 807 lines to 739 lines.

