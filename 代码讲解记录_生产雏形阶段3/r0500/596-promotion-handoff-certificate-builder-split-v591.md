# Node v591 code walkthrough: promotion handoff certificate builder split

## Goal

v591 separates the certificate artifact boundary from the remaining promotion handoff builder.

The certificate step is where package verification is converted into a certifiable handoff artifact. Keeping that beside receipt, closure, and completion logic made the original builder harder to review by lifecycle phase.

## Change

`src/services/opsPromotionArchiveHandoffCertificateBuilders.ts` now owns:

- `createOpsPromotionHandoffCertificate`;
- `createOpsPromotionHandoffCertificateVerification`.

The original `src/services/opsPromotionArchiveHandoffBuilders.ts` re-exports both functions so existing callers keep the same import path.

## Safety

This is a behavior-preserving production split.

No certificate digest field, covered field list, attachment check, package reference check, route handler, renderer, or archive shape changed.

## Verification

Focused verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\opsPromotionHandoffCertificate.test.ts test\opsPromotionHandoffReceipt.test.ts test\opsPromotionApprovedHandoffPackageCertificate.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts
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

Java and mini-kv can continue in parallel. v591 consumes no fresh sibling evidence and creates no upstream dependency.

## Next cut

The next maintenance version should split the receipt artifact pair, leaving the main handoff builder with only closure and completion after that cut.
