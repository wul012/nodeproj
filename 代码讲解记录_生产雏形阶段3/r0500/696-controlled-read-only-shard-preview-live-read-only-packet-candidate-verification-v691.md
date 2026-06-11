# Node v691 code walkthrough: controlled read-only shard preview live read-only packet candidate verification

## Goal

v691 verifies the v690 candidate and exposes the new readiness chain through stable review artifacts.

## Verification

`createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification` checks:

- candidate readiness;
- candidate digest shape;
- cleanup coverage;
- read-only target coverage;
- disabled automatic service startup;
- blocked production execution;
- no service starts during verification.

The verified candidate points to the next action: run the three-project live read-only window with explicit process owners.

## Renderer and profile wiring

The controlled preview profile now includes:

- `executionGapMatrix`;
- `liveReadOnlyPacketCandidate`;
- `liveReadOnlyPacketCandidateVerification`.

The controlled preview Markdown renders a compact execution-readiness summary, while standalone renderers can produce dedicated archive Markdown for the matrix, candidate, and verification.

## Catalog

The type module catalog is updated to Node v691 with three new execution-readiness modules. The profile entry remains last and the validator still checks uniqueness, ordering, re-export coverage, and stop conditions.

## Cross-project status

Java and mini-kv can continue in parallel. v691 does not consume fresh sibling evidence or start sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts
npm.cmd test -- <all controlled-read-only shard preview tests> test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 3 files, 17 tests.
- Adjacent controlled-preview tests passed: 12 files, 40 tests.
- Build passed.
