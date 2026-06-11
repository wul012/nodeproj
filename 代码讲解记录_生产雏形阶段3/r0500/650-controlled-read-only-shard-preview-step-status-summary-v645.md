# Node v645 code walkthrough: controlled read-only shard preview step status summary

## Goal

v645 adds count summaries for structured source matrix consumption plan steps.

## Plan

`sourceMatrixConsumptionPlan.stepStatusSummary` now contains:

- ready step count;
- review step count;
- blocked step count.

## Builder

`createSourceMatrixConsumptionPlan(...)` derives the summary from `planStepRecords` and includes it in the plan digest material.

## Markdown

The source matrix renderer prints the three counts in the consumption plan section.

## Cross-project status

Java and mini-kv can continue in parallel. v645 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused preview/route tests passed: 2 files, 3 tests.
- Build passed.
