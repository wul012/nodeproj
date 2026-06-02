# v589 Promotion handoff digest payload split

## Purpose

v589 is version 8 of the 16-version maintenance/refactor run.

The promotion handoff builder had grown into a 1259-line production file that mixed two responsibilities:

- orchestration for package, certificate, receipt, closure, and completion artifacts;
- digest payload normalization for the same artifact chain.

This cut extracts the digest payload normalization into a dedicated module so the handoff builder can focus on artifact construction and verification.

## Change

Added `src/services/opsPromotionArchiveHandoffDigestPayloads.ts`.

Moved these payload builders into the new module:

- `archiveHandoffPackageDigestPayload`;
- `archiveHandoffCertificateDigestPayload`;
- `archiveHandoffReceiptDigestPayload`;
- `archiveHandoffClosureDigestPayload`;
- `archiveHandoffCompletionDigestPayload`.

The original `opsPromotionArchiveHandoffBuilders.ts` now imports those helpers and no longer carries unrelated deployment/release imports left over from the larger archive builder family.

## Maintenance impact

The production handoff builder dropped from 1259 lines to 988 lines. The extracted module is 213 lines and owns one narrow concern: stable digest input shape.

This makes future changes safer because reviewers can inspect digest coverage separately from artifact orchestration, and later splits can cut package/certificate/receipt/closure/completion builder groups without dragging the payload mapping code through every move.

## Growth control

This is not a new governance chain, route, receipt, or approval layer.

It resolves a maintainability blocker: a production builder file was large enough that adding or reviewing handoff logic required scanning unrelated payload mapping details.

The next stop condition is clear: continue splitting only while a file still mixes distinct artifact responsibilities or repeats assertion/setup patterns. Do not add new archive layers during this maintenance run.

Java and mini-kv remain recommended parallel work. v589 is Node-only production maintenance and requires no fresh sibling evidence.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\opsPromotionHandoffPackage.test.ts test\opsPromotionHandoffCertificate.test.ts test\opsPromotionHandoffReceipt.test.ts test\opsPromotionHandoffClosure.test.ts test\opsPromotionHandoffCompletion.test.ts test\opsPromotionApprovedHandoffPackageCertificate.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts`
- promotion group: 18 real `test/opsPromotion*.test.ts` files via `rg --files`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused handoff/approved tests passed: 8 files, 13 tests.
- Promotion group passed: 18 files, 45 tests.
- Build passed.

Note: a local full `npm test -- --maxWorkers=4` exceeded the 4-minute local command budget without assertion output. The GitHub `Node Evidence` workflow runs the full `npm test` on push, so v589 uses CI as the full-suite gate.
