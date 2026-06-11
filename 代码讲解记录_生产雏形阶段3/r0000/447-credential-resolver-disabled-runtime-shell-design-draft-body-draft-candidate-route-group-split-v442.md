# Node v442 Code Walkthrough: credential resolver disabled runtime shell design draft body draft candidate route group split

## Goal

v442 keeps shrinking the central audit route table. It moves the disabled runtime shell design draft body draft candidate phase into a dedicated route group.

## Split Shape

- Added `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRoutes.ts`.
- Exported `credentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 2 extracted loaders and renderers.

## Route Coverage

The extracted group contains 2 JSON/Markdown routes:

- disabled runtime shell design draft body draft candidate
- disabled runtime shell design draft body draft candidate archive verification

## Verification

`test/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateRoutes.test.ts` verifies the route group has both paths, the central route table registers the group through the shared spread, and the body draft candidate archive verification route still returns JSON and Markdown `200`.

The test records that the source candidate may write design body text, but still pins runtime and side effects to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `httpRequestSent`, `tcpConnectionAttempted`, `implementsRuntimeShell`, `invokesRuntimeShell`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
