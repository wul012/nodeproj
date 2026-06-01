# v458 foundational audit route group split roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` has in-progress v187-style work: `OpsShardReadinessV1ContractAlignment*`, `advanced-order-platform/e/187/`, and related endpoint registry updates are dirty. Latest committed baseline remains `5975173b`, tag `v186-order-platform-shard-readiness-historical-endpoint-snapshot-compatibility`. Java can continue in parallel; Node v458 must not touch it.
- mini-kv: `D:\C\mini-kv` has in-progress v176-style work: `e/176/`, `fixtures/release/shard-readiness-v175.json`, route split window source changes, and a walkthrough for Node v457 coverage are dirty. Latest committed baseline remains `33d90e9`, tag `第一百七十五版Node路由拆分窗口扩展至v449`. mini-kv can continue in parallel; Node v458 must not touch it.
- Node dependency decision: v458 is a Node route-table refactor only. It does not need fresh Java or mini-kv evidence and is not a pre-approval blocker for either project.

## Scope

Node v458 extracts the remaining foundational audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditFoundationalRoutes.ts`.

The extracted group contains:

- `/api/v1/audit/store-profile`
- `/api/v1/audit/store-config-profile`
- `/api/v1/audit/file-restart-evidence`
- `/api/v1/audit/retention-integrity-evidence`
- `/api/v1/audit/managed-store-contract`
- `/api/v1/audit/managed-readiness-summary`

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v457, the central route table still directly owned 6 foundational audit registrations.
- Later consumer: future route-table work can use `auditJsonMarkdownRoutes.ts` as a pure route-group composition list instead of mixing route groups with direct registrations.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v458 stops at route registration extraction and focused route regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel.

- Java next direction: continue its in-progress v187 contract alignment if that remains the active Java plan.
- mini-kv next direction: continue its in-progress v176 read-only Node route split compatibility window through Node v457.
- Node v458 is not an upstream pre-approval blocker.

## Validation Result

- Focused foundational audit route-group regression test passed: 1 file / 1 test.
- Adjacent foundational audit tests passed: 7 files / 18 tests.
- Typecheck passed.
- Build passed.
- Full Vitest passed: 391 files / 1217 tests.
- Browser screenshot is not required because v458 does not add or change a renderable UI page.
