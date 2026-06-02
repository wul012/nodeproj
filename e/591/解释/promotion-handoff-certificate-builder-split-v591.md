# v591 Promotion handoff certificate builder split

## Purpose

v591 is version 10 of the 16-version maintenance/refactor run.

After v590 moved the package artifact pair out of the main handoff builder, certificate creation and verification became the next removable lifecycle group. v591 extracts that group into its own production module.

## Change

Added `src/services/opsPromotionArchiveHandoffCertificateBuilders.ts`.

Moved these exports into the new module:

- `createOpsPromotionHandoffCertificate`;
- `createOpsPromotionHandoffCertificateVerification`.

`src/services/opsPromotionArchiveHandoffBuilders.ts` keeps the public entrypoint by re-exporting both functions from the certificate module.

## Maintenance impact

The main handoff builder dropped from 817 lines to 640 lines. The new certificate builder is 190 lines and owns package-to-certificate transition logic, certificate digest coverage, and certificate verification comparisons.

This reduces the remaining file to receipt, closure, and completion responsibilities, which makes the next splits smaller and easier to review.

## Growth control

This version adds no route, governance artifact, approval rule, or sibling evidence requirement.

It resolves a maintenance blocker: certificate logic was still mixed with downstream receipt/closure/completion orchestration even after the package split.

Java and mini-kv remain recommended parallel work. v591 is Node-only production maintenance and requires no fresh sibling evidence.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\opsPromotionHandoffCertificate.test.ts test\opsPromotionHandoffReceipt.test.ts test\opsPromotionApprovedHandoffPackageCertificate.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts`
- promotion group: 18 real `test/opsPromotion*.test.ts` files via `rg --files`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused certificate/receipt tests passed: 6 files, 16 tests.
- Promotion group passed: 18 files, 45 tests.
- Build passed.

The GitHub `Node Evidence` workflow remains the full-suite gate after push.
