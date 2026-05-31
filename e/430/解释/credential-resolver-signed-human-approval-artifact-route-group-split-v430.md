# Node v430 credential resolver signed human approval artifact route group split

## Summary

Node v430 is a maintainability refactor. It extracts the credential-resolver signed human approval artifact route registrations into `src/routes/auditCredentialResolverSignedHumanApprovalArtifactRoutes.ts`.

## What Changed

- Added `credentialResolverSignedHumanApprovalArtifactAuditJsonMarkdownRoutes`.
- Moved 3 signed human approval artifact routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverSignedHumanApprovalArtifactRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 793 lines before, 772 lines after.
- `src/routes/auditCredentialResolverSignedHumanApprovalArtifactRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v430 route-group test: 1 file / 1 test passed.
- Adjacent signed human approval artifact tests: 4 files / 13 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 363 files / 1189 tests passed.

## Boundary

v430 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
