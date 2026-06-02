# v584 Promotion handoff test suite split

## Purpose

v584 is version 3 of the 16-version maintenance/refactor run. It continues the promotion test decomposition after v582 and v583.

The target was `test/opsPromotionHandoff.test.ts`, a 1209-line file with package, certificate, receipt, closure, and completion responsibilities in one suite.

## Change

The old aggregate file was removed and replaced by five focused suites:

- `test/opsPromotionHandoffPackage.test.ts`
- `test/opsPromotionHandoffCertificate.test.ts`
- `test/opsPromotionHandoffReceipt.test.ts`
- `test/opsPromotionHandoffClosure.test.ts`
- `test/opsPromotionHandoffCompletion.test.ts`

Each file owns the build/verify pair for one handoff lifecycle artifact. All 10 original tests remain present.

The largest resulting file is 267 lines.

## Maintenance impact

This removes the last large handoff test bucket and makes future helper extraction easier:

- package and certificate checks can share package/certificate digest helpers;
- receipt and closure checks can share milestone/reference helpers;
- completion checks can stay isolated as the bridge into release evidence;
- failures now identify the exact handoff artifact in the filename.

Java and mini-kv remain recommended parallel work. v584 is Node-only test organization and requires no fresh sibling evidence.

## Next cut

The next promotion-local cut should address `test/opsPromotionApprovedAndList.test.ts`. Its approved full-chain test is still long and mixes local evidence setup, approved review assertions, handoff assertions, release evidence assertions, and list/retrieve behavior.

## Verification

- `npm.cmd test -- test\opsPromotionHandoffPackage.test.ts test\opsPromotionHandoffCertificate.test.ts test\opsPromotionHandoffReceipt.test.ts test\opsPromotionHandoffClosure.test.ts test\opsPromotionHandoffCompletion.test.ts`
- `$files = Get-ChildItem test\opsPromotion*.test.ts | Sort-Object Name | ForEach-Object { $_.FullName }; npm.cmd test -- @files`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Result:

- Focused handoff split passed: 5 files, 10 tests.
- Broader promotion sweep passed: 14 files, 42 tests.
- Typecheck passed.
- Build passed.

No screenshot was needed because v584 only reorganizes tests.
