# v614 Controlled read-only shard preview handoff summary consumer export

## Purpose

v614 is feature version 2 of the 20-version continuous feature run.

v613 added a consumer decision for the handoff summary. v614 exports that consumer state as stable summary lines with a digest, giving later receipt/archive versions a compact read-only artifact.

## Change

Added `sourceMatrixHandoffSummaryConsumerExport` to the controlled read-only shard preview profile.

The export records:

- consumer decision;
- inherited summary digest value;
- passed gate ratio;
- blocked reason summary;
- routing activation boundary;
- export digest scoped to `handoff-summary-consumer-export-lines`.

The profile active/source/next chain is now:

- active: `Node v614`;
- source: `Node v613`;
- next: `Node v615`.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: receipt generation needs a stable export payload rather than direct consumer object parsing;
- later consumer: Node v615 can create a receipt from the export digest;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: export lines are fixed to decision, digest, gate ratio, blocked reasons, and routing activation boundary.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v614 is Node-only export shaping. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 9 tests.
- Build passed.

CI note:

- v614 remains local for the v613-v617 batch.
