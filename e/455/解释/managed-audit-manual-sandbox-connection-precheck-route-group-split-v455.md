# Node v455 managed audit manual sandbox connection precheck route group split

## Summary

Node v455 is a maintainability refactor. It extracts the managed audit manual sandbox connection precheck packet, precheck upstream receipt verification, sandbox code health pass, and rehearsal guard route registrations into `src/routes/auditManagedAuditManualSandboxConnectionPrecheckRoutes.ts`.

## What Changed

- Added `managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes`.
- Moved 4 precheck/code-health/rehearsal-guard routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditManualSandboxConnectionPrecheckRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.
- Updated `managedAuditSandboxCodeHealthPass` so its route-registration self-check accepts the established route-group spread and verifies the path/loader/renderer in the group file.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 288 lines before, 259 lines after.
- `src/routes/auditManagedAuditManualSandboxConnectionPrecheckRoutes.ts`: 38 lines.
- Extracted route count: 4.

## Validation

- Focused v455 route-group test: 1 file / 1 test passed.
- Adjacent precheck/code-health/rehearsal tests: 5 files / 15 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 388 files / 1214 tests passed.

## Boundary

v455 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
