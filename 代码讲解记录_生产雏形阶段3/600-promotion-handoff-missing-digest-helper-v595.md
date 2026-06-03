# Node v595 code walkthrough: promotion handoff missing digest helper

## Goal

v595 removes a repeated verification fallback pattern that became visible after the handoff builder modules were split.

Each artifact verification path needs a deterministic fallback digest when an expected attachment, milestone, closure item, or completion step is missing. Before v595, each module rebuilt the same `{ algorithm: "sha256", value: digestStable({ missing: name }) }` object inline.

## Change

`src/services/opsPromotionArchiveHandoffVerificationDigests.ts` now exports:

- `missingHandoffVerificationDigest(name: string)`.

The package, certificate, receipt, closure, and completion builder modules now use that helper for missing expected digest fallbacks.

## Safety

This is a behavior-preserving helper extraction.

No verification check changed. The helper computes the same stable digest from the same `{ missing: name }` payload and returns the same digest object shape.

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

Java and mini-kv can continue in parallel. v595 consumes no fresh sibling evidence and creates no upstream dependency.

## Next cut

The next maintenance version should reduce repeated verification item mapping structure without creating a generic abstraction that hides artifact-specific fields.
