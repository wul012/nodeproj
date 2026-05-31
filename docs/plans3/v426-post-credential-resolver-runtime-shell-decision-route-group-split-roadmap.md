# v426 credential resolver runtime shell decision route group split roadmap

## Scope

Node v426 extracts the credential-resolver runtime shell candidate gate upstream echo, runtime shell candidate gate decision record, and runtime shell decision record upstream echo audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditCredentialResolverRuntimeShellDecisionRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v425, the central route table still owned the adjacent runtime shell candidate decision chain.
- Later consumer: future post-decision continuation and approval-prerequisite route groups can be split without re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v426 stops at route registration extraction and focused regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v426 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused credential-resolver runtime shell decision route-group regression test with forced historical fixture fallback.
- Adjacent disabled runtime shell readiness, candidate gate, decision record, decision upstream echo, and post-decision plan intake tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
