# v432 credential resolver endpoint handle allowlist approval route group split roadmap

## Scope

Node v432 extracts the credential-resolver endpoint handle allowlist approval audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverEndpointHandleAllowlistApprovalRoutes.ts`.

The extracted group contains endpoint handle allowlist approval contract intake, contract upstream echo verification, and prerequisite closure review routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v431, the central route table still owned the endpoint handle allowlist approval prerequisite phase directly.
- Later consumer: no-network safety fixture route groups can be split next without mixing endpoint-handle closure and no-network contract intake in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v432 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v432 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused credential-resolver endpoint handle allowlist approval route-group regression test passed: 1 file / 1 test.
- Adjacent endpoint handle allowlist approval tests passed: 4 files / 13 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 365 files / 1191 tests.
- Browser screenshot is not required because v432 does not add or change a renderable UI page.
