# Node v562 explanation: latest sibling live smoke route archive verifier support helper coverage

v562 adds direct test coverage for the route archive verifier support helpers introduced and reused in v555-v561.

## Necessity proof

- Blocker resolved: the shared helper had only indirect verifier coverage, so helper semantics could drift unnoticed.
- Later consumer: future archive verifiers can reuse exact-match and coverage helpers with a small focused test proving the distinction.
- Existing report cannot be reused alone: route-output reports prove current behavior, but they do not isolate helper semantics.
- Growth stop condition: this is test coverage only. It adds no route, no evidence archive, and no Java/mini-kv dependency.

## Change

- Added `test/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeRouteArchiveVerifierSupport.test.ts`.
- Verified that current route catalog counts come from the shared catalog summary and cleanup handoff route group.
- Verified that exact matches and current-catalog coverage are intentionally different checks.

Java and mini-kv remain recommended parallel. Node v562 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeRouteArchiveVerifierSupport.test.ts test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.test.ts test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
