# v590 Promotion handoff package builder split

## Purpose

v590 is version 9 of the 16-version maintenance/refactor run.

After v589 extracted digest payload normalization, the handoff builder still carried the full package create/verification pair together with certificate, receipt, closure, and completion orchestration. v590 cuts the package artifact boundary out into its own production module.

## Change

Added `src/services/opsPromotionArchiveHandoffPackageBuilders.ts`.

Moved these exports into the new module:

- `createOpsPromotionHandoffPackage`;
- `createOpsPromotionHandoffPackageVerification`.

`src/services/opsPromotionArchiveHandoffBuilders.ts` now re-exports those functions from the package module, so existing callers continue importing from the same public handoff builder entrypoint.

## Maintenance impact

The main handoff builder dropped from 988 lines to 817 lines. The new package builder is 182 lines and owns the first artifact boundary in the handoff chain.

This makes the remaining file easier to split by lifecycle step. Package construction now sits next to package verification, and certificate logic starts at the top of the original handoff builder without unrelated package setup above it.

## Growth control

This version adds no new governance surface, route, artifact type, or approval rule.

It resolves a maintenance blocker: the first handoff artifact group was still embedded in a multi-artifact production file, which made later package-specific review and certificate-specific review harder than necessary.

Java and mini-kv remain recommended parallel work. v590 is Node-only production maintenance and requires no fresh sibling evidence.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\opsPromotionHandoffPackage.test.ts test\opsPromotionHandoffCertificate.test.ts test\opsPromotionApprovedHandoffPackageCertificate.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts`
- promotion group: 18 real `test/opsPromotion*.test.ts` files via `rg --files`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused package/certificate tests passed: 5 files, 15 tests.
- Promotion group passed: 18 files, 45 tests.
- Build passed.

The GitHub `Node Evidence` workflow remains the full-suite gate after push.
