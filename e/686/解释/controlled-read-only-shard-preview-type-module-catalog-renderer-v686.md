# v686 Controlled read-only shard preview type module catalog renderer

## Purpose

v686 adds a markdown renderer for the controlled read-only shard preview type module catalog.

The renderer makes the type module ownership map reviewable in archive or handoff material without adding a route or runtime preview behavior.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogRenderer.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts`.

The focused test now verifies the markdown title, catalog version, module count, first and last modules, and stable profile re-export line.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: the type module catalog was structured data only and not directly reviewable as archive text;
- later consumer: release/archive notes can render the ownership map without duplicating catalog strings;
- reuse decision: renderer consumes the v685 catalog instead of creating another catalog;
- stop condition: no route or new receipt is added; markdown rendering remains a local formatter.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v686 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 8 files, 19 tests.
- Build passed.
- Renderer file is 37 lines.
- Catalog test file is 48 lines.
