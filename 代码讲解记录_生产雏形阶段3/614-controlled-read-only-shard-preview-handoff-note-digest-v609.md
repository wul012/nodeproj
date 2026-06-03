# Node v609 code walkthrough: controlled read-only shard preview handoff note digest

## Goal

v609 makes the v608 handoff notes digestible.

The digest is separate from the summary export digest because it covers audience-specific handoff notes, not summary lines.

## Code

`createSourceMatrixHandoffNotes(...)` now fills `handoffDigest`.

The digest uses `sha256StableJson(...)` over:

- notes version;
- input summary export version;
- normalized notes.

## Tests

The review artifacts test asserts the digest in both ready and blocked paths.

The main preview test asserts the digest shape and Markdown renders the digest scope.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 11 tests.
- Build passed.

## Safety

No route, approval, routing activation, fresh sibling evidence, service start, sibling mutation, or credential read was added.
