# v613 Controlled read-only shard preview handoff summary consumer

## Purpose

v613 is feature version 1 of the new 20-version continuous feature run.

v612 added a stable digest to the handoff summary. v613 adds a consumer gate so later versions can depend on an explicit readiness decision instead of re-checking individual summary fields.

## Change

Added `sourceMatrixHandoffSummaryConsumer` to the controlled read-only shard preview profile.

The consumer checks:

- input summary readiness;
- summary digest presence;
- summary digest scope;
- audience coverage;
- action-required count;
- read-only consumer boundary.

The profile active/source/next chain is now:

- active: `Node v613`;
- source: `Node v612`;
- next: `Node v614`.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: downstream handoff export needs a single consumer decision instead of duplicated digest checks;
- later consumer: Node v614 can export the consumer state as a compact read-only handoff artifact;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: the consumer stops at summary digest and audience/action gates.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v613 is Node-only consumer gating. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 9 tests.
- Build passed.

CI note:

- v613 remains local for the v613-v617 batch.
