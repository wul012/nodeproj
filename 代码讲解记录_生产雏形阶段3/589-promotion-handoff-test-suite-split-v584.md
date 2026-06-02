# Node v584 code walkthrough: promotion handoff test suite split

## Goal

v584 reduces the remaining handoff test bucket after the v582 and v583 splits.

The old `test/opsPromotionHandoff.test.ts` file had five handoff artifact families in one 1209-line suite. That made failures harder to isolate because package, certificate, receipt, closure, and completion assertions all lived under the same filename.

## New files

`test/opsPromotionHandoffPackage.test.ts` owns:

- handoff package JSON/Markdown;
- handoff package verification JSON/Markdown.

`test/opsPromotionHandoffCertificate.test.ts` owns:

- handoff certificate JSON/Markdown;
- handoff certificate verification JSON/Markdown.

`test/opsPromotionHandoffReceipt.test.ts` owns:

- handoff receipt JSON/Markdown;
- handoff receipt verification JSON/Markdown.

`test/opsPromotionHandoffClosure.test.ts` owns:

- handoff closure JSON/Markdown;
- handoff closure verification JSON/Markdown.

`test/opsPromotionHandoffCompletion.test.ts` owns:

- handoff completion JSON/Markdown;
- handoff completion verification JSON/Markdown.

## Safety

This is a mechanical split. The original 10 tests remain present, and no assertion was intentionally changed.

No production source, route catalog, evidence fixture, renderer, or service code changed.

## Maintenance value

The handoff test surface is now shaped like the actual handoff lifecycle. The largest new file is 267 lines, so future cleanup can happen without reopening a thousand-line test body.

This split also prepares the next helper work:

- package/certificate digest assertion helpers;
- receipt/closure milestone helpers;
- completion closeout readiness helpers;
- shared Markdown content assertions.

## Verification

Focused handoff verification:

```powershell
npm.cmd test -- test\opsPromotionHandoffPackage.test.ts test\opsPromotionHandoffCertificate.test.ts test\opsPromotionHandoffReceipt.test.ts test\opsPromotionHandoffClosure.test.ts test\opsPromotionHandoffCompletion.test.ts
```

Result:

- 5 files passed.
- 10 tests passed.

Broader promotion verification:

```powershell
$files = Get-ChildItem test\opsPromotion*.test.ts | Sort-Object Name | ForEach-Object { $_.FullName }
npm.cmd test -- @files
npm.cmd run typecheck
npm.cmd run build
```

Result:

- 14 promotion files passed.
- 42 tests passed.
- Typecheck passed.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v584 consumes no fresh sibling evidence and adds no cross-project approval gate.
