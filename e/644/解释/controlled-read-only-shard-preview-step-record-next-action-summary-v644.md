# v644 Controlled read-only shard preview step record next action summary

## Purpose

v644 makes recommendations and top-level next actions consume structured `planStepRecords`.

v643 added structured step records while preserving string plan steps. v644 moves operator-facing summaries to the structured records so downstream guidance no longer relies on parsing plan-step strings.

## Change

Updated:

- `collectRecommendations(...)`;
- `createNextActions(...)`;
- preview and route tests.

Added:

- `formatPlanStepRecordSummary(...)` helper.

Ready guidance now summarizes:

- `observe-sources:ready`;
- `compare-routing-modes:ready`;
- `review-drift-findings:needs-review`;
- `keep-routing-disabled:ready`.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: next-step guidance still depended on string plan steps;
- later consumer: JSON and Markdown consumers can rely on stable step codes/statuses;
- reuse decision: it consumes the v643 records and preserves existing fields;
- stop condition: guidance now uses structured records, with no new artifact layer.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v644 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v644 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused preview/route tests passed: 2 files, 3 tests.
- Build passed.

CI note:

- v644 remains inside the local v643-v647 batch before the next push/CI verification.
