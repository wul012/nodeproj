# Node v690 code walkthrough: controlled read-only shard preview live read-only packet candidate

## Goal

v690 turns the v689 matrix into a concrete manual live read-only packet candidate.

## Candidate

`createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate` creates:

- four process plan steps;
- six read targets;
- nine candidate checks;
- a deterministic SHA-256 digest.

The packet candidate is ready only when automatic service startup is disabled, every target is read-only, cleanup is required, and production execution remains blocked.

## Targets

The read targets cover:

- Node health;
- Node controlled preview JSON;
- Node controlled preview Markdown;
- Java shard-readiness;
- mini-kv `SHARDJSON`;
- mini-kv `SHARDROUTEVERIFYREPORTJSON`.

## Behavior

v690 still starts no services. It defines the window shape that a future live read-only run may execute under explicit process ownership.

## Cross-project status

Java and mini-kv can continue in parallel. For the next actual live window, they need to provide owned read-only service/server start and cleanup records.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts
```

Result:

- Typecheck passed.
- Focused tests passed: 3 files, 17 tests.
