# v412 Java / mini-kv active shard plan route group split roadmap

## Scope

Node v412 extracts the Java / mini-kv active shard plan, live-read gate plan, and operator service lifecycle audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditJavaMiniKvActiveShardPlanRoutes.ts`.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v410-v411, the central route table still owned a coherent active-shard/live-read/operator-lifecycle route cluster.
- Later consumer: future active-shard or live-read planning work can extend one domain route group instead of growing the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v412 stops at active-shard route extraction and regression coverage. It does not introduce another approval, runtime, or pass-evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v412 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused active-shard route-group regression test.
- Adjacent active-shard, live-read gate plan, and operator service lifecycle tests.
- Typecheck and build.
- Full Vitest shards before commit because the shared audit route table changed.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
