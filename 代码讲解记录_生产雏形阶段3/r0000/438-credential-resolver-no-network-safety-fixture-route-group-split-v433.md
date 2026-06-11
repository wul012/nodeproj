# Node v433 Code Walkthrough: credential resolver no-network safety fixture route group split

## Goal

v433 keeps shrinking the central audit route table. It moves the no-network safety fixture phase into a dedicated route group.

## Split Shape

- Added `src/routes/auditCredentialResolverNoNetworkSafetyFixtureRoutes.ts`.
- Exported `credentialResolverNoNetworkSafetyFixtureAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- no-network safety fixture contract intake
- no-network safety fixture upstream echo verification
- no-network safety fixture prerequisite closure review

## Verification

`test/auditCredentialResolverNoNetworkSafetyFixtureRoutes.test.ts` verifies the route group has all 3 paths, the central route table registers the group through the shared spread, and the latest prerequisite closure review route still returns JSON and Markdown `200`.

The test also keeps the safety fields pinned to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `networkSafetyFixtureExecuted`, `httpRequestSent`, `tcpConnectionAttempted`, `networkSocketOpened`, `schemaMigrationExecuted`, `approvalLedgerWritten`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
