# Node v555 code walkthrough: live smoke route archive verifier support split

## Why This Version Exists

The v549 and v553 verifier services both checked archive digests and route catalog count baselines. The checks were small but duplicated, and future archive verifiers would copy them again.

v555 extracts those checks into a small support module.

## Support Module

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeRouteArchiveVerifierSupport.ts` exports:

- `LatestSiblingLiveSmokeRouteCatalogCounts`;
- `archiveFileDigestsMatchSummary`;
- `routeCatalogCountsMatch`;
- `routeCatalogCountsCover`.

The helper is pure: it does not load files, import route registrations, or mutate state.

## Service Updates

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.ts` now uses:

- `archiveFileDigestsMatchSummary` for JSON/Markdown digest checks;
- `routeCatalogCountsMatch` for the v548 source archive baseline;
- `routeCatalogCountsCover` for current catalog coverage.

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.ts` uses the same helpers for the v552 route archive verifier.

## Boundary

v555 is a behavior-preserving refactor. It does not add a route, does not start Java or mini-kv, and does not touch archive files.
