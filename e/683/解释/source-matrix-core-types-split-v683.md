# v683 Source matrix core types split

## Purpose

v683 moves source matrix core, consumer, and drift types out of the main controlled read-only shard preview types file.

The public import path remains stable because the original types file re-exports the moved types.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixTypes.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`.

Moved:

- preview project/status/transport aliases;
- source matrix source alias;
- observation preview;
- source matrix entry and matrix;
- source matrix consumer gates, comparison, and consumer;
- source matrix drift dimension, finding, and summary.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: source matrix primitives and profile summary types were still mixed in one main types file;
- later consumer: source matrix contract changes can now happen in a focused type file;
- reuse decision: existing imports keep working through type re-exports;
- stop condition: only source matrix core type definitions move in this version.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v683 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 7 files, 15 tests.
- Build passed.
- Main controlled preview types file reduced from 355 lines to 274 lines.
- New source matrix types file is 105 lines.
