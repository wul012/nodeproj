# v620 Controlled read-only shard preview handoff route coverage digest

## Purpose

v620 is feature version 2 of the 20-version run after v618 closeout.

v619 split handoff artifact tests. v620 adds a route coverage digest so the handoff Markdown sections are represented as a structured artifact, not only as repeated string assertions.

## Change

Added `sourceMatrixHandoffRouteCoverage` to the controlled read-only shard preview profile.

The route coverage records:

- route surface;
- source archive verification state;
- covered handoff Markdown section names;
- section count;
- coverage digest scoped to `handoff-route-markdown-sections`;
- safety boundaries.

The profile active/source/next chain is now:

- active: `Node v620`;
- source: `Node v619`;
- next: `Node v621`.

## Growth control

This version does not add a new route, approval rule, archive receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: route coverage needed a structured digest instead of scattered Markdown assertions;
- later consumer: Node v621 can verify route coverage readiness from the digest artifact;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: covered sections are fixed to the existing handoff Markdown sections.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v620 is Node-only route coverage reporting. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 12 tests.
- Build passed.

CI note:

- v620 remains local for the v619-v623 batch.
