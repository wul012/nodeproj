# Node v592 code walkthrough: promotion handoff receipt builder split

## Goal

v592 separates the receipt artifact boundary from the remaining promotion handoff builder.

The receipt step owns the transition from verified certificate evidence into milestone-backed handoff receipt evidence. That is a distinct responsibility from closure and completion, so it belongs in its own module.

## Change

`src/services/opsPromotionArchiveHandoffReceiptBuilders.ts` now owns:

- `createOpsPromotionHandoffReceipt`;
- `createOpsPromotionHandoffReceiptVerification`.

The original `src/services/opsPromotionArchiveHandoffBuilders.ts` re-exports both functions so routes, profile builders, and bundle exports keep the same import path.

## Safety

This is a behavior-preserving production split.

No receipt digest field, covered field list, milestone check, certificate/package reference check, route handler, renderer, or archive shape changed.

## Verification

Focused verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\opsPromotionHandoffReceipt.test.ts test\opsPromotionHandoffClosure.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts
```

Result:

- Typecheck passed.
- 6 focused files passed.
- 16 focused tests passed.

Promotion-domain verification:

```powershell
$files = rg --files test | Where-Object { $_ -match '^test[\\/]opsPromotion.*\.test\.ts$' }; npm.cmd test -- @files --maxWorkers=4
```

Result:

- 18 promotion files passed.
- 45 promotion tests passed.

Build:

```powershell
npm.cmd run build
```

Result:

- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v592 consumes no fresh sibling evidence and creates no upstream dependency.

## Next cut

The next maintenance version should split the closure artifact pair. After that, the original handoff builder will only retain completion logic and can be turned into a thin barrel or final completion module.
