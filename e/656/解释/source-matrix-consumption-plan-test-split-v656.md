# v656 Source matrix consumption plan test split

## Purpose

v656 splits detailed source matrix consumption plan assertions out of the large profile test.

The profile test had grown past one thousand lines. The consumption plan now has its own focused test file so future plan changes can be reviewed without scanning the whole profile fixture.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts`.

Moved detailed assertions for:

- ready plan step records;
- blocked repair plan step records;
- step status summary;
- step safety summary;
- risk summary;
- plan digest shape.

The main profile test keeps a compact consumption-plan summary.

## Growth control

This version does not add a new runtime surface, route, artifact chain, sibling evidence requirement, service startup path, or approval workflow.

Necessity proof:

- blocker resolved: the main profile test was becoming hard to maintain as plan fields grew;
- later consumer: future consumption-plan changes can be verified in a dedicated file;
- reuse decision: assertions were moved and tightened around the existing profile loader rather than adding a new fixture system;
- stop condition: the main test retains only high-level plan state while the new file owns plan details.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v656 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.
- Main profile test reduced to 922 lines.

