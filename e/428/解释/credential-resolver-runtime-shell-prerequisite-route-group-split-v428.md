# Node v428 credential resolver runtime shell prerequisite route group split

## Summary

Node v428 is a maintainability refactor. It extracts the credential-resolver runtime shell prerequisite route registrations into `src/routes/auditCredentialResolverRuntimeShellPrerequisiteRoutes.ts`.

## What Changed

- Added `credentialResolverRuntimeShellPrerequisiteAuditJsonMarkdownRoutes`.
- Moved 4 runtime shell prerequisite routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverRuntimeShellPrerequisiteRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 859 lines before, 830 lines after.
- `src/routes/auditCredentialResolverRuntimeShellPrerequisiteRoutes.ts`: 38 lines.
- Extracted route count: 4.

## Validation

- Focused v428 route-group test: 1 file / 1 test passed.
- Adjacent runtime shell prerequisite tests: 7 files / 22 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 361 files / 1187 tests passed.

## Boundary

v428 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
