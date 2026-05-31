# Node v432 credential resolver endpoint handle allowlist approval route group split

## Summary

Node v432 is a maintainability refactor. It extracts the credential-resolver endpoint handle allowlist approval route registrations into `src/routes/auditCredentialResolverEndpointHandleAllowlistApprovalRoutes.ts`.

## What Changed

- Added `credentialResolverEndpointHandleAllowlistApprovalAuditJsonMarkdownRoutes`.
- Moved 3 endpoint handle allowlist approval routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverEndpointHandleAllowlistApprovalRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 751 lines before, 730 lines after.
- `src/routes/auditCredentialResolverEndpointHandleAllowlistApprovalRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v432 route-group test: 1 file / 1 test passed.
- Adjacent endpoint handle allowlist approval tests: 4 files / 13 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 365 files / 1191 tests passed.

## Boundary

v432 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
