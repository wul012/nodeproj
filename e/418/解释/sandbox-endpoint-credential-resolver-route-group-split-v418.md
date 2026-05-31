# Node v418 sandbox endpoint credential resolver route group split

## Summary

Node v418 is a maintainability refactor. It extracts the sandbox endpoint credential-resolver route registrations into `src/routes/auditSandboxEndpointCredentialResolverRoutes.ts`.

## What Changed

- Added `sandboxEndpointCredentialResolverAuditJsonMarkdownRoutes`.
- Moved 8 sandbox endpoint credential-resolver routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditSandboxEndpointCredentialResolverRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1133 lines before, 1072 lines after.
- `src/routes/auditSandboxEndpointCredentialResolverRoutes.ts`: 70 lines.
- Extracted route count: 8.

## Validation

- Focused v418 route-group test: 1 file / 1 test passed.
- Adjacent route-group and sandbox endpoint credential-resolver tests: 5 files / 13 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 351 files / 1177 tests passed after rerunning shard 3/4.
- Timeout triage: shard 3/4 first hit 15s route-table smoke timeouts in `managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.test.ts` and `managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.test.ts`; both files passed alone.
- Timeout triage: shard 3/4 then hit a 45s route-table smoke timeout in `managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.test.ts`; the file passed alone, and shard 3/4 passed on rerun.

## Boundary

v418 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
