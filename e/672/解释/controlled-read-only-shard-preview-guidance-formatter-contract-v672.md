# v672 Controlled read-only shard preview guidance formatter contract

## Purpose

v672 adds focused contract coverage for the guidance formatter module split in v668 and extended in v671.

The formatter strings are now protected outside the larger profile and route tests.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts`.

The test covers ready and blocked summaries for:

- plan step records;
- safety summary;
- risk summary;
- promotion hold;
- read-only review scope;
- scope digest coverage.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: formatter changes were only indirectly covered through large profile/route tests;
- later consumer: guidance formatting can evolve with a focused regression target;
- reuse decision: the test reuses existing service fixtures and does not add new runtime fixtures;
- stop condition: coverage is limited to formatter output strings.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v672 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 7 files, 15 tests.
- Typecheck passed.

