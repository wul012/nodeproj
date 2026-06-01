# Node v451 managed audit sandbox adapter route group split

## Summary

Node v451 is a maintainability refactor. It extracts the managed audit sandbox adapter dry-run plan, sandbox adapter dry-run package, and manual sandbox adapter connection runbook route registrations into `src/routes/auditManagedAuditSandboxAdapterRoutes.ts`.

## What Changed

- Added `managedAuditSandboxAdapterAuditJsonMarkdownRoutes`.
- Moved 3 managed audit sandbox adapter routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditSandboxAdapterRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.
- Updated `test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts` so the old structural assertion expects the route-group spread instead of direct central route registration.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 420 lines before, 399 lines after.
- `src/routes/auditManagedAuditSandboxAdapterRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v451 route-group test: 1 file / 1 test passed.
- Adjacent sandbox adapter tests: 4 files / 10 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 384 files / 1210 tests passed.

## Boundary

v451 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
