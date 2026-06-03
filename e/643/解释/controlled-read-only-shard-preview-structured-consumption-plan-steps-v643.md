# v643 Controlled read-only shard preview structured consumption plan steps

## Purpose

v643 adds structured step records to `sourceMatrixConsumptionPlan`.

The v638 plan exposed string `planSteps`, which are useful for logs and Markdown. Structured consumers need stable fields for order, code, status, evidence, and safety boundaries. v643 adds those records while preserving the existing strings.

## Change

Added:

- `ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStepCode`;
- `ControlledReadOnlyShardPreviewSourceMatrixConsumptionPlanStep`;
- `planStepRecords`;
- `planStepRecordCount`.

Updated:

- `createSourceMatrixConsumptionPlan(...)` now builds structured records first and derives `planSteps` from record evidence;
- Markdown now renders `Consumption Plan Step Records`;
- preview and route tests cover the structured records.

## Behavior

Ready plans include records for:

- observed sources;
- routing mode comparison;
- drift finding review;
- disabled routing.

Blocked plans include records for:

- blocked reasons;
- blocking findings;
- disabled routing.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: downstream code had to parse string plan steps;
- later consumer: v644+ can consume structured step records directly;
- reuse decision: existing `planSteps` remain for compatibility and Markdown readability;
- stop condition: step records are data shape only, not a new receipt or verification chain.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v643 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v643 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused preview/route tests passed: 2 files, 3 tests.
- Build passed.

CI note:

- v643 starts the local v643-v647 batch before the next push/CI verification.
