# v624 Controlled read-only shard preview handoff route coverage archive summary

## Purpose

v624 is feature version 6 of the 20-version run after v618 closeout.

v623 verified the handoff route coverage archive snapshot. v624 summarizes that verification into stable summary lines and a digest so later receipt or closeout versions can consume one compact read-only artifact.

## Change

Added `sourceMatrixHandoffRouteCoverageArchiveSummary` to the controlled read-only shard preview profile.

The summary records:

- input verification version `Node v623`;
- verification state;
- snapshot digest value;
- summary digest scoped to `handoff-route-coverage-archive-summary-lines`;
- summary lines;
- gate counts;
- archived section count;
- blocked reason count;
- safety boundaries.

The profile active/source/next chain is now:

- active: `Node v624`;
- source: `Node v623`;
- next: `Node v625`.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: later receipt versions need a compact verified summary instead of re-reading the full archive verification object;
- later consumer: Node v625 can issue a summary receipt from stable summary lines;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: summary lines are fixed to verification state, snapshot digest, gate counts, archive count, blocked reasons, and routing activation state.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v624 is Node-only archive summary generation. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v624 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 14 tests.
- Build passed.

CI remains batched. v624 stays in the local v623-v627 batch.
