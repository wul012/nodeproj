# v612 Controlled read-only shard preview handoff summary digest

## Purpose

v612 is feature version 15 of the requested 20-version feature run.

v611 added a compact handoff summary. v612 adds a stable digest over that summary so later consumers can verify the summary state without re-parsing the full handoff notes.

## Change

Added `summaryDigest` to `sourceMatrixHandoffSummary`.

The digest records:

- algorithm: `sha256`;
- scope: `read-only-handoff-summary`;
- stable digest value;
- covered audience count;
- covered action-required count.

The profile active/source/next chain is now:

- active: `Node v612`;
- source: `Node v611`;
- next: `Node v613`.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: the handoff summary needed a stable integrity marker before downstream consumer coverage;
- later consumer: Node v613 can consume the summary digest as a compact readiness proof;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: digest coverage is limited to summary state, audiences, action counts, inherited note digest, and safety boundaries.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v612 is Node-only digest coverage. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 9 tests.
- Build passed.

CI note:

- v612 closes the local v608-v612 batch for push/CI verification.
