# Node v614 code walkthrough: controlled read-only shard preview handoff summary consumer export

## Goal

v614 exports the v613 handoff summary consumer as stable lines plus a digest.

## Type and builder

`ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerExport` records:

- export/input versions;
- ready or blocked export state;
- consumer decision;
- source summary digest value;
- export digest;
- fixed export lines;
- gate and blocked reason counts;
- safety boundaries.

`createSourceMatrixHandoffSummaryConsumerExport(...)` derives export lines from the consumer only. It does not read upstream evidence or activate any runtime behavior.

## Renderer and tests

The Markdown renderer adds `## Source Matrix Handoff Summary Consumer Export`.

The tests cover ready and blocked exports, digest shape, export lines, and route Markdown visibility.

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

Java and mini-kv can continue in parallel. v614 consumes no fresh sibling evidence.
