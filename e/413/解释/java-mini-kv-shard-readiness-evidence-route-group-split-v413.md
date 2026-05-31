# Node v413 Java / mini-kv shard readiness evidence route group split

## Summary

Node v413 is a maintainability refactor. It extracts shard-readiness evidence consumption and completed shard-readiness evidence intake route registrations into `src/routes/auditJavaMiniKvShardReadinessEvidenceRoutes.ts`.

## What Changed

- Added `javaMiniKvShardReadinessEvidenceAuditJsonMarkdownRoutes`.
- Moved 4 shard-readiness evidence routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditJavaMiniKvShardReadinessEvidenceRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1406 lines before, 1377 lines after.
- `src/routes/auditJavaMiniKvShardReadinessEvidenceRoutes.ts`: 38 lines.
- Extracted route count: 4.

## Validation

- Focused v413 route-group test: 1 file / 1 test passed.
- Adjacent shard-readiness evidence tests: 5 files / 15 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 346 files / 1172 tests passed.

## Boundary

v413 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
