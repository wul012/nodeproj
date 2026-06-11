# Node v437 Code Walkthrough: credential resolver disabled runtime shell design draft outline route group split

## Goal

v437 keeps shrinking the central audit route table. It moves the disabled runtime shell design draft outline phase into a dedicated route group.

## Split Shape

- Added `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftOutlineRoutes.ts`.
- Exported `credentialResolverDisabledRuntimeShellDesignDraftOutlineAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 2 extracted loaders and renderers.

## Route Coverage

The extracted group contains 2 JSON/Markdown routes:

- disabled runtime shell design draft outline intake
- disabled runtime shell design draft outline archive verification

## Verification

`test/auditCredentialResolverDisabledRuntimeShellDesignDraftOutlineRoutes.test.ts` verifies the route group has both paths, the central route table registers the group through the shared spread, and the outline archive verification route still returns JSON and Markdown `200`.

The test also keeps the safety fields pinned to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `httpRequestSent`, `tcpConnectionAttempted`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
