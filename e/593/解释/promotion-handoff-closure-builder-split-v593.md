# v593 Promotion handoff closure builder split

## Purpose

v593 is version 12 of the 16-version maintenance/refactor run.

After v592 moved receipt creation and verification into a dedicated module, closure became the next standalone handoff artifact boundary. v593 extracts closure creation and verification so the remaining handoff builder only owns completion logic.

## Change

Added `src/services/opsPromotionArchiveHandoffClosureBuilders.ts`.

Moved these exports into the new module:

- `createOpsPromotionHandoffClosure`;
- `createOpsPromotionHandoffClosureVerification`.

`src/services/opsPromotionArchiveHandoffBuilders.ts` re-exports both functions so routes, profile builders, and bundle exports keep the same public import path.

## Maintenance impact

The main handoff builder dropped from 442 lines to 218 lines. The new closure builder is 231 lines and owns receipt-to-closure transition logic, closure item checks, closure digest coverage, and closure verification comparisons.

This leaves the original handoff builder with completion logic and re-exports only, making the final completion split straightforward.

## Growth control

This version adds no route, governance artifact, approval rule, or sibling evidence requirement.

It resolves a maintenance blocker: closure logic was still mixed with completion logic even though closure has a full create/verify boundary.

Java and mini-kv remain recommended parallel work. v593 is Node-only production maintenance and requires no fresh sibling evidence.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\opsPromotionHandoffClosure.test.ts test\opsPromotionHandoffCompletion.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts`
- promotion group: 18 real `test/opsPromotion*.test.ts` files via `rg --files`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused closure/completion tests passed: 6 files, 16 tests.
- Promotion group passed: 18 files, 45 tests.
- Build passed.

CI note:

- v593 is part of the next batched maintenance push. GitHub `Node Evidence` will run after the batch is accumulated.
