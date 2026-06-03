# Node v615 code walkthrough: controlled read-only shard preview handoff summary consumer receipt

## Goal

v615 creates a receipt from the v614 handoff summary consumer export.

## Type and builder

`ControlledReadOnlyShardPreviewSourceMatrixHandoffSummaryConsumerReceipt` records:

- receipt/input versions;
- ready or blocked receipt state;
- source export state;
- source export digest value;
- receipt digest;
- fixed receipt lines;
- export and blocked reason counts;
- safety boundaries.

`createSourceMatrixHandoffSummaryConsumerReceipt(...)` derives the receipt entirely from the export object. It does not start services, activate routing, request approval, or require fresh sibling evidence.

## Renderer and tests

The Markdown renderer adds `## Source Matrix Handoff Summary Consumer Receipt`.

The tests cover ready and blocked receipts, digest shape, receipt lines, and route Markdown visibility.

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

Java and mini-kv can continue in parallel. v615 consumes no fresh sibling evidence.
