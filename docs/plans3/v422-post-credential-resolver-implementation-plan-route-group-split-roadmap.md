# v422 credential resolver implementation plan route group split roadmap

## Scope

Node v422 extracts the credential-resolver implementation plan draft and implementation plan upstream echo audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverImplementationPlanRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v421, the central route table still owned the implementation plan draft plus its upstream echo pair.
- Later consumer: future fake-harness and runtime-shell route groups can be split without re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v422 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v422 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver implementation plan route-group regression test with forced historical fixture fallback.
- Adjacent approval-required readiness and implementation plan service/route tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Treat timeout-only failures separately: rerun the failing file alone, then rerun the affected shard before changing product logic.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
