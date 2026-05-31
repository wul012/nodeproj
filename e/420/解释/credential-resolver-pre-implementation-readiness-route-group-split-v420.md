# Node v420 credential resolver pre-implementation readiness route group split

## Summary

Node v420 is a maintainability refactor. It extracts the credential-resolver pre-implementation readiness route registrations into `src/routes/auditCredentialResolverPreImplementationReadinessRoutes.ts`.

## What Changed

- Added `credentialResolverPreImplementationReadinessAuditJsonMarkdownRoutes`.
- Moved 4 credential-resolver pre-implementation readiness routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverPreImplementationReadinessRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1051 lines before, 1022 lines after.
- `src/routes/auditCredentialResolverPreImplementationReadinessRoutes.ts`: 38 lines.
- Extracted route count: 4.

## Validation

- Focused v420 route-group test: 1 file / 1 test passed.
- Adjacent route-group, blocked decision, plan intake, plan intake upstream echo, and disabled candidate tests: 6 files / 18 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 353 files / 1179 tests passed.

## Boundary

v420 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
