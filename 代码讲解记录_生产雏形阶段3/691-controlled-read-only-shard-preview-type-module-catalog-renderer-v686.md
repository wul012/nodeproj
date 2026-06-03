# Node v686 code walkthrough: controlled read-only shard preview type module catalog renderer

## Goal

v686 makes the type module ownership catalog renderable as markdown.

## Renderer

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogRenderer.ts` exports:

- `renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown`.

The renderer prints catalog metadata and one section per type module.

## Tests

The catalog test now verifies that the markdown includes:

- title;
- catalog version;
- module count;
- first and last module ids;
- stable re-export status.

## Behavior

No runtime preview behavior changes in v686.

## Cross-project status

Java and mini-kv can continue in parallel. v686 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 8 files, 19 tests.
- Build passed.
- Renderer file is 37 lines.
- Catalog test file is 48 lines.
