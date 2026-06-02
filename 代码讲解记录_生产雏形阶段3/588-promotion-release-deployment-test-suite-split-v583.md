# Node v583 code walkthrough: promotion release/deployment test suite split

## Goal

v583 takes the largest remaining promotion test shard after v582 and splits it by lifecycle stage.

The old `test/opsPromotionReleaseDeployment.test.ts` file was useful as a broad route coverage bucket, but it was too coarse for day-to-day maintenance. Release archive behavior, deployment approval/change behavior, execution/receipt behavior, and the release audit trail are related but not the same responsibility.

## New files

`test/opsPromotionReleaseArchive.test.ts` owns:

- release evidence JSON/Markdown;
- release evidence verification JSON/Markdown;
- release archive JSON/Markdown;
- release archive verification JSON/Markdown.

`test/opsPromotionDeploymentApprovalChange.test.ts` owns:

- deployment approval JSON/Markdown;
- deployment approval verification JSON/Markdown;
- deployment change record JSON/Markdown;
- deployment change record verification JSON/Markdown.

`test/opsPromotionDeploymentExecutionReceipt.test.ts` owns:

- deployment execution record JSON/Markdown;
- deployment execution record verification JSON/Markdown;
- deployment execution receipt JSON/Markdown;
- deployment execution receipt verification JSON/Markdown.

`test/opsPromotionReleaseAuditTrail.test.ts` owns:

- release audit trail record JSON/Markdown.

## Safety

This is a no-behavior-change split. The original 13 tests remain present and keep their existing assertions.

No source route registration, service, renderer, catalog count, or evidence fixture was changed.

## Maintenance value

The release/deployment file dropped from 1790 lines to four smaller suites. The largest new file is 584 lines, which is small enough for focused review and future helper extraction.

The split also exposes the next cleanup path:

- release/archive assertions can share release digest and archive item helpers;
- approval/change assertions can share deployment readiness checks;
- execution/receipt assertions can share execution reference checks;
- the audit trail test can stay small as the terminal-stage smoke for release audit readiness.

## Verification

Focused verification:

```powershell
npm.cmd test -- test\opsPromotionReleaseArchive.test.ts test\opsPromotionDeploymentApprovalChange.test.ts test\opsPromotionDeploymentExecutionReceipt.test.ts test\opsPromotionReleaseAuditTrail.test.ts
```

Result:

- 4 files passed.
- 13 tests passed.

Broader promotion verification:

```powershell
$files = Get-ChildItem test\opsPromotion*.test.ts | Sort-Object Name | ForEach-Object { $_.FullName }
npm.cmd test -- @files
npm.cmd run typecheck
npm.cmd run build
```

Result:

- 10 promotion files passed.
- 42 tests passed.
- Typecheck passed.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v583 is Node-only maintenance and does not request new sibling project evidence.
