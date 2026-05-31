# Node v426 credential resolver runtime shell decision route group split

## Summary

Node v426 is a maintainability refactor. It extracts the credential-resolver runtime shell decision route registrations into `src/routes/auditCredentialResolverRuntimeShellDecisionRoutes.ts`.

## What Changed

- Added `credentialResolverRuntimeShellDecisionAuditJsonMarkdownRoutes`.
- Moved 3 runtime shell decision routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverRuntimeShellDecisionRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 901 lines before, 880 lines after.
- `src/routes/auditCredentialResolverRuntimeShellDecisionRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v426 route-group test: 1 file / 1 test passed.
- Adjacent runtime shell decision tests: 6 files / 17 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 359 files / 1185 tests passed.

## Boundary

v426 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
