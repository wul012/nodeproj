# Node v433 credential resolver no-network safety fixture route group split

## Summary

Node v433 is a maintainability refactor. It extracts the credential-resolver no-network safety fixture route registrations into `src/routes/auditCredentialResolverNoNetworkSafetyFixtureRoutes.ts`.

## What Changed

- Added `credentialResolverNoNetworkSafetyFixtureAuditJsonMarkdownRoutes`.
- Moved 3 no-network safety fixture routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverNoNetworkSafetyFixtureRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 730 lines before, 709 lines after.
- `src/routes/auditCredentialResolverNoNetworkSafetyFixtureRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v433 route-group test: 1 file / 1 test passed.
- Adjacent no-network safety fixture tests: 4 files / 13 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 366 files / 1192 tests passed.

## Boundary

v433 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, network fixture execution, HTTP/TCP network action, or runtime execution behavior.
