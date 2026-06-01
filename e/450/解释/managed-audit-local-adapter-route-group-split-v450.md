# Node v450 managed audit local adapter route group split

## Summary

Node v450 is a maintainability refactor. It extracts the managed audit local adapter dry-run, local adapter verification report, and external adapter connection readiness review route registrations into `src/routes/auditManagedAuditLocalAdapterRoutes.ts`.

## What Changed

- Added `managedAuditLocalAdapterAuditJsonMarkdownRoutes`.
- Moved 3 managed audit local/external adapter readiness routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditLocalAdapterRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.
- Raised one existing long route-table test timeout from 45s to 90s after timeout-only triage showed it passed focused but could exceed its old budget inside shard 2/4.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 441 lines before, 420 lines after.
- `src/routes/auditManagedAuditLocalAdapterRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v450 route-group test: 1 file / 1 test passed.
- Adjacent local/external adapter tests: 4 files / 11 tests passed.
- Timeout-only rerun file passed focused before and after the budget stabilization.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 383 files / 1209 tests passed.

## Boundary

v450 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
