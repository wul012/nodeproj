# v427 credential resolver runtime shell post-decision route group split roadmap

## Scope

Node v427 extracts the credential-resolver runtime shell post-decision continuation plan intake, post-decision continuation catalog quality pass, and post-decision plan intake upstream echo audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverRuntimeShellPostDecisionRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v426, the central route table still owned the adjacent runtime shell post-decision continuation chain.
- Later consumer: future chain-stop/prerequisite and approval-prerequisite route groups can be split without re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v427 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v427 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver runtime shell post-decision route-group regression test with forced historical fixture fallback.
- Adjacent runtime shell decision, continuation plan intake, catalog quality pass, upstream echo, and chain-stop entry tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
