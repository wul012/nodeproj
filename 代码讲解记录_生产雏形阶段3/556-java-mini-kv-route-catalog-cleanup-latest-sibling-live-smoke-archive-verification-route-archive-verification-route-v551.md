# Node v551 code walkthrough: latest sibling live smoke archive verification route archive verification route

## Route Registration

`auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts` now imports the v549 route-archive verifier path, loader, and Markdown renderer, then adds it to the cleanup handoff route registration table.

The route is:

`/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification`

It remains read-only and uses the existing audit JSON/Markdown registrar.

## Route Catalog Counts

`auditJsonMarkdownRouteCatalogSummary.ts` moves the current route total from 226 to 227 and the Java/mini-kv domain count from 62 to 63. `managedAuditRouteRegistrationTableQualityPass.ts` moves its current route-registration table count to 227 as well.

## Verifier Stabilization

The v549 verifier previously checked that the v548 archived route-count summary matched the current route catalog exactly. That was too brittle once v551 added a new route.

It now records two separate facts:

- `summaryRouteCatalogCountsMatchSourceArchive`: the archived v548 output is exactly 226 total routes, 62 Java/mini-kv routes, and 28 cleanup handoff routes.
- `currentRouteCatalogCoversSourceArchive`: the current route catalog is greater than or equal to the archived source baseline.

This keeps the historical archive precise while allowing new routes to be added safely.

## Test Coverage

The focused route tests verify the new endpoint returns JSON and Markdown 200 responses, stays ready, preserves closed runtime authority, and renders both new route-count checks.

## Boundary

v551 does not start Java, does not start mini-kv, does not perform live smoke, and does not mutate sibling project state. v552 can archive this public route output.
