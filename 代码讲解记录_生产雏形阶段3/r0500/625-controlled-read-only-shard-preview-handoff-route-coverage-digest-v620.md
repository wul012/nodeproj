# Node v620 code walkthrough: controlled read-only shard preview handoff route coverage digest

## Goal

v620 adds structured coverage for the handoff Markdown sections exposed by the controlled read-only shard preview route.

## Builder

`createSourceMatrixHandoffRouteCoverage(...)` consumes the v617 archive verification and records:

- route surface;
- verification state;
- covered handoff sections;
- coverage digest;
- safety boundaries.

The digest scope is `handoff-route-markdown-sections`.

## Renderer and tests

The Markdown renderer adds `## Source Matrix Handoff Route Coverage`.

The handoff artifact test checks ready and blocked coverage objects. The main preview and route tests check the new Markdown section and v620/v619 version chain.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 12 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v620 consumes no fresh sibling evidence.
