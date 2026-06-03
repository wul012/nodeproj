# v611 Controlled read-only shard preview handoff summary

## Purpose

v611 is feature version 14 of the requested 20-version feature run.

v608-v610 produced handoff notes and stable digest coverage. v611 adds a compact read-only summary over those notes so later versions can consume the handoff state without scanning every note entry.

## Change

Added `sourceMatrixHandoffSummary` to the controlled read-only shard preview profile.

The summary records:

- summary/input versions;
- ready or blocked summary state;
- handoff audiences;
- action-required count;
- handoff digest value from the source notes;
- safety boundaries proving no approval, routing activation, fresh sibling evidence, services, or sibling mutations are introduced.

The profile active/source/next chain is now:

- active: `Node v611`;
- source: `Node v610`;
- next: `Node v612`.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: downstream consumers needed a compact handoff state instead of parsing four free-form note messages;
- later consumer: Node v612 can add digest/scope coverage for this summary object;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: summary growth stops at the existing note audiences and the inherited handoff digest value.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v611 is Node-only report shaping. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 8 tests.
- Build passed.

CI note:

- v611 remains local for the v608-v612 batch.
