# v682 Source matrix route coverage archive receipt types split

## Purpose

v682 moves source matrix handoff route coverage archive summary receipt archive snapshot and verification types out of the main controlled read-only shard preview types file.

The public import path remains stable because the original types file re-exports the moved types.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveReceiptTypes.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`.

Moved:

- handoff route coverage archive summary receipt archive snapshot;
- handoff route coverage archive summary receipt archive verification gates;
- handoff route coverage archive summary receipt archive verification.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: route coverage archive receipt snapshot and verification types were still embedded in the main profile types file;
- later consumer: archive receipt verification contract changes can now happen in a focused type file;
- reuse decision: existing imports keep working through type re-exports;
- stop condition: only route coverage archive receipt type definitions move in this version.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v682 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 7 files, 15 tests.
- Build passed.
- Main controlled preview types file reduced from 401 lines to 355 lines.
- New route coverage archive receipt types file is 60 lines.
