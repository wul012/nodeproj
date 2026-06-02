# v583 Promotion release/deployment test suite split

## Purpose

v583 is version 2 of the 16-version maintenance/refactor run. It continues the v582 test-suite cleanup and does not add product behavior, routes, evidence contracts, screenshots, or upstream dependencies.

After v582, the largest remaining promotion test shard was `test/opsPromotionReleaseDeployment.test.ts` at 1790 lines. It still mixed release archive concerns, deployment approval/change concerns, deployment execution/receipt concerns, and release audit trail concerns.

## Change

The old release/deployment aggregate file was removed and replaced by four focused suites:

- `test/opsPromotionReleaseArchive.test.ts` covers release evidence and release archive routes.
- `test/opsPromotionDeploymentApprovalChange.test.ts` covers deployment approval and deployment change routes.
- `test/opsPromotionDeploymentExecutionReceipt.test.ts` covers deployment execution record and execution receipt routes.
- `test/opsPromotionReleaseAuditTrail.test.ts` covers the final release audit trail route.

The split is mechanical. All 13 original tests remain present, and the largest resulting file is 584 lines instead of 1790 lines.

## Maintenance impact

This split makes the next refactor passes smaller:

- release/archive helper extraction can happen without scanning deployment receipt assertions;
- approval/change checks can be normalized separately from execution/receipt checks;
- audit trail behavior is isolated in a small terminal-stage test;
- future failures now point to the lifecycle phase in the filename.

Java and mini-kv remain recommended parallel work. v583 asks for no fresh sibling evidence and creates no cross-project gate.

## Next cut

The next high-value cut is `test/opsPromotionHandoff.test.ts`, currently about 1209 lines. It can be split into package/certificate, receipt/closure, and completion suites before extracting repeated handoff assertions.

## Verification

- `npm.cmd test -- test\opsPromotionReleaseArchive.test.ts test\opsPromotionDeploymentApprovalChange.test.ts test\opsPromotionDeploymentExecutionReceipt.test.ts test\opsPromotionReleaseAuditTrail.test.ts`
- `$files = Get-ChildItem test\opsPromotion*.test.ts | Sort-Object Name | ForEach-Object { $_.FullName }; npm.cmd test -- @files`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Result:

- Focused release/deployment split passed: 4 files, 13 tests.
- Broader promotion sweep passed: 10 files, 42 tests.
- Typecheck passed.
- Build passed.

No screenshot was needed because v583 only reorganizes tests.
