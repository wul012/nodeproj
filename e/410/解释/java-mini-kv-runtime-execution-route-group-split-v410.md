# Node v410 Java / mini-kv runtime execution route group split

## Summary

Node v410 is a maintainability refactor. It extracts the Java / mini-kv runtime execution route registrations into `src/routes/auditJavaMiniKvRuntimeExecutionRoutes.ts` and keeps `src/routes/auditJsonMarkdownRoutes.ts` as the central route table that spreads the domain group.

## What Changed

- Added `javaMiniKvRuntimeExecutionAuditJsonMarkdownRoutes`.
- Moved 14 runtime execution routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditJavaMiniKvRuntimeExecutionRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1639 lines before, 1528 lines after.
- `src/routes/auditJavaMiniKvRuntimeExecutionRoutes.ts`: 120 lines.
- Extracted route count: 14.

## Validation

- Focused v410 route-group test: 1 file / 1 test passed.
- Adjacent v408+v409+v410 route tests: 3 files / 5 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed after timeout triage: 343 files / 1169 tests.
- The first shard 2/4 attempt hit a timeout-only failure in an existing route test; that file passed alone, then shard 2/4 passed on rerun.

## Boundary

v410 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
