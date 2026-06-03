# v668 Controlled read-only shard preview guidance formatter split

## Purpose

v668 splits compact guidance formatting out of the controlled read-only shard preview checks module.

The checks module now owns readiness checks, blockers, warnings, recommendations, and next-action orchestration. Formatting helpers live in a focused formatter module.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`.

Moved formatter helpers for:

- plan step records;
- plan safety summary;
- plan risk summary;
- promotion hold summary;
- read-only review scope summary.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: guidance formatting had started to grow inside the checks module;
- later consumer: future guidance formatting changes can be localized without touching readiness gates;
- reuse decision: all strings stay byte-for-byte equivalent under the existing focused tests;
- stop condition: checks owns policy, formatter owns string rendering.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v668 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.
- Checks module reduced to 158 lines.

