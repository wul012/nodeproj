# v415 minimal read-only integration route group split roadmap

## Scope

Node v415 extracts the minimal read-only integration window, smoke, gate execution, archive verification, and operator/CI handoff audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditMinimalReadOnlyIntegrationRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v414, the central route table still owned a 12-route minimal read-only integration cluster directly before the shard-readiness groups.
- Later consumer: future minimal read-only integration archive and handoff maintenance can extend one domain route group instead of growing the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v415 stops at route registration extraction and regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v415 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused minimal read-only integration route-group regression test.
- Adjacent extracted route-group and minimal read-only integration service tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Treat timeout-only failures separately: rerun the failing file alone, then rerun the affected shard before changing product logic.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
