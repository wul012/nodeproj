# Node v594 code walkthrough: promotion handoff completion builder split

## Goal

v594 finishes the artifact-by-artifact split of the promotion handoff builder.

The old handoff builder file had been carrying the whole package, certificate, receipt, closure, and completion chain. After the previous cuts, only completion remained. This version moves completion into its own module and leaves the old filename as a stable public barrel.

## Change

`src/services/opsPromotionArchiveHandoffCompletionBuilders.ts` now owns:

- `createOpsPromotionHandoffCompletion`;
- `createOpsPromotionHandoffCompletionVerification`.

`src/services/opsPromotionArchiveHandoffBuilders.ts` now re-exports:

- package builders;
- certificate builders;
- receipt builders;
- closure builders;
- completion builders.

## Safety

This is a behavior-preserving production split.

No completion digest field, covered field list, completion step check, closeout readiness check, route handler, renderer, or archive shape changed.

Existing callers keep importing from `opsPromotionArchiveHandoffBuilders.ts`.

## Verification

Focused verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\opsPromotionHandoffCompletion.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts
```

Result:

- Typecheck passed.
- 4 focused files passed.
- 13 focused tests passed.

Promotion-domain verification:

```powershell
$files = rg --files test | Where-Object { $_ -match '^test[\\/]opsPromotion.*\.test\.ts$' }; npm.cmd test -- @files --maxWorkers=4
```

Result:

- 18 promotion files passed.
- 45 promotion tests passed.

Build:

```powershell
npm.cmd run build
```

Result:

- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v594 consumes no fresh sibling evidence and creates no upstream dependency.

## Next cut

The next maintenance version should stop moving artifact bodies and instead reduce duplicated verification fallback construction shared by the handoff builder modules.
