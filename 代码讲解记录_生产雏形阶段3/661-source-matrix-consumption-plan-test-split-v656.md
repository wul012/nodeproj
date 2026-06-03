# Node v656 code walkthrough: source matrix consumption plan test split

## Goal

v656 reduces the main controlled read-only shard preview profile test while preserving consumption-plan coverage.

## New test file

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts` owns detailed assertions for:

- ready plan records;
- blocked repair plan records;
- status and safety summaries;
- risk summaries;
- digest metadata.

## Main profile test

The main profile test now checks only high-level consumption-plan fields:

- plan version;
- plan state;
- read-only readiness;
- plan step record count;
- risk state;
- routing activation remains false.

## Behavior

No production behavior changed in v656.

## Cross-project status

Java and mini-kv can continue in parallel. v656 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 5 files, 8 tests.
- Typecheck passed.
- Main profile test reduced to 922 lines.

