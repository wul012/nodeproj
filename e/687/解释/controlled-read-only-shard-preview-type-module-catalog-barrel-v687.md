# v687 Controlled read-only shard preview type module catalog barrel

## Purpose

v687 exposes the type module catalog and markdown renderer through the existing controlled read-only shard preview review artifacts barrel.

This gives maintainers one stable runtime import path for review builders and type-module ownership helpers.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts`.

The barrel now re-exports:

- `createControlledReadOnlyShardPreviewTypeModuleCatalog`;
- `listControlledReadOnlyShardPreviewTypeModules`;
- `renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: catalog helpers existed but were not reachable from the established review artifact barrel;
- later consumer: archive or maintenance tooling can use the same barrel as other shard preview review artifacts;
- reuse decision: no new catalog or renderer is created;
- stop condition: only re-export catalog helpers through the existing barrel.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v687 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused tests passed: 8 files, 20 tests.
- Build passed.
