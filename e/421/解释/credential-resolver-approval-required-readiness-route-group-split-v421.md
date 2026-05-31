# Node v421 credential resolver approval-required readiness route group split

## Summary

Node v421 is a maintainability refactor. It extracts the credential-resolver approval-required readiness route registrations into `src/routes/auditCredentialResolverApprovalRequiredReadinessRoutes.ts`.

## What Changed

- Added `credentialResolverApprovalRequiredReadinessAuditJsonMarkdownRoutes`.
- Moved 4 approval-required readiness routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverApprovalRequiredReadinessRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 1022 lines before, 993 lines after.
- `src/routes/auditCredentialResolverApprovalRequiredReadinessRoutes.ts`: 38 lines.
- Extracted route count: 4.

## Validation

- Focused v421 route-group test: 1 file / 1 test passed.
- Adjacent route-group, disabled candidate echo, approval-required boundary echo, implementation readiness review, and implementation readiness upstream echo tests: 6 files / 17 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 354 files / 1180 tests passed after rerunning shard 4/4.
- Timeout triage: shard 4/4 first hit a 60s explicit test timeout in `test/productionLiveProbeRealReadSmokeProductionPassEvidenceArchiveVerification.test.ts`; the file passed alone, shard 4/4 passed on rerun, and no product logic or test budget was changed.

## Boundary

v421 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
