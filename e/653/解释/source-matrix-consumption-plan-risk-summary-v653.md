# v653 Source matrix consumption plan risk summary

## Purpose

v653 adds a compact risk summary to the source matrix consumption plan.

The plan already had step status counts, safety counts, and blocking finding counts. The new `riskSummary` groups those signals into one consumable shape for later gates and operator review.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixRenderer.ts`;
- focused profile and route tests.

The new `riskSummary` includes:

- `riskLevel`;
- `reviewRequired`;
- `blocked`;
- `unsafeStepCount`;
- `riskReasonCodes`.

Ready read-only drift review currently reports:

- `riskLevel: review`;
- `riskReasonCodes: PLAN_HAS_REVIEW_STEPS`.

Blocked plans report:

- `riskLevel: blocked`;
- `riskReasonCodes: PLAN_HAS_BLOCKED_STEPS, PLAN_HAS_BLOCKING_FINDINGS`.

## Growth control

This version does not add a new route, approval workflow, sibling evidence requirement, service startup path, or archive chain.

Necessity proof:

- blocker resolved: downstream guidance would otherwise repeatedly derive risk from step status, safety, and finding counts;
- later consumer: future source-matrix consumption gates can use `riskSummary` directly;
- reuse decision: no new evidence is fetched; this summarizes existing plan fields;
- stop condition: the summary is embedded inside the existing consumption plan and rendered once.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v653 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 4 files, 6 tests.
- Typecheck passed.

