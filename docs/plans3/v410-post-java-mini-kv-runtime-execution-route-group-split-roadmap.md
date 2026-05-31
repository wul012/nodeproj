# v410 Java / mini-kv runtime execution route group split roadmap

## Scope

Node v410 extracts the Java / mini-kv runtime execution audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditJavaMiniKvRuntimeExecutionRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: `auditJsonMarkdownRoutes.ts` kept growing with each runtime execution version and was trending back toward a giant route file.
- Later consumer: future runtime execution route work can add to one domain route group instead of extending the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v410 stops at the route group extraction and regression test. It does not add another runtime approval/pass-evidence gate.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v410 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused route-group regression test.
- Adjacent v408+v409 route tests plus the new v410 structure test.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
