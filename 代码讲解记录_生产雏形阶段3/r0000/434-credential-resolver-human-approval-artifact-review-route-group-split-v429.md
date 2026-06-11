# Node v429 Code Walkthrough: credential resolver human approval artifact review route group split

## Goal

v429 keeps shrinking the central audit route table. It moves the human approval artifact review phase into a dedicated route group.

## Split Shape

- Added `src/routes/auditCredentialResolverHumanApprovalArtifactReviewRoutes.ts`.
- Exported `credentialResolverHumanApprovalArtifactReviewAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 5 extracted loaders and renderers.

## Route Coverage

The extracted group contains 5 JSON/Markdown routes:

- human approval artifact review packet
- human approval artifact review upstream echo verification
- human approval artifact review post-echo decision gate
- human approval artifact review post-echo decision upstream echo verification
- human approval artifact review governance-stop prerequisite closure decision

## Verification

`test/auditCredentialResolverHumanApprovalArtifactReviewRoutes.test.ts` verifies the route group has all 5 paths, the central route table registers the group through the shared spread, and the latest governance-stop prerequisite closure decision route still returns JSON and Markdown `200`.

The test also keeps the safety fields pinned to false: `executionAllowed`, `connectsManagedAudit`, `credentialValueRead`, `rawEndpointUrlParsed`, `externalRequestSent`, `schemaMigrationExecuted`, `approvalLedgerWritten`, and `automaticUpstreamStart`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, so the route split is covered against the GitHub-runner-style historical fixture fallback.
