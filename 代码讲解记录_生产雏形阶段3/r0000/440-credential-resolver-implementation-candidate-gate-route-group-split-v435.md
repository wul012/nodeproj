# Node v435 Code Walkthrough: credential resolver implementation candidate gate route group split

## Goal

v435 keeps shrinking the central audit route table. It moves the implementation candidate gate hardening phase into a dedicated route group.

## Split Shape

- Added `src/routes/auditCredentialResolverImplementationCandidateGateRoutes.ts`.
- Exported `credentialResolverImplementationCandidateGateAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 2 extracted loaders and renderers.

## Route Coverage

The extracted group contains 2 JSON/Markdown routes:

- implementation candidate gate input-hardening decision
- candidate gate upstream hardening review

## Verification

`test/auditCredentialResolverImplementationCandidateGateRoutes.test.ts` verifies the route group has both paths, the central route table registers the group through the shared spread, and the candidate gate upstream hardening review route still returns JSON and Markdown `200`.

The test also keeps the safety fields pinned to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `httpRequestSent`, `tcpConnectionAttempted`, `miniKvWriteCommandAllowed`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
