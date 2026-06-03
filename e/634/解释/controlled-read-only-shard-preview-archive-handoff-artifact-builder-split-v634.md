# v634 Controlled read-only shard preview archive handoff artifact builder split

## Purpose

v634 is maintenance version 16 of the 20-version run after v618 closeout.

After v633 moved route coverage builders out of the handoff builder, `ReviewArtifacts` still mixed two responsibilities: source matrix review construction and archive/handoff export construction.

v634 moves the archive snapshot, summary export, and handoff notes builders into a dedicated archive handoff module.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewArchiveHandoffArtifacts.ts`.

Moved into the new module:

- `createSourceMatrixArchiveSnapshot`;
- `createSourceMatrixArchiveSnapshotSummaryExport`;
- `createSourceMatrixHandoffNotes`;
- archive section constants for the source matrix review snapshot.

Kept in `ReviewArtifacts`:

- source matrix consumer;
- source matrix drift summary;
- source matrix review checklist;
- source matrix review digest;
- re-exports for the moved archive/handoff builders.

Line-count impact:

- `ReviewArtifacts`: 420 lines down to 294 lines;
- new archive/handoff module: 135 lines.

## Compatibility

Existing imports remain valid because `ReviewArtifacts` re-exports the moved functions.

The source matrix pipeline still assembles the same artifact graph, but archive handoff maintenance is now isolated from drift/checklist maintenance.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: archive handoff builders were coupled to source matrix drift/checklist builders in a growing module;
- later consumer: archive export and handoff note changes can now land without touching the matrix review code;
- reuse decision: existing digest scopes, artifact versions, and exports are preserved;
- stop condition: only module ownership changed, and no new archive layer was added.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v634 is Node-only production refactoring. It consumes no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v634 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifactStability.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused source matrix / handoff artifact tests passed: 3 files, 11 tests.
- Build passed.

CI note:

- v634 remains inside the local v633-v637 batch before the next push/CI verification.
