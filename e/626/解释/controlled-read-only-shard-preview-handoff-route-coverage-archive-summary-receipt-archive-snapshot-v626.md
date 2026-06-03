# v626 Controlled read-only shard preview handoff route coverage archive summary receipt archive snapshot

## Purpose

v626 is feature version 8 of the 20-version run after v618 closeout.

v625 issued the archive summary receipt. v626 archives that receipt into a compact snapshot so the receipt can be verified without re-reading the full summary chain.

## Change

Added `sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot` to the controlled read-only shard preview profile.

The snapshot records:

- input receipt version `Node v625`;
- receipt digest value;
- snapshot digest scoped to `handoff-route-coverage-archive-summary-receipt-archive-snapshot`;
- archived section names;
- receipt and summary line counts;
- blocked reason count;
- raw credential/runtime payload exclusion flags;
- safety boundaries.

The profile active/source/next chain is now:

- active: `Node v626`;
- source: `Node v625`;
- next: `Node v627`.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: the v625 receipt needed snapshot retention before archive verification;
- later consumer: Node v627 can verify this snapshot's gates;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: archived sections are fixed to archive summary and archive summary receipt.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v626 is Node-only receipt archive snapshotting. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v626 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 16 tests.
- Build passed.

CI remains batched. v626 stays in the local v623-v627 batch.
