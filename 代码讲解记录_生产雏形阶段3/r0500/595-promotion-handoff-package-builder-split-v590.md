# Node v590 code walkthrough: promotion handoff package builder split

## Goal

v590 continues the production-side cleanup started in v589.

The package artifact is the first step in the promotion handoff chain. Keeping its create and verification logic at the top of a larger multi-artifact builder made the file harder to scan and made later certificate/receipt/closure splits more awkward.

## Change

`src/services/opsPromotionArchiveHandoffPackageBuilders.ts` now owns:

- `createOpsPromotionHandoffPackage`;
- `createOpsPromotionHandoffPackageVerification`.

The original `src/services/opsPromotionArchiveHandoffBuilders.ts` re-exports both functions from the new module.

That preserves the public import path for existing callers such as routes, profile builders, and bundle exports.

## Safety

This is a move-only production split with import narrowing.

No package digest field, covered field list, attachment check, next-action rule, route handler, renderer, or archive field changed.

## Verification

Focused verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\opsPromotionHandoffPackage.test.ts test\opsPromotionHandoffCertificate.test.ts test\opsPromotionApprovedHandoffPackageCertificate.test.ts test\opsPromotionArchive.test.ts test\opsPromotionArchiveBundleBoundary.test.ts
```

Result:

- Typecheck passed.
- 5 focused files passed.
- 15 focused tests passed.

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

Java and mini-kv can continue in parallel. v590 consumes no fresh sibling evidence and creates no upstream dependency.

## Next cut

The next maintenance version should split the certificate artifact pair from the remaining handoff builder, keeping the same public handoff builder entrypoint until all artifact modules are separated.
