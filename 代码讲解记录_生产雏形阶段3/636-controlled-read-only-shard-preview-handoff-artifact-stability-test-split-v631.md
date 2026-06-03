# Node v631 code walkthrough: controlled read-only shard preview handoff artifact stability test split

## Goal

v631 separates handoff artifact digest stability tests from behavior-chain tests.

## Split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifactStability.test.ts` now owns stable digest and verification assertions.

The original handoff artifact test keeps ready and blocked chain behavior assertions.

## Behavior

This is a test organization refactor:

- production code is unchanged;
- ready/blocked behavior assertions are unchanged;
- stability assertions are unchanged but moved;
- focused tests cover both files.

## Cross-project status

Java and mini-kv can continue in parallel. v631 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifactStability.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused handoff artifact tests passed: 2 files, 9 tests.
- Build passed.
