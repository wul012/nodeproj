# Node v651 code walkthrough: controlled read-only shard preview checks split

## Goal

v651 reduces the blast radius of future controlled read-only shard preview gates.

## New module

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts` owns:

- readiness check construction;
- production blocker mapping;
- warning collection;
- recommendation collection;
- next action construction.

## Support module after the split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.ts` now stays closer to support primitives:

- upstream observation normalization;
- preview digest creation;
- source matrix construction;
- summary counts.

## Service wiring

The service entry imports policy/guidance functions from the new checks module and support primitives from the existing support module.

## Behavior

No JSON, Markdown, readiness, blocker, warning, or recommendation behavior changes in v651.

## Cross-project status

Java and mini-kv can continue in parallel. v651 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run typecheck
```

Result:

- Focused tests passed: 3 files, 4 tests.
- Typecheck passed.

