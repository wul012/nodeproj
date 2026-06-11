# Node v655 code walkthrough: source matrix consumption plan risk guidance

## Goal

v655 makes consumption-plan risk visible in operator guidance.

## Formatting

`formatPlanRiskSummary(...)` renders:

- `level`;
- `reviewRequired`;
- `blocked`;
- `unsafeSteps`;
- `reasons`.

## Recommendations

Ready recommendations now include both:

- safety counts;
- risk summary.

Blocked recommendations include the same information so repair guidance preserves the read-only safety state.

## Next actions

Ready plans now include an explicit risk review step before any promotion beyond read-only preview.

Blocked plans instruct operators to resolve `riskSummary` before consumption.

## Cross-project status

Java and mini-kv can continue in parallel. v655 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 4 files, 6 tests.
- Typecheck passed.

