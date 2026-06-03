# v594 Promotion handoff completion builder split

## Purpose

v594 is version 13 of the 16-version maintenance/refactor run.

v593 left `src/services/opsPromotionArchiveHandoffBuilders.ts` with completion logic and re-exports. v594 extracts completion creation and verification into its own production module, turning the original handoff builder file into a thin public entrypoint.

## Change

Added `src/services/opsPromotionArchiveHandoffCompletionBuilders.ts`.

Moved these exports into the new module:

- `createOpsPromotionHandoffCompletion`;
- `createOpsPromotionHandoffCompletionVerification`.

`src/services/opsPromotionArchiveHandoffBuilders.ts` is now a 20-line barrel that re-exports the package, certificate, receipt, closure, and completion builder modules.

## Maintenance impact

The original handoff builder started this optimization sequence as a 1259-line production file. After v594 it is a 20-line stable entrypoint, with each artifact lifecycle step in a dedicated module.

This sharply improves review locality:

- package logic lives in the package builder;
- certificate logic lives in the certificate builder;
- receipt logic lives in the receipt builder;
- closure logic lives in the closure builder;
- completion logic lives in the completion builder;
- digest payload normalization remains in its own payload module.

## Growth control

This version adds no route, governance artifact, approval rule, or sibling evidence requirement.

It resolves a maintenance blocker: completion logic was the last implementation body still inside the public handoff builder entrypoint.

Java and mini-kv remain recommended parallel work. v594 is Node-only production maintenance and requires no fresh sibling evidence.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\opsPromotionHandoffCompletion.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts`
- promotion group: 18 real `test/opsPromotion*.test.ts` files via `rg --files`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused completion tests passed: 4 files, 13 tests.
- Promotion group passed: 18 files, 45 tests.
- Build passed.

CI note:

- v594 is part of the next batched maintenance push. GitHub `Node Evidence` will run after the batch is accumulated.
