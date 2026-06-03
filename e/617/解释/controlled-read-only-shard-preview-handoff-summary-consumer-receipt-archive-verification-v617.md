# v617 Controlled read-only shard preview handoff summary consumer receipt archive verification

## Purpose

v617 is feature version 5 of the 20-version continuous feature run.

v616 archived the receipt snapshot. v617 verifies that snapshot with explicit gates before the batch is pushed for CI.

## Change

Added `sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification` to the controlled read-only shard preview profile.

The verification checks:

- snapshot readiness;
- snapshot digest presence;
- archived section completeness;
- raw credential exclusion;
- runtime payload exclusion;
- read-only verification boundary.

The profile active/source/next chain is now:

- active: `Node v617`;
- source: `Node v616`;
- next: `Node v618`.

## Growth control

This version does not add a new route, approval rule, archive receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: archive snapshot needs explicit gate verification before further refactor work;
- later consumer: Node v618 can split artifact builders with verification coverage in place;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: verification is limited to digest presence, section count, credential/runtime exclusions, and read-only boundary.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v617 is Node-only archive verification. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 10 tests.
- Build passed.

CI note:

- v617 closes the local v613-v617 batch for push/CI verification.
