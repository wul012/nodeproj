# Node v629 code walkthrough: controlled read-only shard preview handoff summary renderer split

## Goal

v629 continues the renderer cleanup by moving handoff summary rendering out of the main Markdown renderer.

## Split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffSummaryRenderer.ts` now owns the handoff notes, summary, consumer, export, receipt, and receipt archive verification sections.

The main renderer imports `renderControlledReadOnlyShardPreviewHandoffSummarySections(...)` and inserts that section list before route coverage sections.

## Behavior

This is an output-preserving refactor:

- profile versions are unchanged from v627;
- handoff headings remain the same;
- JSON output is unaffected;
- Markdown route tests continue to assert the same section names and states.

## Cross-project status

Java and mini-kv can continue in parallel. v629 consumes no fresh sibling evidence and starts no sibling services.

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
