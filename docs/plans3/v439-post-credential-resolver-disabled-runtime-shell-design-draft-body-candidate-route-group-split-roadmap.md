# v439 credential resolver disabled runtime shell design draft body candidate route group split roadmap

## Scope

Node v439 extracts the credential-resolver disabled runtime shell design draft body candidate audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateRoutes.ts`.

The extracted group contains disabled runtime shell design draft body candidate review and body candidate archive verification routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v438, the central route table still owned the disabled runtime shell design draft body candidate review and archive verification routes directly.
- Later consumer: body pre-draft decision route groups can be split next without mixing body candidate archive verification with later body-phase routes in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v439 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v439 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused credential-resolver disabled runtime shell design draft body candidate route-group regression test passed: 1 file / 1 test.
- Adjacent disabled runtime shell design draft body candidate tests passed: 3 files / 9 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 372 files / 1198 tests.
- Browser screenshot is not required because v439 does not add or change a renderable UI page.
