# v431 credential resolver credential handle approval route group split roadmap

## Scope

Node v431 extracts the credential-resolver credential handle approval audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverCredentialHandleApprovalRoutes.ts`.

The extracted group contains credential handle approval contract intake, contract upstream echo verification, and prerequisite closure review routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v430, the central route table still owned the credential handle approval prerequisite phase directly.
- Later consumer: endpoint-handle allowlist route groups can be split next without mixing credential-handle closure and endpoint-handle contract intake in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v431 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v431 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused credential-resolver credential handle approval route-group regression test passed: 1 file / 1 test.
- Adjacent credential handle approval tests passed: 4 files / 13 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed after timeout triage: 364 files / 1190 tests.
- Timeout triage: `managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewUpstreamEchoVerification.test.ts` and `productionReadinessSummaryV13.test.ts` each timed out only inside a full shard; both passed individually before the affected shard was rerun successfully.
- Browser screenshot is not required because v431 does not add or change a renderable UI page.
