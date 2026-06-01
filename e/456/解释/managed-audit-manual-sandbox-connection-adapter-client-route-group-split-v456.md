# Node v456 managed audit manual sandbox connection adapter client route group split

## Summary

Node v456 is a maintainability refactor. It extracts the managed audit manual sandbox connection decision record, disabled adapter client precheck, test-only adapter shell contract, and disabled adapter client upstream echo verification route registrations into `src/routes/auditManagedAuditManualSandboxConnectionAdapterClientRoutes.ts`.

## What Changed

- Added `managedAuditManualSandboxConnectionAdapterClientAuditJsonMarkdownRoutes`.
- Moved 4 decision/adapter-client routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditManualSandboxConnectionAdapterClientRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 259 lines before, 230 lines after.
- `src/routes/auditManagedAuditManualSandboxConnectionAdapterClientRoutes.ts`: 38 lines.
- Extracted route count: 4.

## Validation

- Focused v456 route-group test: 1 file / 1 test passed.
- Adjacent adapter-client tests: 5 files / 14 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 389 files / 1215 tests passed.

## Boundary

v456 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
