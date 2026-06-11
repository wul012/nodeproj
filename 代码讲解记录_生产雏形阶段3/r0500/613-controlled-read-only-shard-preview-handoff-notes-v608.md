# Node v608 code walkthrough: controlled read-only shard preview handoff notes

## Goal

v608 adds read-only handoff notes to the source-matrix archive summary export chain.

The notes clarify that the current output is evidence for review, not permission to start services, activate routing, or request credentials.

## Builder

`createSourceMatrixHandoffNotes(summaryExport)` creates four notes:

- operator;
- Node;
- Java;
- mini-kv.

When the summary export is ready, no action is required. When it is blocked, the operator note requires action while the safety-boundary notes remain read-only.

## Profile and renderer

The loader attaches `preview.sourceMatrixHandoffNotes`.

The Markdown renderer includes `## Source Matrix Handoff Notes` and a `### Handoff Notes` list.

## Tests

The review artifacts test asserts ready and blocked note behavior.

The main preview test and route group test assert the profile and Markdown sections are present.

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
