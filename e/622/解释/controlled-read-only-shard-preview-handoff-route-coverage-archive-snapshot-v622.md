# v622 Controlled read-only shard preview handoff route coverage archive snapshot

## Purpose

v622 is feature version 4 of the 20-version run after v618 closeout.

v621 verified the handoff route coverage digest. v622 archives that verified coverage into a snapshot so the route coverage can be retained as a compact read-only artifact.

## Change

Added `sourceMatrixHandoffRouteCoverageArchiveSnapshot` to the controlled read-only shard preview profile.

The snapshot records:

- source coverage digest value;
- snapshot digest scoped to `handoff-route-coverage-archive-snapshot`;
- archived section names;
- verification gate counts;
- safety boundaries.

The profile active/source/next chain is now:

- active: `Node v622`;
- source: `Node v621`;
- next: `Node v623`.

## Growth control

This version does not add a new route, approval rule, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: verified route coverage needed archive snapshot retention before a final route-coverage verifier;
- later consumer: Node v623 can verify the archive snapshot gates;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: archived sections are fixed to route coverage and route coverage verification.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v622 is Node-only route coverage archive snapshotting. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 12 tests.
- Build passed.

CI note:

- v622 closes the local v618-v622 batch for push/CI verification.
