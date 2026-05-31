# Node v417 sandbox handle review route group split

## Summary

Node v417 is a maintainability refactor. It extracts the sandbox handle review route registrations into `src/routes/auditSandboxHandleReviewRoutes.ts`.

## What Changed

- Added `sandboxHandleReviewAuditJsonMarkdownRoutes`.
- Moved 10 sandbox handle review routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditSandboxHandleReviewRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1210 lines before, 1133 lines after.
- `src/routes/auditSandboxHandleReviewRoutes.ts`: 86 lines.
- Extracted route count: 10.

## Validation

- Focused v417 route-group test: 1 file / 1 test passed.
- Adjacent route-group and sandbox handle review tests: 5 files / 9 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 350 files / 1176 tests passed.

## Boundary

v417 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
