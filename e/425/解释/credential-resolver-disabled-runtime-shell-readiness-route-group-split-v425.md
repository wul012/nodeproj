# Node v425 credential resolver disabled runtime shell readiness route group split

## Summary

Node v425 is a maintainability refactor. It extracts the credential-resolver disabled runtime shell readiness route registrations into `src/routes/auditCredentialResolverDisabledRuntimeShellReadinessRoutes.ts`.

## What Changed

- Added `credentialResolverDisabledRuntimeShellReadinessAuditJsonMarkdownRoutes`.
- Moved 4 disabled runtime shell readiness routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverDisabledRuntimeShellReadinessRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 930 lines before, 901 lines after.
- `src/routes/auditCredentialResolverDisabledRuntimeShellReadinessRoutes.ts`: 38 lines.
- Extracted route count: 4.

## Validation

- Focused v425 route-group test: 1 file / 1 test passed.
- Adjacent disabled runtime shell readiness tests: 7 files / 22 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 358 files / 1184 tests passed.

## Boundary

v425 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
