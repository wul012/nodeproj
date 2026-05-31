# v430 credential resolver signed human approval artifact route group split roadmap

## Scope

Node v430 extracts the credential-resolver signed human approval artifact audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverSignedHumanApprovalArtifactRoutes.ts`.

The extracted group contains signed human approval artifact contract intake, contract upstream echo verification, and prerequisite closure review routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v429, the central route table still owned the signed human approval artifact prerequisite phase directly.
- Later consumer: credential-handle approval route groups can be split next without mixing signed-artifact closure and credential-handle contract intake in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v430 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v430 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused credential-resolver signed human approval artifact route-group regression test passed: 1 file / 1 test.
- Adjacent signed human approval artifact tests passed: 4 files / 13 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 363 files / 1189 tests.
- Browser screenshot is not required because v430 does not add or change a renderable UI page.
