# v625 Controlled read-only shard preview handoff route coverage archive summary receipt

## Purpose

v625 is feature version 7 of the 20-version run after v618 closeout.

v624 summarized the verified handoff route coverage archive. v625 issues a receipt for that summary so the summary can be archived and verified without re-reading the full upstream route coverage chain.

## Change

Added `sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt` to the controlled read-only shard preview profile.

The receipt records:

- input summary version `Node v624`;
- summary state;
- summary digest value;
- receipt digest scoped to `handoff-route-coverage-archive-summary-receipt`;
- receipt lines;
- summary line count;
- gate counts;
- blocked reason count;
- safety boundaries.

The profile active/source/next chain is now:

- active: `Node v625`;
- source: `Node v624`;
- next: `Node v626`.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: the v624 summary needed a receipt before archive snapshotting;
- later consumer: Node v626 can archive this receipt as a compact artifact;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: receipt lines are fixed to summary state, summary digest, summary line count, blocked reasons, and routing activation state.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v625 is Node-only receipt generation. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v625 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 15 tests.
- Build passed.

CI remains batched. v625 stays in the local v623-v627 batch.
