# Node v612 code walkthrough: controlled read-only shard preview handoff summary digest

## Goal

v612 adds digest coverage to the v611 handoff summary.

The digest gives downstream consumers a compact integrity marker while keeping the controlled shard preview read-only.

## Builder

`createSourceMatrixHandoffSummary(...)` now builds stable digest material from:

- summary version and input notes version;
- summary state and readiness;
- audiences and audience count;
- action-required count;
- inherited handoff notes digest value;
- safety boundaries.

It exposes `summaryDigest.scope = "read-only-handoff-summary"`.

## Renderer

The Markdown output now includes:

- summary digest value;
- summary digest scope;
- covered audience count;
- covered action-required count.

## Tests

The review-artifact test verifies ready and blocked digest shapes and adds stability coverage for repeated summary generation from the same handoff notes.

The main preview and route tests verify the v612/v611 profile chain and Markdown digest scope.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 9 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v612 consumes no fresh sibling evidence.
