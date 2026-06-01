# Node v454 managed audit manual sandbox connection command route group split

## Summary

Node v454 is a maintainability refactor. It extracts the managed audit manual sandbox connection operator-window checklist, operator-window evidence verification, dry-run command package, dry-run command package verification report, and dry-run command upstream echo verification route registrations into `src/routes/auditManagedAuditManualSandboxConnectionCommandRoutes.ts`.

## What Changed

- Added `managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes`.
- Moved 5 manual sandbox connection operator-window and dry-run command routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditManualSandboxConnectionCommandRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 325 lines before, 288 lines after.
- `src/routes/auditManagedAuditManualSandboxConnectionCommandRoutes.ts`: 46 lines.
- Extracted route count: 5.

## Validation

- Focused v454 route-group test: 1 file / 1 test passed.
- Adjacent operator-window and command tests: 6 files / 16 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 387 files / 1213 tests passed.

## Boundary

v454 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
