# v649 Source matrix consumption plan unsafe step gate

## Purpose

v649 turns the v647 `stepSafetySummary` into a real readiness gate.

The controlled read-only shard preview can only be considered ready when the source matrix consumption plan has:

- zero routing-activation steps;
- zero write-allowed steps.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts`.

The new check is:

- `sourceMatrixConsumptionPlanHasNoUnsafeSteps`.

If a future plan step allows routing activation or writes, Node now emits:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_UNSAFE_STEPS`.

## Growth control

This version does not add a new route, sibling evidence requirement, service startup path, approval workflow, or archive chain.

Necessity proof:

- blocker resolved: v647 exposed safety counts but readiness did not consume them;
- later consumer: read-only source matrix consumption must remain blocked if any step becomes write-capable or routing-capable;
- reuse decision: existing `stepSafetySummary` is reused instead of introducing another report surface;
- stop condition: the chain stops once safety summary is a readiness input and blocker source.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v649 consumes only the existing Node consumption plan summary. It requires no fresh Java or mini-kv files, starts no sibling services, and is not a pre-approval blocker for their own work.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 3 files, 4 tests.
- Typecheck passed.

