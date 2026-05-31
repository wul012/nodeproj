# Node v430 Code Walkthrough: credential resolver signed human approval artifact route group split

## Goal

v430 keeps shrinking the central audit route table. It moves the signed human approval artifact phase into a dedicated route group.

## Split Shape

- Added `src/routes/auditCredentialResolverSignedHumanApprovalArtifactRoutes.ts`.
- Exported `credentialResolverSignedHumanApprovalArtifactAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- signed human approval artifact contract intake
- signed human approval artifact contract upstream echo verification
- signed human approval artifact prerequisite closure review

## Verification

`test/auditCredentialResolverSignedHumanApprovalArtifactRoutes.test.ts` verifies the route group has all 3 paths, the central route table registers the group through the shared spread, and the latest prerequisite closure review route still returns JSON and Markdown `200`.

The test also keeps the safety fields pinned to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `schemaMigrationExecuted`, `approvalLedgerWritten`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
