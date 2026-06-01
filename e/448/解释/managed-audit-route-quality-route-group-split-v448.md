# Node v448 managed audit route quality route group split

## Summary

Node v448 is a maintainability refactor. It extracts the managed audit route helper quality pass and route registration table quality pass route registrations into `src/routes/auditManagedAuditRouteQualityRoutes.ts`.

## What Changed

- Added `managedAuditRouteQualityAuditJsonMarkdownRoutes`.
- Moved 2 managed audit route-quality routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditRouteQualityRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 467 lines before, 454 lines after.
- `src/routes/auditManagedAuditRouteQualityRoutes.ts`: 22 lines.
- Extracted route count: 2.

## Validation

- Focused v448 route-group test: 1 file / 1 test passed.
- Adjacent route-quality tests: 3 files / 7 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 381 files / 1207 tests passed.

## Boundary

v448 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, or runtime execution behavior.
