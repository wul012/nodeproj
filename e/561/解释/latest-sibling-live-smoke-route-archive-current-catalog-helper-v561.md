# Node v561 explanation: latest sibling live smoke route archive current catalog helper

v561 centralizes current route catalog count construction for the latest sibling live-smoke route archive verifiers.

## Necessity proof

- Blocker resolved: v549 and v553 verifiers duplicated the same current route catalog count builder.
- Later consumer: future archive-verifier maintenance can reuse one helper when checking that the current catalog covers archived baselines.
- Existing report cannot be reused alone: the verifiers need a typed count object, not the full route catalog summary shape.
- Growth stop condition: this is a support-helper split only. It adds no route, no evidence archive, and no Java/mini-kv dependency.

## Change

- Added `currentLatestSiblingLiveSmokeRouteCatalogCounts()` to the route archive verifier support module.
- Updated the v549 and v553 verifier services to call the shared helper.
- Preserved archived baseline constants because those represent historical evidence, not current catalog state.

Java and mini-kv remain recommended parallel. Node v561 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.test.ts test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
