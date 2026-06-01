# Node v460 audit route catalog integrity

## Summary

Node v460 adds a reusable route-catalog integrity evaluator for the audit JSON/Markdown route table. It turns the v459 catalog invariants into typed data that later tests and quality reports can consume without re-parsing the central route file.

## What Changed

- Added `src/routes/auditJsonMarkdownRouteCatalogIntegrity.ts`.
- Added `evaluateAuditJsonMarkdownRouteCatalogIntegrity(...)`.
- Added checks for empty groups, duplicate group ids, duplicate paths, anchor count, route-table alignment, and domain group counts.
- Added `test/auditJsonMarkdownRouteCatalogIntegrity.test.ts` for the live catalog and a synthetic broken catalog.

## Cross-Project Check

- Java is at v194 / `e46433e3` with one local test-file modification.
- mini-kv is at v179 / `901e46e` with v180-like local shard-readiness changes.
- Node v460 does not need fresh Java or mini-kv evidence and is not their pre-approval blocker.

## Validation

- Focused v459/v460 catalog tests passed: 2 files / 3 tests.
- Typecheck passed.
- Build passed.
- Full Vitest is deferred to the final batch version because v460 is a local catalog helper and focused regression coverage passed.

## Boundary

v460 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
