# Node v611 code walkthrough: controlled read-only shard preview handoff summary

## Goal

v611 adds a compact handoff summary to the controlled read-only shard preview.

The design keeps the handoff read-only: it does not start Java or mini-kv, does not activate routing, does not request approval, and does not require fresh sibling evidence.

## Type and builder

`ControlledReadOnlyShardPreviewSourceMatrixHandoffSummary` records:

- `summaryVersion: "Node v611"`;
- `inputNotesVersion: "Node v608"`;
- `summaryState`;
- readiness boolean;
- handoff audiences;
- action-required count;
- inherited handoff digest value;
- safety boundary flags.

`createSourceMatrixHandoffSummary(...)` consumes the existing v608 handoff notes and derives a short object from them. The builder does not inspect upstream evidence directly.

## Loader and renderer

The controlled read-only preview loader now builds the summary after `sourceMatrixHandoffNotes` and exposes it under `preview.sourceMatrixHandoffSummary`.

The Markdown renderer adds `## Source Matrix Handoff Summary` so the HTTP route exposes the same state as JSON.

## Tests

The review-artifact test checks ready and blocked summaries.

The main preview test verifies the summary in ready and disabled-probe paths, and confirms its digest value matches the source handoff notes digest.

The minimal shard readiness route test verifies the new Markdown section remains registered through the shared route table.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 8 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v611 consumes no fresh sibling evidence.
