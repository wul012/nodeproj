# Node v593 code walkthrough: promotion handoff closure builder split

## Goal

v593 separates the closure artifact boundary from the remaining promotion handoff builder.

The closure step turns verified receipt evidence into closure items and closeout readiness signals. That responsibility is distinct from completion, so it now lives in its own module.

## Change

`src/services/opsPromotionArchiveHandoffClosureBuilders.ts` now owns:

- `createOpsPromotionHandoffClosure`;
- `createOpsPromotionHandoffClosureVerification`.

The original `src/services/opsPromotionArchiveHandoffBuilders.ts` re-exports both functions to preserve the existing public import path.

## Safety

This is a behavior-preserving production split.

No closure digest field, covered field list, closure item check, receipt/certificate/package reference check, route handler, renderer, or archive shape changed.

## Verification

Focused verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\opsPromotionHandoffClosure.test.ts test\opsPromotionHandoffCompletion.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts
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

Java and mini-kv can continue in parallel. v593 consumes no fresh sibling evidence and creates no upstream dependency.

## Next cut

The next maintenance version should split completion creation and verification into a dedicated completion builder, then turn `opsPromotionArchiveHandoffBuilders.ts` into a thin handoff builder barrel.
