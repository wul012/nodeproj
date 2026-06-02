# Node v585 code walkthrough: promotion approved full-chain test split

## Goal

v585 removes the last large promotion-local test file.

The old `test/opsPromotionApprovedAndList.test.ts` file had one long approved-path test that prepared local evidence, recorded an approved decision, read attestation routes, read handoff routes, read release evidence routes, and then asserted everything in one body.

## Setup Helper

`test/support/opsPromotionApprovedReviewSupport.ts` now owns the repeated approved setup:

- builds an app with `UPSTREAM_ACTIONS_ENABLED=true`;
- builds an app with `UPSTREAM_PROBES_ENABLED=true`;
- creates and confirms a `kv-status` intent;
- dispatches the intent;
- creates a checkpoint;
- marks the checkpoint as baseline;
- records the approved promotion decision.

The helper deliberately avoids route assertions. That keeps it small and prevents the support file from becoming the next maintenance problem.

## Focused Tests

`test/opsPromotionApprovedAttestation.test.ts` checks the approved decision and attestation surfaces.

`test/opsPromotionApprovedHandoffPackageCertificate.test.ts` checks package and certificate surfaces.

`test/opsPromotionApprovedHandoffReceiptClosure.test.ts` checks receipt and closure surfaces.

`test/opsPromotionApprovedCompletionReleaseEvidence.test.ts` checks completion and release evidence surfaces.

`test/opsPromotionDecisionList.test.ts` keeps the newest-first list/retrieve behavior separate from the approved full-chain path.

## Safety

No production behavior changed. The test assertions were preserved, but the old full-chain test now runs as four artifact-focused tests after the same approved setup.

The broader promotion test count increased from 42 to 45 because one long scenario became four focused scenarios.

## Verification

Focused verification:

```powershell
npm.cmd test -- test\opsPromotionApprovedAttestation.test.ts test\opsPromotionApprovedHandoffPackageCertificate.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts test\opsPromotionDecisionList.test.ts
```

Result:

- 5 files passed.
- 5 tests passed.

Broader promotion verification:

```powershell
$files = Get-ChildItem test\opsPromotion*.test.ts | Sort-Object Name | ForEach-Object { $_.FullName }
npm.cmd test -- @files
npm.cmd run typecheck
npm.cmd run build
```

Result:

- 18 promotion files passed.
- 45 tests passed.
- Typecheck passed.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v585 consumes no fresh sibling evidence and adds no approval gate for the sibling projects.
