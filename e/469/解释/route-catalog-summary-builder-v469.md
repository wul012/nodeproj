# Node v469 route catalog summary builder

## Summary

Node v469 extracts route catalog flattening and domain summary calculation into a typed helper module.

## What Changed

- Added `src/routes/auditJsonMarkdownRouteCatalogSummary.ts`.
- Added `flattenAuditJsonMarkdownRouteCatalog(...)` for the canonical route-table order.
- Added `summarizeAuditJsonMarkdownRouteCatalog(...)` with group counts, route counts, domain group counts, domain route counts, and first/last route paths.
- Updated catalog integrity to reuse the builder.
- Added focused tests for the builder and updated integrity expectations.

## Cross-Project Check

- Java is clean at v200 / `7e9c999b`.
- mini-kv is at v185 / `2c7526f` with v186-like local changes.
- Node v469 does not need fresh Java or mini-kv evidence.

## Validation

- Focused summary/catalog/route-quality tests passed: 4 files / 8 tests.
- Typecheck: passed.
- Build: passed.

## Boundary

v469 does not add routes, change API paths, change approval behavior, start sibling services, read credentials, or create new evidence chains.
