# Node v637 code walkthrough: controlled read-only shard preview review artifact barrel contract

## Goal

v637 adds a contract test for the public `ReviewArtifacts` barrel after the v633-v636 artifact module splits.

## Test

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts` imports the public barrel and each focused implementation module.

It checks function identity with `toBe(...)`, so a missing or redirected re-export fails immediately.

## Behavior

This is a test-only maintenance version:

- production code is unchanged;
- artifact behavior is unchanged;
- public import paths stay stable;
- the test guards the split module boundary.

## Cross-project status

Java and mini-kv can continue in parallel. v637 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifactStability.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused barrel/stability tests passed: 2 files, 12 tests.
- Build passed.
