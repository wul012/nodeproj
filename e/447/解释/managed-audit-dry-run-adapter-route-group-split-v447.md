# Node v447 managed audit dry-run adapter route group split

## Summary

Node v447 is a maintainability refactor. It extracts the managed audit dry-run adapter candidate, dry-run adapter archive verification, and production-hardening readiness gate route registrations into `src/routes/auditManagedAuditDryRunAdapterRoutes.ts`.

## What Changed

- Added `managedAuditDryRunAdapterAuditJsonMarkdownRoutes`.
- Moved 3 managed audit dry-run adapter routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditDryRunAdapterRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 488 lines before, 467 lines after.
- `src/routes/auditManagedAuditDryRunAdapterRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v447 route-group test: 1 file / 1 test passed.
- Adjacent dry-run adapter and production-hardening tests: 4 files / 11 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 380 files / 1206 tests passed.
- Historical fixture fallback was forced through `process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true"` and Java/mini-kv paths were verified under `fixtures/historical/sibling-workspaces/...`.

## Boundary

v447 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, or runtime execution behavior.
