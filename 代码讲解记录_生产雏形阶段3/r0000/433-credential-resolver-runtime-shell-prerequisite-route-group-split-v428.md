# Node v428 Code Walkthrough: credential resolver runtime shell prerequisite route group split

## Goal

v428 keeps shrinking the central audit route table. It moves the credential resolver runtime shell chain-stop/prerequisite and approval prerequisite artifact route registrations into a dedicated domain route group.

## Split Shape

- Added `src/routes/auditCredentialResolverRuntimeShellPrerequisiteRoutes.ts`.
- Exported `credentialResolverRuntimeShellPrerequisiteAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 4 extracted loaders and renderers.

## Route Coverage

The extracted group contains 4 JSON/Markdown routes:

- runtime shell chain-stop-or-prerequisite decision record
- runtime shell chain-stop prerequisite upstream echo verification
- approval prerequisite artifact intake plan
- approval prerequisite artifact upstream echo verification

## Verification

`test/auditCredentialResolverRuntimeShellPrerequisiteRoutes.test.ts` verifies the route group has all 4 paths, the central route table registers the group through the shared spread, and the latest approval prerequisite artifact upstream echo route still returns JSON and Markdown `200`.

The test also keeps the safety fields pinned to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `schemaMigrationExecuted`, `approvalLedgerWritten`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
