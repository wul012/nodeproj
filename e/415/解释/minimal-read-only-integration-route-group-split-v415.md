# Node v415 minimal read-only integration route group split

## Summary

Node v415 is a maintainability refactor. It extracts the minimal read-only integration route registrations into `src/routes/auditMinimalReadOnlyIntegrationRoutes.ts`.

## What Changed

- Added `minimalReadOnlyIntegrationAuditJsonMarkdownRoutes`.
- Moved 12 minimal read-only integration routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditMinimalReadOnlyIntegrationRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1330 lines before, 1231 lines after.
- `src/routes/auditMinimalReadOnlyIntegrationRoutes.ts`: 108 lines.
- Extracted route count: 12.

## Validation

- Focused v415 route-group test: 1 file / 1 test passed.
- Adjacent route-group and minimal read-only integration tests: 5 files / 9 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 348 files / 1174 tests passed after rerunning shard 2/4.
- Timeout triage: shard 2/4 first hit a 45s timeout in `managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.test.ts`; the failing file passed alone, and shard 2/4 passed on rerun.

## Boundary

v415 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
