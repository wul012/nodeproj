# Node v647 code walkthrough: controlled read-only shard preview step safety summary

## Goal

v647 adds safety count summaries for structured source matrix consumption plan steps.

## Plan

`sourceMatrixConsumptionPlan.stepSafetySummary` now contains:

- routing activation allowed step count;
- writes allowed step count.

## Builder

`createSourceMatrixConsumptionPlan(...)` derives the safety summary from `planStepRecords` and includes it in the plan digest material.

## Markdown

The source matrix renderer prints both safety counts in the consumption plan section.

## Cross-project status

Java and mini-kv can continue in parallel. v647 consumes no fresh sibling evidence and starts no sibling services.

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
