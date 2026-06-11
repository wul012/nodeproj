# Node v597 code walkthrough: promotion handoff builder barrel contract

## Goal

v597 finishes the maintenance/refactor run with a compatibility test for the handoff builder barrel.

The implementation has been split into package, certificate, receipt, closure, completion, digest payload, and verification helper modules. The old `opsPromotionArchiveHandoffBuilders.ts` file remains the public import path. The test makes that contract explicit.

## Change

`test/opsPromotionHandoffBuilderBarrel.test.ts` imports:

- the public barrel module;
- each dedicated artifact builder module.

It asserts that every public builder export is the same function reference exported by its dedicated module.

## Safety

The test is fast and does not start the app or hit HTTP routes. It only verifies module topology and public export compatibility.

## Verification

```powershell
npm.cmd test -- test\opsPromotionHandoffBuilderBarrel.test.ts
npm.cmd run typecheck
npm.cmd run build
$files = rg --files test | Where-Object { $_ -match '^test[\\/]opsPromotion.*\.test\.ts$' }; npm.cmd test -- @files --maxWorkers=4
```

Result:

- Barrel contract test passed: 1 file, 5 tests.
- Typecheck passed.
- Build passed.
- Promotion group passed: 19 files, 50 tests.

## Cross-project status

Java and mini-kv can continue in parallel. v597 consumes no fresh sibling evidence and creates no upstream dependency.

## Next phase

The 16-version maintenance run is complete. The next phase can return to feature work, with v598 as the first feature version in the requested 20-version run.
