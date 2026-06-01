# Node v457 managed audit manual sandbox connection fake transport route group split

## Summary

Node v457 is a maintainability refactor plus a planning-rule correction. It extracts the managed audit manual sandbox connection fake-transport dry-run packet, archive verification, and upstream echo verification route registrations into `src/routes/auditManagedAuditManualSandboxConnectionFakeTransportRoutes.ts`.

## What Changed

- Added `managedAuditManualSandboxConnectionFakeTransportAuditJsonMarkdownRoutes`.
- Moved 3 fake-transport routes from the central route table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditManualSandboxConnectionFakeTransportRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.
- Updated `AGENTS.md` so future Node successor plans must inspect Java and mini-kv progress before writing the plan and must record concrete continuation guidance.

## Cross-Project Check

- Java is clean at v186 / `5975173b`; it can continue read-only endpoint registry and historical snapshot quality work in parallel.
- mini-kv is clean at v175 / `33d90e9`; it can continue by extending the read-only Node route split compatibility window from Node v449 through Node v450-v457.
- Node v457 does not need fresh Java or mini-kv evidence and is not their pre-approval blocker.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 230 lines before, 209 lines after.
- `src/routes/auditManagedAuditManualSandboxConnectionFakeTransportRoutes.ts`: 30 lines.
- Remaining central direct `auditJsonMarkdownRoute(...)` registrations: 6 foundational store/readiness routes.
- Extracted route count: 3.

## Validation

- Focused v457 route-group test: 1 file / 1 test passed.
- Adjacent fake-transport tests: 4 files / 11 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest: 390 files / 1216 tests passed.

## Boundary

v457 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
