# Node v471 route catalog expected integrity snapshot

## Summary

Node v471 moves the expected catalog integrity fallback snapshot into the catalog integrity module.

## What Changed

- Added `createExpectedAuditJsonMarkdownRouteCatalogIntegritySnapshot(...)` to the catalog integrity module.
- Updated the managed audit route registration table quality pass to consume the catalog-owned factory.
- Removed the service-local fallback snapshot assembly.
- Updated tests to prove the expected snapshot equals the live catalog evaluator output.

## Cross-Project Check

- Java is clean at v201 / `79be6529`.
- mini-kv is clean at v186 / `1b6a565`.
- Node v471 does not need fresh Java or mini-kv evidence.

## Validation

- Focused catalog/route-quality tests passed: 3 files / 7 tests.
- Typecheck: passed.
- Build: passed.

## Boundary

v471 does not add routes, change API paths, change approval behavior, start sibling services, read credentials, or create new evidence chains.
