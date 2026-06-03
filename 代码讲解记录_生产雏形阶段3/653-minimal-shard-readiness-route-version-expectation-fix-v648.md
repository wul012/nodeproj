# Node v648 code walkthrough: minimal shard readiness route version expectation fix

## Goal

v648 fixes stale route test expectations after the v638 profile version marker update.

## Fix

`auditMinimalShardReadinessRoutes.test.ts` now expects:

- active Node version `Node v638`;
- source Node version `Node v637`.

It also checks the newer Markdown sections for:

- source matrix consumption plan;
- next actions.

## Behavior

This is a test-only CI fix. Production code is unchanged.

## Cross-project status

Java and mini-kv can continue in parallel. v648 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\auditMinimalShardReadinessRoutes.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts
npm.cmd run typecheck
npm.cmd run build
```

Result:

- Focused route tests passed: 2 files, 2 tests.
- Typecheck passed.
- Build passed.
