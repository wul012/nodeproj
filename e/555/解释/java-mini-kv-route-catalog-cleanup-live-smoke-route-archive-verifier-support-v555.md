# Node v555 explanation: live smoke route archive verifier support split

v555 is a maintainability version for the latest sibling live-smoke archive verifier code.

It introduces `javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeRouteArchiveVerifierSupport.ts`, a pure helper for:

- archived JSON/Markdown digest checks against archive summaries;
- exact route catalog count comparisons;
- current route catalog coverage comparisons.

The v549 and v553 verifier services now reuse those helpers instead of hand-writing the same digest and route-count boolean logic.

No behavior changed. The existing verifier and closeout tests still pass, and the route catalog counts remain unchanged at the current `227/63/29` baseline.

Java and mini-kv are recommended parallel. Node does not need fresh sibling evidence and does not start sibling services.

Validation completed:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.test.ts test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.test.ts test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Next step: continue compact maturity work; do not restart the archive-verifier route chain unless a public consumer appears.
