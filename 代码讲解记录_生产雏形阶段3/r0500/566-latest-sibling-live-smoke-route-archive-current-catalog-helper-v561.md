# Node v561 code walkthrough: latest sibling live smoke route archive current catalog helper

## Helper Split

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeRouteArchiveVerifierSupport.ts` now owns `currentLatestSiblingLiveSmokeRouteCatalogCounts()`.

The helper returns the current total route count, current Java/mini-kv route count, and current cleanup handoff route-group route count.

## Verifier Updates

The v549 route archive verifier and the v553 route-archive-verifier archive verifier both call the shared helper before `routeCatalogCountsCover(...)`.

## Historical Baselines

The hardcoded v548 and v552 archived count constants remain in their owning verifiers. They are historical archive baselines and should not move with the current catalog.

## Boundary

v561 is a maintainability split. It changes no public route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
