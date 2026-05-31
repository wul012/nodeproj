# v413 Java / mini-kv shard readiness evidence route group split roadmap

## Scope

Node v413 extracts the Java / mini-kv shard readiness evidence consumption and completed shard readiness evidence intake audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditJavaMiniKvShardReadinessEvidenceRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v410-v412, the central route table still owned a coherent shard-readiness evidence route cluster.
- Later consumer: future shard-readiness evidence work can extend one domain route group instead of growing the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v413 stops at shard-readiness evidence route extraction and regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v413 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused shard-readiness evidence route-group regression test.
- Adjacent shard-readiness evidence tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
