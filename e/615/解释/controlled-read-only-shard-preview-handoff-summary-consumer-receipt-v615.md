# v615 Controlled read-only shard preview handoff summary consumer receipt

## Purpose

v615 is feature version 3 of the 20-version continuous feature run.

v614 exported the handoff summary consumer state. v615 creates a receipt from that export so later versions can archive and verify a stable read-only handoff artifact.

## Change

Added `sourceMatrixHandoffSummaryConsumerReceipt` to the controlled read-only shard preview profile.

The receipt records:

- export state;
- export digest value;
- receipt digest scoped to `handoff-summary-consumer-receipt`;
- receipt lines;
- export line count;
- blocked reason count;
- safety boundaries.

The profile active/source/next chain is now:

- active: `Node v615`;
- source: `Node v614`;
- next: `Node v616`.

## Growth control

This version does not add a new route, approval rule, archive verifier, or sibling evidence requirement.

Necessity proof:

- blocker resolved: archive versions need a receipt-shaped artifact instead of raw export fields;
- later consumer: Node v616 can add focused digest stability coverage before archive snapshotting;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: receipt lines are fixed to export state, export digest, export lines, blocked reasons, and routing activation boundary.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v615 is Node-only receipt shaping. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 9 tests.
- Build passed.

CI note:

- v615 remains local for the v613-v617 batch.
