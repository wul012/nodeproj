# Node v445 managed audit identity approval route group split

## Summary

Node v445 is a maintainability refactor. It extracts the managed audit identity approval binding contract, provenance dry-run packet, and provenance packet verification report route registrations into `src/routes/auditManagedAuditIdentityApprovalRoutes.ts`.

## What Changed

- Added `managedAuditIdentityApprovalAuditJsonMarkdownRoutes`.
- Moved 3 managed audit identity approval routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditManagedAuditIdentityApprovalRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 538 lines before, 505 lines after.
- `src/routes/auditManagedAuditIdentityApprovalRoutes.ts`: 42 lines.
- Extracted route count: 3.

## Validation

- Focused v445 route-group test: 1 file / 1 test passed.
- Adjacent managed audit identity approval tests: 4 files / 10 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 378 files / 1204 tests passed.
- Shard 1 first saw a timeout-only failure in `test/productionLiveProbeRealReadSmokeProductionPassEvidenceVerification.test.ts`; that file passed alone and shard 1 passed on rerun.
- Historical fixture fallback was forced through `process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true"` and Java/mini-kv paths were verified under `fixtures/historical/sibling-workspaces/...`.

## Boundary

v445 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, or runtime execution behavior.
