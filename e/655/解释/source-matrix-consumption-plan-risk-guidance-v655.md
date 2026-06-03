# v655 Source matrix consumption plan risk guidance

## Purpose

v655 surfaces the source matrix consumption plan risk summary in recommendations and next actions.

v654 made `riskSummary` enforceable. v655 makes the same risk state visible to route readers and downstream operators.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- focused profile, checks, and route tests.

Guidance now includes:

- `level`;
- `reviewRequired`;
- `blocked`;
- `unsafeSteps`;
- `reasons`.

## Growth control

This version does not add a new route, artifact chain, approval workflow, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: risk was enforced in checks but not visible in the next-action guidance;
- later consumer: operators need to distinguish acceptable `review` risk from blocked or unsafe risk before moving beyond preview;
- reuse decision: this formats the existing `riskSummary` instead of adding another report surface;
- stop condition: risk guidance is emitted through the existing recommendations and next actions only.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v655 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 4 files, 6 tests.
- Typecheck passed.

