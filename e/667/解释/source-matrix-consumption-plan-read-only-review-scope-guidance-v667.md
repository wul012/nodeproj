# v667 Source matrix consumption plan read-only review scope guidance

## Purpose

v667 surfaces read-only review scope in recommendations and next actions.

v666 made the scope enforceable. v667 makes the same operation boundaries visible in compact operator guidance.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- focused profile, checks, and route tests.

Guidance now includes:

- scope state;
- allowed operations;
- forbidden operations.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: review scope was rendered and gated but not present in next-action guidance;
- later consumer: operators can see allowed and forbidden operations directly in the recommendation stream;
- reuse decision: this formats existing `readOnlyReviewScope`;
- stop condition: the compact guidance now includes scope state and operation boundaries.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v667 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

