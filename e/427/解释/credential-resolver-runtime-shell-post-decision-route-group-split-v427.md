# Node v427 credential resolver runtime shell post-decision route group split

## Summary

Node v427 is a maintainability refactor. It extracts the credential-resolver runtime shell post-decision route registrations into `src/routes/auditCredentialResolverRuntimeShellPostDecisionRoutes.ts`.

## What Changed

- Added `credentialResolverRuntimeShellPostDecisionAuditJsonMarkdownRoutes`.
- Moved 3 runtime shell post-decision routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverRuntimeShellPostDecisionRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 880 lines before, 859 lines after.
- `src/routes/auditCredentialResolverRuntimeShellPostDecisionRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v427 route-group test: 1 file / 1 test passed.
- Adjacent runtime shell post-decision tests: 6 files / 16 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 360 files / 1186 tests passed.

## Boundary

v427 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
