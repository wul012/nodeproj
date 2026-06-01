# Node v443 managed audit adapter route group split

## Summary

Node v443 is a maintainability refactor. It extracts the managed audit adapter boundary, compliance, and runner route registrations into `src/routes/auditManagedAuditAdapterRoutes.ts`.

## What Changed

- Added `managedAuditAdapterAuditJsonMarkdownRoutes`.
- Moved 3 managed audit adapter routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditAdapterRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 584 lines before, 559 lines after.
- `src/routes/auditManagedAuditAdapterRoutes.ts`: 35 lines.
- Extracted route count: 3.

## Validation

- Focused v443 route-group test: 1 file / 1 test passed.
- Adjacent managed adapter tests: 4 files / 10 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 376 files / 1202 tests passed.

## Boundary

v443 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, or runtime execution behavior.
