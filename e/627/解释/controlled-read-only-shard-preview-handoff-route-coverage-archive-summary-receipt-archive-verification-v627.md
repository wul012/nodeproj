# v627 Controlled read-only shard preview handoff route coverage archive summary receipt archive verification

## Purpose

v627 is feature version 9 of the 20-version run after v618 closeout.

v626 archived the route coverage archive summary receipt. v627 verifies that archive snapshot so the v623-v627 local batch can be pushed and checked as one CI unit.

## Change

Added `sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification` to the controlled read-only shard preview profile.

The verification records:

- input snapshot version `Node v626`;
- snapshot digest value;
- archive section count;
- receipt and summary line counts;
- blocked reason count;
- blocked reason codes;
- safety boundaries.

The verification gates are:

- snapshot ready;
- snapshot digest present;
- archived sections complete;
- raw credential excluded;
- runtime payload excluded;
- no routing activation required;
- no fresh sibling evidence required;
- read-only verification only.

The profile active/source/next chain is now:

- active: `Node v627`;
- source: `Node v626`;
- next: `Node v628`.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: the v626 snapshot needed a final read-only verification before the batch can close;
- later consumer: Node v628 can close out or prepare the next batch from a verified receipt archive;
- reuse decision: the existing controlled read-only preview route remains the only JSON/Markdown surface;
- stop condition: verification only checks the fixed v626 snapshot fields and does not expand the archive section list.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v627 is Node-only archive verification. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v627 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 17 tests.
- Build passed.

CI note:

- v627 closes the local v623-v627 batch for push/CI verification.
