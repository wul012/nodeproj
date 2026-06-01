# Node v462 audit route catalog test migration

## Summary

Node v462 migrates the remaining route-group tests to the shared catalog helper. The old source-string pattern is now limited to the central catalog source-shape test and one legacy runbook route-entry test.

## What Changed

- Migrated 37 more route-group tests to `expectAuditRouteGroupRegisteredThroughCatalog(...)`.
- Removed repeated `readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8")` usage from credential-resolver, Java/mini-kv, managed-audit, and sandbox route-group tests.
- Preserved route path assertions and HTTP JSON/Markdown behavior assertions in every migrated test.
- Reduced direct `routeTableSource = readFileSync(...)` tests from 39 to 2.

## Cross-Project Check

- Java is clean at v196 / `ffb2fd7f`.
- mini-kv is at v180 / `e0eafe4` with v181-like local changes.
- Node v462 does not need fresh Java or mini-kv evidence and is not their pre-approval blocker.

## Validation

- Migrated route-group tests plus v459/v460/v461 catalog/support tests passed: 39 files / 40 tests.
- Typecheck passed.
- Build passed.
- Full Vitest is deferred to v464 final validation because v462 is a test migration and the full affected route-group suite passed.

## Boundary

v462 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
