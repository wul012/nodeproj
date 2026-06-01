# Node v449 managed audit adapter implementation route group split

## Summary

Node v449 is a maintainability refactor. It extracts the managed audit adapter implementation precheck packet and disabled shell route registrations into `src/routes/auditManagedAuditAdapterImplementationRoutes.ts`.

## What Changed

- Added `managedAuditAdapterImplementationAuditJsonMarkdownRoutes`.
- Moved 2 managed audit adapter implementation routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditAdapterImplementationRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 454 lines before, 441 lines after.
- `src/routes/auditManagedAuditAdapterImplementationRoutes.ts`: 22 lines.
- Extracted route count: 2.

## Validation

- Focused v449 route-group test: 1 file / 1 test passed.
- Adjacent implementation precheck and disabled shell tests: 3 files / 10 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 382 files / 1208 tests passed.

## Boundary

v449 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
