# Node v423 credential resolver fake-harness contract route group split

## Summary

Node v423 is a maintainability refactor. It extracts the credential-resolver fake-harness contract route registrations into `src/routes/auditCredentialResolverFakeHarnessContractRoutes.ts`.

## What Changed

- Added `credentialResolverFakeHarnessContractAuditJsonMarkdownRoutes`.
- Moved 3 fake-harness contract routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverFakeHarnessContractRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 980 lines before, 959 lines after.
- `src/routes/auditCredentialResolverFakeHarnessContractRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v423 route-group test: 1 file / 1 test passed.
- Adjacent implementation plan and fake-harness contract tests: 6 files / 18 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 356 files / 1182 tests passed.

## Boundary

v423 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
