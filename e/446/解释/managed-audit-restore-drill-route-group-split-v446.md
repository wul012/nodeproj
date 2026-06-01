# Node v446 managed audit restore drill route group split

## Summary

Node v446 is a maintainability refactor. It extracts the managed audit packet restore drill plan and restore drill archive verification route registrations into `src/routes/auditManagedAuditRestoreDrillRoutes.ts`.

## What Changed

- Added `managedAuditRestoreDrillAuditJsonMarkdownRoutes`.
- Moved 2 managed audit restore drill routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditRestoreDrillRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 505 lines before, 488 lines after.
- `src/routes/auditManagedAuditRestoreDrillRoutes.ts`: 26 lines.
- Extracted route count: 2.

## Validation

- Focused v446 route-group test: 1 file / 1 test passed.
- Adjacent restore drill tests: 3 files / 7 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 379 files / 1205 tests passed.

## Boundary

v446 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, or runtime execution behavior.
