# Node v459 audit route group catalog

## Summary

Node v459 moves audit route group composition into `src/routes/auditJsonMarkdownRouteGroups.ts`. The central route export now flatMaps the catalog, while the catalog owns group ids, domains, and route arrays.

## What Changed

- Added `AuditJsonMarkdownRouteGroup`.
- Added `auditJsonMarkdownRouteGroups` with 49 route groups and 198 total routes.
- Reduced `src/routes/auditJsonMarkdownRoutes.ts` to the central route export plus temporary source anchors for historical source-based checks.
- Added `test/auditJsonMarkdownRouteGroups.test.ts` to guard group uniqueness, path uniqueness, route count, first/last route order, and central flatMap behavior.

## Cross-Project Check

- Java is clean at v192 / `afb0a9e9`.
- mini-kv is clean at v178 / `58d2aa2`.
- Node v459 does not need fresh Java or mini-kv evidence and is not their pre-approval blocker.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 151 lines before, 57 lines after.
- `src/routes/auditJsonMarkdownRouteGroups.ts`: 108 lines.
- Catalog group count: 49.
- Flattened route count: 198.

## Validation

- Focused v459 catalog test: 1 file / 1 test passed.
- Catalog/code-health/precheck compatibility tests: 3 files / 5 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest: 392 files / 1218 tests passed.

## Boundary

v459 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
