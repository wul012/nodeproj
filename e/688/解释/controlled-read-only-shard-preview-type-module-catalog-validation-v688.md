# v688 Controlled read-only shard preview type module catalog validation

## Purpose

v688 adds validation for the controlled read-only shard preview type module catalog.

The validator checks uniqueness, order, stable profile re-export coverage, profile-entry placement, ownership declarations, consumers, maintenance rules, and stop conditions.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts`.

Added:

- `validateControlledReadOnlyShardPreviewTypeModuleCatalog`.

The validator is also exposed through the review artifacts barrel.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: catalog boundaries were documented but not machine-checked;
- later consumer: future type-module changes can validate ownership drift before release;
- reuse decision: validation consumes the v685 catalog and v686 barrel path instead of creating a second catalog;
- stop condition: validator stays local to type module maintenance and does not create a route or receipt chain.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v688 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 8 files, 22 tests.
- Build passed.
- Type module catalog file is 256 lines.
- Catalog test file is 78 lines.
