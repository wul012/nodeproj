# v685 Controlled read-only shard preview type module catalog

## Purpose

v685 adds a type module catalog for the controlled read-only shard preview split.

The catalog records module ownership, consumers, maintenance rules, stable re-export expectations, and stop conditions so future work does not keep splitting without a clear owner or lifecycle.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts`.

The catalog covers 13 type ownership groups and keeps `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` as the stable public entry point.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: after v673-v684, type ownership had been split across many focused files and needed an explicit maintenance map;
- later consumer: future type changes can consult the catalog before adding another module;
- reuse decision: the catalog records existing modules instead of adding a new evidence or receipt chain;
- stop condition: add a new type module only when a new builder, renderer, or test lifecycle needs it.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v685 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 8 files, 18 tests.
- Build passed.
- Type module catalog file is 170 lines.
- Catalog test file is 36 lines.
