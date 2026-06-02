# Node v589 code walkthrough: promotion handoff digest payload split

## Goal

v589 starts cutting production-side bulk in the promotion archive handoff chain.

Before this change, `src/services/opsPromotionArchiveHandoffBuilders.ts` owned both artifact builder orchestration and the stable digest payload shapes for package, certificate, receipt, closure, and completion artifacts. That made the file long and made digest-review work visually compete with lifecycle orchestration.

## Change

The digest payload helpers moved to `src/services/opsPromotionArchiveHandoffDigestPayloads.ts`.

The moved helpers preserve the exact field normalization behavior:

- attachment, milestone, closure item, and completion step digests are still reduced to their stable primitive fields;
- digest payload field names and order remain unchanged;
- public handoff builder exports remain in `opsPromotionArchiveHandoffBuilders.ts`;
- existing route and profile builder imports do not change.

`opsPromotionArchiveHandoffBuilders.ts` now imports the digest payload helpers and keeps its responsibility centered on creating and verifying handoff artifacts.

## Import cleanup

The handoff builder also dropped deployment/release type and helper imports that were not used by the file.

This matters because the file is now less coupled to the broader archive builder family. Future package/certificate/receipt/closure/completion splits can move by artifact boundary instead of carrying stale import residue.

## Safety

This is behavior-preserving production maintenance.

No public route, artifact field, digest covered field list, validation rule, evidence fixture, or sibling-project contract changed.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\opsPromotionHandoffPackage.test.ts test\opsPromotionHandoffCertificate.test.ts test\opsPromotionHandoffReceipt.test.ts test\opsPromotionHandoffClosure.test.ts test\opsPromotionHandoffCompletion.test.ts test\opsPromotionApprovedHandoffPackageCertificate.test.ts test\opsPromotionApprovedHandoffReceiptClosure.test.ts test\opsPromotionApprovedCompletionReleaseEvidence.test.ts
```

Result:

- Typecheck passed.
- 8 focused handoff/approved files passed.
- 13 focused tests passed.

Additional promotion-domain verification:

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

Java and mini-kv can continue in parallel. v589 consumes no fresh sibling evidence and creates no new upstream approval requirement.

## Next cut

The next maintenance version should continue production-side decomposition, preferably by splitting handoff package/certificate responsibilities or extracting shared handoff verification comparison helpers.
