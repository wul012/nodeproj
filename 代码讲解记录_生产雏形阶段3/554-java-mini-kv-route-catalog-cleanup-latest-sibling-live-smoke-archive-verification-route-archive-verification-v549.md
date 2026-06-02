# Node v549 code walkthrough: latest sibling live smoke archive verification route archive verification

## Why This Version Exists

v548 archived the v547 route response. v549 makes that archive consumable by code and future routes.

## Service

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.ts` reads the v548 JSON, Markdown, and summary files. It reuses the v546 support helpers for file references, BOM-safe JSON reads, and value extraction.

The service builds:

- archive file references;
- source route archive summary;
- source verifier summary;
- checks for digests, status codes, readiness, route counts, Markdown signals, and runtime boundaries.

## Renderer

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRenderer.ts` renders source route archive fields, source verifier fields, summary, checks, archive files, and next actions.

## Test

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.test.ts` verifies:

- active/source versions are v549/v548;
- archived route output came from v546/v545;
- JSON and Markdown status codes are 200;
- 24/24 source verifier checks passed;
- route counts are 226/62/28;
- digests are present and matched;
- runtime authority remains closed.

## Boundary

v549 does not start sibling services, does not run live smoke, and does not expose a route. v550 stabilizes the extended closeout route-count assertion after v547 CI; v551 can expose this verifier.
