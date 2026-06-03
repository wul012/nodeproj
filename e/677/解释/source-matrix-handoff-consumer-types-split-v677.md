# v677 Source matrix handoff consumer types split

## Purpose

v677 moves source matrix handoff summary consumer, export, and receipt types out of the main controlled read-only shard preview types file.

The public import path remains stable because the original types file re-exports the moved types.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffConsumerTypes.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`.

Moved:

- handoff summary consumer gates;
- handoff summary consumer;
- handoff summary consumer export;
- handoff summary consumer receipt.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: handoff consumer, export, and receipt types were still embedded in the main profile types file;
- later consumer: handoff consumer contract changes can now happen in a focused type file;
- reuse decision: existing imports keep working through type re-exports;
- stop condition: only handoff consumer type definitions move in this version.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v677 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 7 files, 15 tests.
- Build passed.
- Main controlled preview types file reduced from 629 lines to 565 lines.
- New handoff consumer types file is 78 lines.
