# v417 sandbox handle review route group split roadmap

## Scope

Node v417 extracts the sandbox handle review prerequisite, contract, packet-gate, decision-record, and closure audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditSandboxHandleReviewRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v416, the central route table still owned a 10-route sandbox handle review cluster that sits between managed-audit-disabled integration and older sandbox endpoint routes.
- Later consumer: future sandbox handle review maintenance can stay in one domain route group instead of re-expanding the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v417 stops at route registration extraction and regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v417 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused sandbox handle review route-group regression test.
- Adjacent extracted route-group and sandbox handle review service tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
