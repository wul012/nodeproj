# v441 credential resolver disabled runtime shell design draft body preparation plan route group split roadmap

## Scope

Node v441 extracts the credential-resolver disabled runtime shell design draft body preparation plan audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanRoutes.ts`.

The extracted group contains disabled runtime shell design draft body preparation plan and preparation plan archive verification routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v440, the central route table still owned the disabled runtime shell design draft body preparation plan and archive verification routes directly.
- Later consumer: body draft candidate route groups can be split next without mixing preparation-plan archive verification with later body-phase routes in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v441 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v441 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused credential-resolver disabled runtime shell design draft body preparation plan route-group regression test passed: 1 file / 1 test.
- Adjacent disabled runtime shell design draft body preparation plan tests passed: 3 files / 9 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 374 files / 1200 tests.
- Shard 3 had timeout-only failures on first run; the 6 affected files passed individually, and shard 3 passed on rerun.
- Browser screenshot is not required because v441 does not add or change a renderable UI page.
