# v414 minimal shard readiness route group split roadmap

## Scope

Node v414 extracts the minimal shard-readiness contract, live-read, compatibility, and regular-gate audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditMinimalShardReadinessRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v410-v413, the central route table still owned the minimal shard-readiness route cluster immediately before the Java/mini-kv shard-readiness evidence group.
- Later consumer: future shard-readiness route work can extend a focused minimal shard-readiness route group without adding another loader block to the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v414 stops at route registration extraction and regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v414 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused minimal shard-readiness route-group regression test.
- Adjacent extracted route-group tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
