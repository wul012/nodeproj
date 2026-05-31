# Node v412 Java / mini-kv active shard plan route group split

## Summary

Node v412 is a maintainability refactor. It extracts active shard plan, live-read gate plan, and operator service lifecycle route registrations into `src/routes/auditJavaMiniKvActiveShardPlanRoutes.ts`.

The user also asked to remove the context compaction stop rule. The project-local `AGENTS.md` no longer contains `Context Length Stop Gate`.

## What Changed

- Added `javaMiniKvActiveShardPlanAuditJsonMarkdownRoutes`.
- Moved 8 active-shard/live-read/operator-lifecycle routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditJavaMiniKvActiveShardPlanRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1467 lines before, 1406 lines after.
- `src/routes/auditJavaMiniKvActiveShardPlanRoutes.ts`: 70 lines.
- Extracted route count: 8.

## Validation

- Focused v412 route-group test: 1 file / 1 test passed.
- Adjacent active-shard/live-read/operator-lifecycle tests: 9 files / 27 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 345 files / 1171 tests passed.

## Boundary

v412 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
