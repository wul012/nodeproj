# v679 Source matrix route coverage types split

## Purpose

v679 moves source matrix handoff route coverage and route coverage verification types out of the main controlled read-only shard preview types file.

The public import path remains stable because the original types file re-exports the moved types.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageTypes.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`.

Moved:

- handoff route coverage;
- handoff route coverage verification gates;
- handoff route coverage verification.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: route coverage and verification types were still embedded in the main profile types file;
- later consumer: route coverage contract changes can now happen in a focused type file;
- reuse decision: existing imports keep working through type re-exports;
- stop condition: only route coverage type definitions move in this version.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v679 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 7 files, 15 tests.
- Build passed.
- Main controlled preview types file reduced from 524 lines to 486 lines.
- New route coverage types file is 51 lines.
