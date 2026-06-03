# Node v618 code walkthrough: controlled read-only shard preview handoff artifact builder split

## Goal

v618 separates handoff artifact builders from the shared review artifact module.

## Refactor

The new `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.ts` owns the handoff summary, consumer, export, receipt, archive snapshot, and archive verification builders.

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` keeps base source matrix, drift, checklist, digest, archive snapshot, summary export, and handoff notes builders. It re-exports the new handoff builders to preserve the existing public import path.

## Maintainability result

`ReviewArtifacts` dropped from 712 lines to 434 lines.

The new handoff artifact module is 292 lines and has one responsibility: post-handoff artifact shaping and verification.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 10 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v618 consumes no fresh sibling evidence.
