# Node v458 foundational audit route group split

## Summary

Node v458 completes the audit JSON/Markdown route-table split campaign visible in `src/routes/auditJsonMarkdownRoutes.ts`. The central table now composes route groups only and no longer directly calls `auditJsonMarkdownRoute(...)`.

## What Changed

- Added `foundationalAuditJsonMarkdownRoutes`.
- Moved 6 foundational audit routes from the central table into `src/routes/auditFoundationalRoutes.ts`.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditFoundationalRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Cross-Project Check

- Java has in-progress v187 contract alignment work and remains based on committed v186 / `5975173b`. Node did not modify, build, test, start, or stop Java.
- mini-kv has in-progress v176 route split window work through Node v457 and remains based on committed v175 / `33d90e9`. Node did not modify, build, test, start, or stop mini-kv.
- Node v458 does not need fresh Java or mini-kv evidence and is not their pre-approval blocker.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 209 lines before, 151 lines after.
- `src/routes/auditFoundationalRoutes.ts`: 64 lines.
- Remaining central direct `auditJsonMarkdownRoute(...)` registrations: 0.
- Extracted route count: 6.

## Validation

- Focused v458 route-group test: 1 file / 1 test passed.
- Adjacent foundational audit tests: 7 files / 18 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest: 391 files / 1217 tests passed.

## Boundary

v458 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
