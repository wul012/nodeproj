# v582 Promotion decision test suite split

## Purpose

v582 starts the maintenance-only run requested after v581. This version does not add product behavior, routes, archive chains, or upstream evidence requirements.

The concrete problem was `test/opsPromotionDecision.test.ts`: one 4494-line file covered the full promotion decision lifecycle from blocked review through archive, handoff, release, deployment, approved review, and listing. That made focused reruns, review, and future cleanup unnecessarily expensive.

## Change

The original giant file was removed and split into five focused suites:

- `test/opsPromotionDecisionCore.test.ts` covers the blocked decision, digest, report, and ledger checks.
- `test/opsPromotionArchive.test.ts` covers archive bundle, manifest, manifest verification, attestation, and attestation verification.
- `test/opsPromotionHandoff.test.ts` covers package, certificate, receipt, closure, completion, and their verification routes.
- `test/opsPromotionReleaseDeployment.test.ts` covers release evidence, release archive, deployment approval/change/execution records, execution receipt, and audit trail.
- `test/opsPromotionApprovedAndList.test.ts` covers the approved local-evidence review plus list/retrieve behavior.

The split is mechanical: all 34 original `it(...)` blocks remain present, with no assertion or route behavior changes.

## Maintenance line

This is version 1 of the requested 16-version maintenance/refactor run.

Planned order for the next cuts:

1. Further split the largest remaining release/deployment promotion tests.
2. Further split the largest remaining handoff promotion tests.
3. Extract repeated promotion route response assertions into local test helpers.
4. Remove brittle hardcoded route-count assertions where catalog-derived expectations can replace them.
5. Split `auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts`.
6. Split `opsPromotionArchiveHandoffBuilders.ts` by archive, handoff, and verification builders.
7. Split `opsPromotionArchiveReleaseDeploymentRenderers.ts` by release, deployment, and receipt rendering.
8. Split `dashboardClientScript.ts` into view-state, rendering, and event-binding modules.
9. Split the largest managed-audit service support files by parsing, evidence collection, digest, and rendering.
10. Consolidate repeated Markdown section rendering helpers.
11. Consolidate repeated evidence manifest shape checks.
12. Tighten smoke/test timeout triage helpers so large batches remain optional.
13. Add focused coverage for new helper extraction seams where behavior could drift.
14. Update archive and walkthrough indexes after helper movement.
15. Run broader typecheck/build/test budget verification.
16. Close the maintenance run with a summary of remaining structural debt.

Java and mini-kv are recommended parallel work during this maintenance run. Node is not asking them for fresh evidence and is not a pre-approval blocker for their own progress.

## Verification

- `npm.cmd test -- test\opsPromotionDecisionCore.test.ts test\opsPromotionArchive.test.ts test\opsPromotionHandoff.test.ts test\opsPromotionReleaseDeployment.test.ts test\opsPromotionApprovedAndList.test.ts`
- `$files = Get-ChildItem test\opsPromotion*.test.ts | Sort-Object Name | ForEach-Object { $_.FullName }; npm.cmd test -- @files`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Result:

- 5 test files passed.
- 34 tests passed.
- Broader promotion test sweep passed: 7 files, 42 tests.
- Typecheck passed.
- Build passed.

No browser screenshot was needed because v582 changes only test organization and does not expose a new or changed renderable route.
