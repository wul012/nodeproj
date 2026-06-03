# v681 Source matrix route coverage archive summary types split

## Purpose

v681 moves source matrix handoff route coverage archive summary and summary receipt types out of the main controlled read-only shard preview types file.

The public import path remains stable because the original types file re-exports the moved types.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArchiveSummaryTypes.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`.

Moved:

- handoff route coverage archive summary;
- handoff route coverage archive summary receipt.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: route coverage archive summary and receipt types were still embedded in the main profile types file;
- later consumer: archive summary contract changes can now happen in a focused type file;
- reuse decision: existing imports keep working through type re-exports;
- stop condition: only route coverage archive summary type definitions move in this version.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v681 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 7 files, 15 tests.
- Build passed.
- Main controlled preview types file reduced from 445 lines to 401 lines.
- New route coverage archive summary types file is 55 lines.
