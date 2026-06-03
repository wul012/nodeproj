# Node v617 code walkthrough: controlled read-only shard preview handoff summary consumer receipt archive verification

## Goal

v617 verifies the v616 handoff summary consumer receipt archive snapshot.

## Type and builder

`ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification` records:

- verification/input versions;
- ready or blocked verification state;
- gate counts;
- gate booleans;
- blocked reason codes;
- snapshot digest value;
- archived section and blocked reason counts;
- safety boundaries.

`createSourceMatrixHandoffSummaryConsumerReceiptArchiveVerification(...)` derives the verification from the snapshot only.

## Tests

The review-artifact test covers ready and blocked verification gates.

The main preview and route tests verify the v617/v616 version chain and Markdown section.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/review-artifact tests passed: 3 files, 10 tests.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v617 consumes no fresh sibling evidence.
