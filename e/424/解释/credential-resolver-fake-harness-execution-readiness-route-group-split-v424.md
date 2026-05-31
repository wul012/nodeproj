# Node v424 credential resolver fake-harness execution readiness route group split

## Summary

Node v424 is a maintainability refactor. It extracts the credential-resolver fake-harness execution readiness route registrations into `src/routes/auditCredentialResolverFakeHarnessExecutionReadinessRoutes.ts`.

## What Changed

- Added `credentialResolverFakeHarnessExecutionReadinessAuditJsonMarkdownRoutes`.
- Moved 4 fake-harness execution/readiness routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverFakeHarnessExecutionReadinessRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 959 lines before, 930 lines after.
- `src/routes/auditCredentialResolverFakeHarnessExecutionReadinessRoutes.ts`: 38 lines.
- Extracted route count: 4.

## Validation

- Focused v424 route-group test: 1 file / 1 test passed.
- Adjacent fake-harness execution/readiness tests: 7 files / 21 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 357 files / 1183 tests passed.

## Boundary

v424 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
