# v435 credential resolver implementation candidate gate route group split roadmap

## Scope

Node v435 extracts the credential-resolver implementation candidate gate audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverImplementationCandidateGateRoutes.ts`.

The extracted group contains implementation candidate gate input-hardening decision and candidate gate upstream hardening review routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v434, the central route table still owned the implementation candidate gate hardening routes directly.
- Later consumer: disabled runtime shell design draft route groups can be split next without mixing candidate-gate hardening and design-draft candidate routes in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v435 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v435 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused credential-resolver implementation candidate gate route-group regression test passed: 1 file / 1 test.
- Adjacent implementation candidate gate tests passed: 3 files / 9 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 368 files / 1194 tests.
- Browser screenshot is not required because v435 does not add or change a renderable UI page.
