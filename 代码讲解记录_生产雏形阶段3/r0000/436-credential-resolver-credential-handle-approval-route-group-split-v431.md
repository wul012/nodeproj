# Node v431 Code Walkthrough: credential resolver credential handle approval route group split

## Goal

v431 keeps shrinking the central audit route table. It moves the credential handle approval phase into a dedicated route group.

## Split Shape

- Added `src/routes/auditCredentialResolverCredentialHandleApprovalRoutes.ts`.
- Exported `credentialResolverCredentialHandleApprovalAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- credential handle approval contract intake
- credential handle approval contract upstream echo verification
- credential handle approval prerequisite closure review

## Verification

`test/auditCredentialResolverCredentialHandleApprovalRoutes.test.ts` verifies the route group has all 3 paths, the central route table registers the group through the shared spread, and the latest prerequisite closure review route still returns JSON and Markdown `200`.

The test also keeps the safety fields pinned to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `schemaMigrationExecuted`, `approvalLedgerWritten`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
