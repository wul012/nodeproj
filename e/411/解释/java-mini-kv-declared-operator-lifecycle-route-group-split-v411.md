# Node v411 Java / mini-kv declared operator lifecycle route group split

## Summary

Node v411 is a maintainability refactor. It extracts the Java / mini-kv declared operator lifecycle route registrations into `src/routes/auditJavaMiniKvDeclaredOperatorLifecycleRoutes.ts` and keeps `src/routes/auditJsonMarkdownRoutes.ts` as the central route table that spreads the domain group.

## What Changed

- Added `javaMiniKvDeclaredOperatorLifecycleAuditJsonMarkdownRoutes`.
- Moved 8 declared operator lifecycle routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditJavaMiniKvDeclaredOperatorLifecycleRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1528 lines before, 1467 lines after.
- `src/routes/auditJavaMiniKvDeclaredOperatorLifecycleRoutes.ts`: 70 lines.
- Extracted route count: 8.

## Validation

- Focused v411 route-group test: 1 file / 1 test passed.
- Adjacent declared-operator lifecycle route tests: 5 files / 13 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 344 files / 1170 tests passed.

## Boundary

v411 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
