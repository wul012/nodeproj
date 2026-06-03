# v635 Controlled read-only shard preview source matrix flow artifact builder split

## Purpose

v635 is maintenance version 17 of the 20-version run after v618 closeout.

After v634, `ReviewArtifacts` still mixed source comparison and review checklist digest responsibilities. v635 moves the source matrix consumer and drift summary builders into a dedicated flow module.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.ts`.

Moved into the new module:

- `createSourceMatrixConsumer`;
- `createSourceMatrixDriftSummary`;
- source matrix required-source constants;
- consumer blocked-reason helper;
- comparable drift finding helper;
- source normalization helper.

Kept in `ReviewArtifacts`:

- source matrix review checklist;
- source matrix review digest;
- re-exports for the moved source matrix flow builders;
- re-exports for archive/handoff and handoff route coverage builders.

Line-count impact:

- `ReviewArtifacts`: 294 lines down to 153 lines;
- new source matrix flow module: 148 lines.

## Compatibility

Existing imports from `ReviewArtifacts` remain valid through re-export.

The source comparison behavior, drift finding messages, and blocked reason codes are unchanged.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: source comparison and review digest construction were coupled in one growing module;
- later consumer: drift comparison can now evolve independently from checklist/digest archive formatting;
- reuse decision: existing artifact types, version markers, and exported function names are preserved;
- stop condition: only module ownership changed, and no new readiness or receipt layer was added.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v635 is Node-only production refactoring. It consumes no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v635 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused source matrix / handoff tests passed: 2 files, 4 tests.
- Build passed.

CI note:

- v635 remains inside the local v633-v637 batch before the next push/CI verification.
