# Node v453 managed audit manual sandbox connection readiness route group split

## Summary

Node v453 is a maintainability refactor. It extracts the managed audit manual sandbox connection preflight gate, preflight verification, rehearsal packet review, blocked execution rehearsal, precondition intake, dry-run request envelope, and readiness gate route registrations into `src/routes/auditManagedAuditManualSandboxConnectionReadinessRoutes.ts`.

## What Changed

- Added `managedAuditManualSandboxConnectionReadinessAuditJsonMarkdownRoutes`.
- Moved 7 manual sandbox connection preflight/readiness routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditManualSandboxConnectionReadinessRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 378 lines before, 325 lines after.
- `src/routes/auditManagedAuditManualSandboxConnectionReadinessRoutes.ts`: 62 lines.
- Extracted route count: 7.

## Validation

- Focused v453 route-group test: 1 file / 1 test passed.
- Adjacent preflight/readiness tests: 8 files / 22 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 386 files / 1212 tests passed.

## Boundary

v453 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
