# Node v610 code walkthrough: controlled read-only shard preview handoff digest stability coverage

## Goal

v610 adds direct stability coverage for the v609 handoff note digest.

## Test

The new review artifact test builds:

- ready source matrix;
- consumer;
- drift summary;
- checklist;
- review digest;
- archive snapshot;
- summary export;
- handoff notes.

It then creates handoff notes twice from the same summary export and verifies the digest objects match exactly.

## Version chain

The controlled preview profile now reports:

- active Node version: `Node v610`;
- source Node version: `Node v609`;
- next Node version: `Node v611`.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 12 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v610 consumes no fresh sibling evidence.
