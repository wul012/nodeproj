# Node v604 code walkthrough: controlled read-only shard preview review artifacts test split

## Goal

v604 keeps the source-matrix review work maintainable by moving detailed builder expectations out of the main preview test.

## New test

`test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts` builds ready and blocked source matrices and runs the complete review artifact chain:

- consumer;
- drift summary;
- checklist;
- digest;
- archive snapshot.

The ready case asserts the controlled drift path. The blocked case asserts the fail-closed path.

## Main test

`test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts` now keeps integration-level assertions:

- the route/profile still contains the review artifacts;
- hashes still look like sha256 values;
- archive snapshot digest matches the review digest;
- Markdown still renders all review sections.

## Version chain

The controlled preview profile now reports:

- active Node version: `Node v604`;
- source Node version: `Node v603`;
- next Node version: `Node v605`.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 10 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v604 consumes no fresh sibling evidence.
