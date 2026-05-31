# v416 managed-audit-disabled read-only integration route group split roadmap

## Scope

Node v416 extracts the managed-audit-disabled read-only integration intake, archive verification, and decision-record audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditDisabledReadOnlyIntegrationRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v415, the central route table still owned the managed-audit-disabled read-only integration transition before sandbox handle review begins.
- Later consumer: sandbox handle review can remain the next independent route group without dragging managed-audit-disabled integration routes through the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v416 stops at route registration extraction and regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v416 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused managed-audit-disabled read-only integration route-group regression test.
- Adjacent extracted route-group and managed-audit-disabled read-only integration service tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Treat timeout-only failures separately: rerun the failing file alone, then rerun the affected shard before changing product logic.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
