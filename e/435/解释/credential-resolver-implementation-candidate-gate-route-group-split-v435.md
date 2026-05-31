# Node v435 credential resolver implementation candidate gate route group split

## Summary

Node v435 is a maintainability refactor. It extracts the credential-resolver implementation candidate gate route registrations into `src/routes/auditCredentialResolverImplementationCandidateGateRoutes.ts`.

## What Changed

- Added `credentialResolverImplementationCandidateGateAuditJsonMarkdownRoutes`.
- Moved 2 implementation candidate gate hardening routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverImplementationCandidateGateRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 688 lines before, 675 lines after.
- `src/routes/auditCredentialResolverImplementationCandidateGateRoutes.ts`: 22 lines.
- Extracted route count: 2.

## Validation

- Focused v435 route-group test: 1 file / 1 test passed.
- Adjacent implementation candidate gate tests: 3 files / 9 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 368 files / 1194 tests passed.

## Boundary

v435 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, or runtime execution behavior.
