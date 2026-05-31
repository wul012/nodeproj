# Node v431 credential resolver credential handle approval route group split

## Summary

Node v431 is a maintainability refactor. It extracts the credential-resolver credential handle approval route registrations into `src/routes/auditCredentialResolverCredentialHandleApprovalRoutes.ts`.

## What Changed

- Added `credentialResolverCredentialHandleApprovalAuditJsonMarkdownRoutes`.
- Moved 3 credential handle approval routes from the central table into the domain route group.
- Kept every API path, loader, renderer, JSON response, and Markdown response unchanged.
- Added `test/auditCredentialResolverCredentialHandleApprovalRoutes.test.ts` to prove the extracted group is still registered through the shared audit route table.

## Code Shape

- `src/routes/auditJsonMarkdownRoutes.ts`: 772 lines before, 751 lines after.
- `src/routes/auditCredentialResolverCredentialHandleApprovalRoutes.ts`: 30 lines.
- Extracted route count: 3.

## Validation

- Focused v431 route-group test: 1 file / 1 test passed.
- Adjacent credential handle approval tests: 4 files / 13 tests passed.
- Typecheck passed.
- Build passed.
- Full Vitest shards: 364 files / 1190 tests passed.
- Timeout-only reruns passed before shard reruns: `managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.test.ts` and `productionReadinessSummaryV13.test.ts`.

## Boundary

v431 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, or runtime execution behavior.
