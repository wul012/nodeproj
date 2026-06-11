# Node v613 code walkthrough: controlled read-only shard preview handoff summary consumer

## Goal

v613 turns the v612 handoff summary digest into a first-class consumer gate.

## Type and builder

`ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumer` records the consumer decision, gate counts, blocked reason codes, digest metadata, and safety boundaries.

`createSourceMatrixHandoffSummaryConsumer(...)` checks:

- whether the input summary is ready;
- whether the digest exists;
- whether the digest scope is `read-only-handoff-summary`;
- whether audiences are fully covered;
- whether no action is required;
- whether the consumer remains read-only.

## Loader and renderer

The preview loader now builds the consumer after `sourceMatrixHandoffSummary`.

The Markdown renderer adds `## Source Matrix Handoff Summary Consumer` with the decision, gates, digest scope, and safety boundaries.

## Tests

The review-artifact test checks ready and blocked consumer decisions.

The main preview test verifies the v613/v612 profile chain and confirms the consumer digest value matches the summary digest.

The route test checks the new Markdown section remains available through the shared route table.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 9 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v613 consumes no fresh sibling evidence.
