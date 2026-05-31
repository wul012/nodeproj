# v411 Java / mini-kv declared operator lifecycle route group split roadmap

## Scope

Node v411 extracts the Java / mini-kv declared operator lifecycle audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditJavaMiniKvDeclaredOperatorLifecycleRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v410, the central route table was still large and still owned a coherent declared-operator lifecycle route cluster.
- Later consumer: future declared-operator lifecycle work can extend one domain route group instead of growing the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v411 stops at declared-operator lifecycle route extraction and regression coverage. It does not introduce another approval or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v411 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused declared-operator lifecycle route-group regression test.
- Adjacent declared-operator lifecycle runtime tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
