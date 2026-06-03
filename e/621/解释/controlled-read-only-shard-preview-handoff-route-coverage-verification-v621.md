# v621 Controlled read-only shard preview handoff route coverage verification

## Purpose

v621 is feature version 3 of the 20-version run after v618 closeout.

v620 added a structured handoff route coverage digest. v621 adds verification gates so the coverage artifact can be consumed without re-checking individual route fields.

## Change

Added `sourceMatrixHandoffRouteCoverageVerification` to the controlled read-only shard preview profile.

The verification checks:

- route coverage readiness;
- coverage digest presence;
- covered section count consistency;
- routing activation remains unnecessary;
- fresh sibling evidence remains unnecessary;
- read-only verification boundary.

The profile active/source/next chain is now:

- active: `Node v621`;
- source: `Node v620`;
- next: `Node v622`.

## Growth control

This version does not add a new route, approval rule, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: the route coverage digest needed explicit gate verification before archive snapshotting;
- later consumer: Node v622 can archive the verified route coverage artifact;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: verification is limited to coverage readiness, digest presence, section count, and read-only boundaries.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v621 is Node-only route coverage verification. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 12 tests.
- Build passed.

CI note:

- v621 remains local for the v619-v623 batch.
