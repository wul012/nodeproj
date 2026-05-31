# Node v434 credential resolver final prerequisite route group split

## Summary

Node v434 is a maintainability refactor. It extracts the credential-resolver final prerequisite route registrations into `src/routes/auditCredentialResolverFinalPrerequisiteRoutes.ts`.

## What Changed

- Added `credentialResolverFinalPrerequisiteAuditJsonMarkdownRoutes`.
- Moved 3 final prerequisite routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverFinalPrerequisiteRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 709 lines before, 688 lines after.
- `src/routes/auditCredentialResolverFinalPrerequisiteRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v434 route-group test: 1 file / 1 test passed.
- Adjacent final prerequisite tests: 4 files / 13 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 367 files / 1193 tests passed.

## Boundary

v434 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, rollback execution, deployment action, or runtime execution behavior.
