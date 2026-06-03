# Node v633 code walkthrough: controlled read-only shard preview route coverage artifact builder split

## Goal

v633 separates route coverage artifact construction from the broader handoff artifact builder.

## Split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArtifacts.ts` now owns the route coverage chain from v620 through v627:

- coverage digest;
- coverage verification;
- archive snapshot;
- archive verification;
- archive summary;
- summary receipt;
- summary receipt archive snapshot;
- summary receipt archive verification.

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.ts` keeps the summary handoff chain and re-exports the moved route coverage functions.

## Behavior

This is a production organization refactor:

- artifact shapes are unchanged;
- digest scopes are unchanged;
- version markers remain v620-v627 for the moved builders;
- downstream imports from the old handoff artifact module still work.

## Cross-project status

Java and mini-kv can continue in parallel. v633 consumes no fresh sibling evidence and starts no sibling services.

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
