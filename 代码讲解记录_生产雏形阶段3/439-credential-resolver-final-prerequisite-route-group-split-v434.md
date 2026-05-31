# Node v434 Code Walkthrough: credential resolver final prerequisite route group split

## Goal

v434 keeps shrinking the central audit route table. It moves the final prerequisite closeout phase into a dedicated route group.

## Split Shape

- Added `src/routes/auditCredentialResolverFinalPrerequisiteRoutes.ts`.
- Exported `credentialResolverFinalPrerequisiteAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- abort rollback semantics contract intake
- read-only cross-project readiness runner
- final prerequisite closure review

## Verification

`test/auditCredentialResolverFinalPrerequisiteRoutes.test.ts` verifies the route group has all 3 paths, the central route table registers the group through the shared spread, and the final prerequisite closure review route still returns JSON and Markdown `200`.

The test also keeps the safety fields pinned to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `httpRequestSent`, `tcpConnectionAttempted`, `javaServiceStarted`, `miniKvServiceStarted`, `rollbackExecutionAllowed`, `deploymentActionAllowed`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
