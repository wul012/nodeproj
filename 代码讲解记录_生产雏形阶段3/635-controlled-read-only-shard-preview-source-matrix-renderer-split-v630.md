# Node v630 code walkthrough: controlled read-only shard preview source matrix renderer split

## Goal

v630 finishes the renderer cleanup by moving source matrix rendering out of the main Markdown renderer.

## Split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.ts` now owns the source matrix, consumer, drift, review, digest, archive snapshot, and summary export sections.

The main renderer imports `renderControlledReadOnlyShardPreviewSourceMatrixSections(...)` and inserts that section list before handoff sections.

## Behavior

This is an output-preserving refactor:

- profile versions are unchanged from v627;
- source matrix headings remain the same;
- JSON output is unaffected;
- Markdown route tests continue to assert the same section names and states.

## Cross-project status

Java and mini-kv can continue in parallel. v630 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/renderer tests passed: 2 files, 4 tests.
- Build passed.
