# Node v635 code walkthrough: controlled read-only shard preview source matrix flow artifact builder split

## Goal

v635 separates source matrix comparison and drift summary construction from the review checklist/digest module.

## Split

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.ts` now owns:

- required source normalization;
- source matrix consumer gates;
- consumer blocked reasons;
- controlled drift findings;
- source matrix drift summary.

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` now owns:

- review checklist;
- review digest;
- public re-exports for the other artifact modules.

## Behavior

This is a production organization refactor:

- consumer gate names are unchanged;
- blocked reason codes are unchanged;
- drift finding messages are unchanged;
- artifact versions remain v599 and v600 for the moved builders;
- imports from the previous public module still work.

## Cross-project status

Java and mini-kv can continue in parallel. v635 consumes no fresh sibling evidence and starts no sibling services.

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
