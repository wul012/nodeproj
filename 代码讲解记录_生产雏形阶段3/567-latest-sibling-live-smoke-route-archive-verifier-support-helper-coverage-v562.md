# Node v562 code walkthrough: latest sibling live smoke route archive verifier support helper coverage

## New Test File

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeRouteArchiveVerifierSupport.test.ts` exercises the shared helper module directly.

## Current Counts

The first test verifies `currentLatestSiblingLiveSmokeRouteCatalogCounts()` pulls from:

- `EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount`;
- `EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"]`;
- `javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes.length`.

## Match vs Coverage

The second test proves that exact equality and current-catalog coverage are different:

- `routeCatalogCountsMatch(current, archived)` is false when the archived baseline is smaller;
- `routeCatalogCountsCover(current, archived)` remains true;
- coverage fails when a future count exceeds current catalog authority.

## Boundary

v562 is test-only maintainability work. It changes no public route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
