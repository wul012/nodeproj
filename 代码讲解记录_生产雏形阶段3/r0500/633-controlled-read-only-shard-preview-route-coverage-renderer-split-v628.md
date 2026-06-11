# Node v628 code walkthrough: controlled read-only shard preview route coverage renderer split

## Goal

v628 reduces renderer size after the v623-v627 route coverage archive verification chain.

## Split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageRenderer.ts` now owns the route coverage Markdown sections.

The main renderer imports `renderControlledReadOnlyShardPreviewHandoffRouteCoverageSections(...)` and inserts that section list into the existing Markdown array.

## Behavior

This is an output-preserving refactor:

- profile versions are unchanged from v627;
- route coverage headings remain the same;
- JSON output is unaffected;
- Markdown route tests continue to assert the same section names and states.

## Cross-project status

Java and mini-kv can continue in parallel. v628 consumes no fresh sibling evidence and starts no sibling services.

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
