# Node v416 managed-audit-disabled read-only integration route group split

## Summary

Node v416 is a maintainability refactor. It extracts the managed-audit-disabled read-only integration route registrations into `src/routes/auditManagedAuditDisabledReadOnlyIntegrationRoutes.ts`.

## What Changed

- Added `managedAuditDisabledReadOnlyIntegrationAuditJsonMarkdownRoutes`.
- Moved 3 managed-audit-disabled read-only integration routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditDisabledReadOnlyIntegrationRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1231 lines before, 1210 lines after.
- `src/routes/auditManagedAuditDisabledReadOnlyIntegrationRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v416 route-group test: 1 file / 1 test passed.
- Adjacent route-group and managed-audit-disabled read-only integration tests: 5 files / 9 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 349 files / 1175 tests passed after rerunning shard 1/4 and shard 3/4.
- Timeout triage: shard 1/4 first hit a 45s timeout in `managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionUpstreamEchoVerification.test.ts`; the failing file passed alone, and shard 1/4 passed on rerun.
- Timeout triage: shard 3/4 first hit a 45s timeout in `managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.test.ts`; the failing file passed alone, and shard 3/4 passed on rerun.

## Boundary

v416 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
