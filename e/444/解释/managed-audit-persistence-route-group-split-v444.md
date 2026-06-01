# Node v444 managed audit persistence route group split

## Summary

Node v444 is a maintainability refactor. It extracts the managed audit persistence boundary candidate and dry-run verification route registrations into `src/routes/auditManagedAuditPersistenceRoutes.ts`.

## What Changed

- Added `managedAuditPersistenceAuditJsonMarkdownRoutes`.
- Moved 2 managed audit persistence routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditPersistenceRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 559 lines before, 538 lines after.
- `src/routes/auditManagedAuditPersistenceRoutes.ts`: 30 lines.
- Extracted route count: 2.

## Validation

- Focused v444 route-group test: 1 file / 1 test passed.
- Adjacent managed persistence tests: 3 files / 7 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 377 files / 1203 tests passed.
- Historical fixture fallback was forced through `process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true"` and Java/mini-kv paths were verified under `fixtures/historical/sibling-workspaces/...`.

## Boundary

v444 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, or runtime execution behavior.
