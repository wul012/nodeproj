# Node v688 code walkthrough: controlled read-only shard preview type module catalog validation

## Goal

v688 makes the type module catalog machine-checkable.

## Validator

`validateControlledReadOnlyShardPreviewTypeModuleCatalog` checks:

- module count;
- unique ids;
- unique module paths;
- stable profile re-export count;
- sequential order;
- profile entry placement;
- ownership, consumer, maintenance rule, and stop-condition coverage.

It returns `valid`, counts, blocked reason codes, and explicit read-only safety flags.

## Barrel

The validator is re-exported through `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts`.

## Tests

The catalog test verifies the valid catalog and a duplicate-id drift case.

The review artifact barrel test verifies the validator re-export.

## Behavior

No runtime preview behavior changes in v688.

## Cross-project status

Java and mini-kv can continue in parallel. v688 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 8 files, 22 tests.
- Build passed.
- Type module catalog file is 256 lines.
- Catalog test file is 78 lines.
