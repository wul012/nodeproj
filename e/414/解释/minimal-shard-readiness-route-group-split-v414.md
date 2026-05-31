# Node v414 minimal shard readiness route group split

## Summary

Node v414 is a maintainability refactor. It extracts the minimal shard-readiness route registrations into `src/routes/auditMinimalShardReadinessRoutes.ts`.

## What Changed

- Added `minimalShardReadinessAuditJsonMarkdownRoutes`.
- Moved 6 minimal shard-readiness routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditMinimalShardReadinessRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1377 lines before, 1330 lines after.
- `src/routes/auditMinimalShardReadinessRoutes.ts`: 56 lines.
- Extracted route count: 6.

## Validation

- Focused v414 route-group test: 1 file / 1 test passed.
- Adjacent route-group tests: 5 files / 5 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 347 files / 1173 tests passed.

## Boundary

v414 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
