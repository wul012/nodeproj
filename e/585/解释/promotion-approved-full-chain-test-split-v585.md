# v585 Promotion approved full-chain test split

## Purpose

v585 is version 4 of the 16-version maintenance/refactor run.

After v582-v584, the remaining promotion-local test pain was `test/opsPromotionApprovedAndList.test.ts`: a 756-line file with one very large approved full-chain test plus a small listing test.

## Change

The old file was removed and replaced with focused suites:

- `test/opsPromotionApprovedAttestation.test.ts`
- `test/opsPromotionApprovedHandoffPackageCertificate.test.ts`
- `test/opsPromotionApprovedHandoffReceiptClosure.test.ts`
- `test/opsPromotionApprovedCompletionReleaseEvidence.test.ts`
- `test/opsPromotionDecisionList.test.ts`

Shared approved-review setup now lives in:

- `test/support/opsPromotionApprovedReviewSupport.ts`

The support file only creates an approved promotion decision. Assertions remain in focused artifact tests, so the helper does not become another giant assertion bucket.

## Maintenance impact

The largest new file is 223 lines, and the setup helper is 66 lines.

The split changes the broader promotion suite from 42 to 45 tests because the old single full-chain test is now four artifact-focused tests. This is intentional: failures now identify whether the approved path broke at attestation, handoff package/certificate, receipt/closure, or completion/release evidence.

Java and mini-kv remain recommended parallel work. v585 is Node-only test maintenance and requires no fresh sibling evidence.

## Next cut

The next high-value maintenance target is `test/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts`, which is about 1700 lines and mixes route registration/count/catalog expectations for Java/mini-kv cleanup handoff surfaces.

## Verification

- `npm.cmd test -- test\opsPromotionApprovedAttestation.test.ts test\opsPromotionApprovedHandoffPackageCertificate.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts test\opsPromotionDecisionList.test.ts`
- `$files = Get-ChildItem test\opsPromotion*.test.ts | Sort-Object Name | ForEach-Object { $_.FullName }; npm.cmd test -- @files`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Result:

- Focused approved/list split passed: 5 files, 5 tests.
- Broader promotion sweep passed: 18 files, 45 tests.
- Typecheck passed.
- Build passed.

No screenshot was needed because v585 only reorganizes tests.
