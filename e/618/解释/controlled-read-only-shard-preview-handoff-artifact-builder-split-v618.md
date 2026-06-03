# v618 Controlled read-only shard preview handoff artifact builder split

## Purpose

v618 closes the current maintenance version before the next 20-version run.

v613-v617 added the handoff summary consumer/export/receipt/archive/verification chain. That pushed the shared review artifact file past 700 lines. v618 splits those handoff builders into a dedicated module while preserving the public import path.

## Change

Added `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.ts`.

Moved these builders into the new module:

- `createSourceMatrixHandoffSummary`;
- `createSourceMatrixHandoffSummaryConsumer`;
- `createSourceMatrixHandoffSummaryConsumerExport`;
- `createSourceMatrixHandoffSummaryConsumerReceipt`;
- `createSourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot`;
- `createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification`.

The original review artifact module now re-exports these builders, so existing loader/tests do not need broad import rewrites.

The profile active/source/next chain is now:

- active: `Node v618`;
- source: `Node v617`;
- next: `Node v619`.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: `ReviewArtifacts` had grown to 712 lines and mixed base matrix review with handoff consumer/receipt responsibilities;
- later consumer: Node v619 can split tests with artifact responsibilities already separated;
- reuse decision: existing exports are preserved to avoid churn in route/loader callers;
- stop condition: this split isolates only handoff artifact builders; renderer and service wiring remain unchanged.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v618 is Node-only maintainability work. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 10 tests.
- Build passed.

CI note:

- v618 will start the next local batch after current-version closeout.
