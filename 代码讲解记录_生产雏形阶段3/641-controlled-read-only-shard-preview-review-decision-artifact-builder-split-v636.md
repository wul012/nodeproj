# Node v636 code walkthrough: controlled read-only shard preview review decision artifact builder split

## Goal

v636 turns `ReviewArtifacts` into a stable public barrel and moves review decision implementation into its own module.

## Split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionArtifacts.ts` now owns:

- source matrix review checklist;
- source matrix review digest;
- digest covered-field list.

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` now only re-exports artifact builders from focused implementation modules.

## Behavior

This is a production organization refactor:

- checklist item order and messages are unchanged;
- digest material is unchanged;
- artifact version markers remain v601 and v602;
- existing import paths continue to work.

## Cross-project status

Java and mini-kv can continue in parallel. v636 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused source matrix / handoff tests passed: 2 files, 4 tests.
- Build passed.
