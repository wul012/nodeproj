# Node v632 code walkthrough: controlled read-only shard preview route test split

## Goal

v632 separates HTTP route coverage from profile behavior tests.

## Split

`controlledReadOnlyShardPreviewServiceFixtures.ts` now owns reusable evidence, fake clients, headers, and test config.

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts` now owns the JSON/Markdown route test and mock upstream servers.

The original preview test keeps ready and disabled profile behavior tests.

## Behavior

This is a test organization refactor:

- production code is unchanged;
- JSON and Markdown route expectations are unchanged;
- profile behavior assertions are unchanged;
- focused tests cover both the profile and route files.

## Cross-project status

Java and mini-kv can continue in parallel. v632 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused profile/route tests passed: 2 files, 3 tests.
- Build passed.
