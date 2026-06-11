# Node v643 code walkthrough: controlled read-only shard preview structured consumption plan steps

## Goal

v643 adds structured consumption plan step records while preserving string plan steps.

## Types

The plan now includes:

- `planStepRecords`;
- `planStepRecordCount`.

Each record has:

- order;
- code;
- status;
- evidence;
- routing and write safety flags.

## Builder

`createSourceMatrixConsumptionPlan(...)` now creates step records first, then maps their evidence into the existing `planSteps` string list.

## Markdown

The source matrix renderer now includes a `Consumption Plan Step Records` subsection.

## Cross-project status

Java and mini-kv can continue in parallel. v643 consumes no fresh sibling evidence and starts no sibling services.

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
