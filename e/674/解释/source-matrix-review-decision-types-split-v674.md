# v674 Source matrix review decision types split

## Purpose

v674 continues the controlled read-only shard preview type split by moving source matrix review decision types out of the main profile types file.

The public import path remains stable because the original types file re-exports the moved types.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionTypes.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`.

Moved:

- source matrix review checklist item;
- source matrix review checklist;
- source matrix review digest.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: review checklist and digest types were still mixed into the main profile types file;
- later consumer: review decision changes can now happen in a focused type file;
- reuse decision: existing imports keep working through type re-exports;
- stop condition: only review decision types move in this version.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v674 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 7 files, 15 tests.
- Build passed.
- Main controlled preview types file reduced from 739 lines to 703 lines.
- New review decision types file is 48 lines.
