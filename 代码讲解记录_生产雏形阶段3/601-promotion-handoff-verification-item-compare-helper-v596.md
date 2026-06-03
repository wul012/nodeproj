# Node v596 code walkthrough: promotion handoff verification item compare helper

## Goal

v596 reduces repeated verification comparison mechanics across the split handoff builder modules.

The modules still need artifact-specific output names, but the base comparison is identical: compare `valid`, compare `source`, compare digest, and fail if the expected item is missing.

## Change

`src/services/opsPromotionArchiveHandoffVerificationDigests.ts` now exports:

- `compareHandoffVerificationItem(...)`.

The helper is generic over `Name` and `Source`, so package attachment names, receipt milestone names, closure item names, and completion step names do not degrade to plain `string`.

## Safety

This is behavior-preserving helper extraction.

The package, certificate, receipt, closure, and completion modules still emit their original verification object fields. Completion still performs its extra `ready` and `detail` checks outside the shared helper.

## Verification

```powershell
npm.cmd run typecheck
$files = rg --files test | Where-Object { $_ -match '^test[\\/]opsPromotion.*\.test\.ts$' }; npm.cmd test -- @files --maxWorkers=4
npm.cmd run build
```

Result:

- Typecheck passed.
- 18 promotion files passed.
- 45 promotion tests passed.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v596 consumes no fresh sibling evidence and creates no upstream dependency.

## Next cut

The final maintenance cut in this 16-version run should document and verify the new handoff builder module topology, then batch-push v593-v597 for CI.
