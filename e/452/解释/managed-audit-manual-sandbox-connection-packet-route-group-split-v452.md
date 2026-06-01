# Node v452 managed audit manual sandbox connection packet route group split

## Summary

Node v452 is a maintainability refactor. It extracts the managed audit manual sandbox connection evidence checklist, operator packet, and packet verification route registrations into `src/routes/auditManagedAuditManualSandboxConnectionPacketRoutes.ts`.

## What Changed

- Added `managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes`.
- Moved 3 manual sandbox connection packet-preparation routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditManualSandboxConnectionPacketRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 399 lines before, 378 lines after.
- `src/routes/auditManagedAuditManualSandboxConnectionPacketRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v452 route-group test: 1 file / 1 test passed.
- Adjacent packet-preparation tests: 4 files / 10 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 385 files / 1211 tests passed.

## Boundary

v452 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
