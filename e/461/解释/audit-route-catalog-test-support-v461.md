# Node v461 audit route catalog test support

## Summary

Node v461 adds shared test support for route-group catalog assertions and migrates the first 12 route-group tests away from direct source-string reads of `auditJsonMarkdownRoutes.ts`.

## What Changed

- Added `test/support/auditJsonMarkdownRouteCatalogTestSupport.ts`.
- Added `expectAuditRouteGroupRegisteredThroughCatalog(...)`.
- Migrated 12 tests to verify catalog membership, anchor presence, central flatMap alignment, and route sequence through the helper.
- Reduced direct `routeTableSource = readFileSync(...)` tests from 51 to 39.

## Cross-Project Check

- Java is clean at v195 / `e3211bfd`.
- mini-kv remains at v179 / `901e46e` with v180-like local changes.
- Node v461 does not need fresh Java or mini-kv evidence and is not their pre-approval blocker.

## Validation

- Migrated route-group tests plus v459/v460 catalog tests passed: 14 files / 15 tests.
- Typecheck passed.
- Build passed.
- Full Vitest is deferred to the final batch version because this refactor is test-support-only and focused regression coverage passed.

## Boundary

v461 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
