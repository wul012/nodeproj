# v636 Controlled read-only shard preview review decision artifact builder split

## Purpose

v636 is maintenance version 18 of the 20-version run after v618 closeout.

After v635, `ReviewArtifacts` still implemented the review checklist and review digest directly. v636 moves those decision builders into a dedicated module so `ReviewArtifacts` can serve as a stable public barrel.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewDecisionArtifacts.ts`.

Moved into the new module:

- `createSourceMatrixReviewChecklist`;
- `createSourceMatrixReviewDigest`;
- review digest covered-field constants.

`ReviewArtifacts` now only re-exports:

- source matrix flow builders;
- review decision builders;
- archive/handoff builders;
- handoff summary and route coverage builders.

Line-count impact:

- `ReviewArtifacts`: 153 lines down to 29 lines;
- new review decision module: 128 lines.

## Compatibility

Existing imports from `ReviewArtifacts` remain valid through re-export.

Checklist item content, digest covered fields, version markers, and safety boundaries are unchanged.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: the public export module still contained implementation details;
- later consumer: future review decision changes can modify a focused implementation module without changing the barrel;
- reuse decision: the same checklist/digest artifacts and public function names are preserved;
- stop condition: `ReviewArtifacts` is now a small barrel, so no further implementation should accumulate there.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v636 is Node-only production refactoring. It consumes no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v636 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused source matrix / handoff tests passed: 2 files, 4 tests.
- Build passed.

CI note:

- v636 remains inside the local v633-v637 batch before the next push/CI verification.
