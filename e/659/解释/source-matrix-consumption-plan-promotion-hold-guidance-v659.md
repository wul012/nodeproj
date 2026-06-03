# v659 Source matrix consumption plan promotion hold guidance

## Purpose

v659 surfaces promotion hold state in recommendations and next actions.

v658 made promotion hold enforceable. v659 makes the same hold visible in operator guidance so read-only review cannot be mistaken for routing promotion permission.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- focused profile, checks, and route tests.

Guidance now includes:

- hold state;
- next allowed action;
- routing promotion flag;
- write promotion flag;
- service startup flag;
- hold reason codes.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: promotion hold was gated but not visible in next-action guidance;
- later consumer: operator review can see the exact allowed next action before moving past preview;
- reuse decision: this formats existing `promotionHold` data only;
- stop condition: guidance is emitted through existing recommendations and next actions.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v659 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.

