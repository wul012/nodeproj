# Node v621 code walkthrough: controlled read-only shard preview handoff route coverage verification

## Goal

v621 adds gate verification for the v620 handoff route coverage digest.

## Builder

`createSourceMatrixHandoffRouteCoverageVerification(...)` consumes `sourceMatrixHandoffRouteCoverage` and checks:

- coverage readiness;
- digest presence;
- section count consistency;
- no routing activation;
- no fresh sibling evidence;
- read-only verification boundary.

## Renderer and tests

The Markdown renderer adds `## Source Matrix Handoff Route Coverage Verification`.

The handoff artifact test checks ready and blocked verification outcomes. The main preview and route tests verify the v621/v620 chain and route Markdown section.

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

Java and mini-kv can continue in parallel. v621 consumes no fresh sibling evidence.
