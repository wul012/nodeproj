# Node v422 credential resolver implementation plan route group split

## Summary

Node v422 is a maintainability refactor. It extracts the credential-resolver implementation plan route registrations into `src/routes/auditCredentialResolverImplementationPlanRoutes.ts`.

## What Changed

- Added `credentialResolverImplementationPlanAuditJsonMarkdownRoutes`.
- Moved 2 implementation plan routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverImplementationPlanRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 993 lines before, 980 lines after.
- `src/routes/auditCredentialResolverImplementationPlanRoutes.ts`: 22 lines.
- Extracted route count: 2.

## Validation

- Focused v422 route-group test: 1 file / 1 test passed.
- Adjacent approval-required readiness and implementation plan tests: 4 files / 10 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 355 files / 1181 tests passed after rerunning shard 2/4.
- Timeout triage: shard 2/4 first hit a 45s explicit route-table smoke timeout in `test/managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.test.ts`; the file passed alone, shard 2/4 passed on rerun, and no product logic or test budget was changed.

## Boundary

v422 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
