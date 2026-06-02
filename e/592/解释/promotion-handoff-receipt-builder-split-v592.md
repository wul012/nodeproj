# v592 Promotion handoff receipt builder split

## Purpose

v592 is version 11 of the 16-version maintenance/refactor run.

After v591 extracted the certificate artifact pair, receipt creation and verification became the next independent lifecycle group. v592 moves that pair into a dedicated production module.

## Change

Added `src/services/opsPromotionArchiveHandoffReceiptBuilders.ts`.

Moved these exports into the new module:

- `createOpsPromotionHandoffReceipt`;
- `createOpsPromotionHandoffReceiptVerification`.

`src/services/opsPromotionArchiveHandoffBuilders.ts` re-exports both functions so callers keep using the same public handoff builder entrypoint.

## Maintenance impact

The main handoff builder dropped from 640 lines to 442 lines. The new receipt builder is 207 lines and owns certificate-to-receipt transition logic, milestone checks, receipt digest coverage, and receipt verification comparisons.

The remaining main builder now starts at closure and only contains closure/completion logic. That makes the next two production splits direct and low-risk.

## Growth control

This version adds no route, governance artifact, approval rule, or sibling evidence requirement.

It resolves a maintenance blocker: receipt logic was still embedded in the same file as closure/completion logic, even though receipt has a complete create/verify boundary.

Java and mini-kv remain recommended parallel work. v592 is Node-only production maintenance and requires no fresh sibling evidence.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\opsPromotionHandoffReceipt.test.ts test\opsPromotionHandoffClosure.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts`
- promotion group: 18 real `test/opsPromotion*.test.ts` files via `rg --files`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused receipt/closure tests passed: 6 files, 16 tests.
- Promotion group passed: 18 files, 45 tests.
- Build passed.

The GitHub `Node Evidence` workflow remains the full-suite gate after push.
