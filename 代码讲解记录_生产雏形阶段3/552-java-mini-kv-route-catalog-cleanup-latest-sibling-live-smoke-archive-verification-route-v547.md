# Node v547 code walkthrough: latest sibling live smoke archive verification route

## Why This Version Exists

v546 made the v545 live smoke archive verifiable in code. v547 makes that verifier available to route consumers through the existing audit JSON/Markdown route system.

## Route Constant

`JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_PATH` lives in `javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification.ts`. Tests and route registration use this constant instead of duplicating the string.

## Route Registration

`auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts` now registers the v546 loader and renderer in the cleanup handoff route group.

This keeps the route in the same domain as the evidence chain it verifies:

- latest sibling evidence report;
- latest sibling evidence archive verifier;
- latest sibling live smoke archive verifier.

## Catalog Counts

`auditJsonMarkdownRouteCatalogSummary.ts` updates the expected route count to `226` and the Java / mini-kv domain route count to `62`.

`managedAuditRouteRegistrationTableQualityPass.ts` updates its current route table baseline to `226`; otherwise the route quality guard correctly treats the newly registered route as unexpected drift.

## Tests

`auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts` now expects 28 cleanup handoff routes and verifies both JSON and Markdown for the new route.

`managedAuditRouteRegistrationTableQualityPass.test.ts` moves the route quality expected count to 226.

## Boundary

v547 does not run live smoke and does not start Java or mini-kv. It only exposes already verified v545 archive evidence. The next maintainable step is v548 route output archive.
