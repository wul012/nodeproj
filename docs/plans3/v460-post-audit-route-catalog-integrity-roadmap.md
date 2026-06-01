# v460 audit route catalog integrity roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is at `e46433e3`, tag `v194-order-platform-shard-readiness-v193-evidence-packet-snapshot-freeze`, with one local test-file modification in `OpsShardReadinessHistoricalEndpointSnapshotCompatibilityTests.java`.
- mini-kv: `D:\C\mini-kv` is at `901e46e`, tag `第一百七十九版路由拆分窗口数字跨度审计`, with tracked shard-readiness source/test changes and untracked v180 evidence/history files.
- Node dependency decision: v460 is a Node catalog integrity helper/test pass. It uses frozen local route metadata only and does not need fresh Java or mini-kv evidence.

## Scope

Node v460 adds a typed integrity evaluator for the audit JSON/Markdown route catalog. The evaluator checks route-group count, route count, domain group counts, empty groups, duplicate group ids, duplicate route paths, source-anchor count, and whether `auditJsonMarkdownRoutes` is still the exact flatMap of `auditJsonMarkdownRouteGroups`.

## Necessity Proof

- Blocker resolved: v459 made route groups explicit, but the invariants were only asserted in one test and not reusable by later quality reports.
- Later consumer: v461+ can replace source-string checks and stale route-quality assumptions with the typed integrity result.
- Reuse check: existing route registrations and all HTTP paths are unchanged; v460 adds a pure helper rather than another service chain or route.
- Growth stop: the helper stops at catalog structure validation. It does not introduce approval, readiness, verification, receipt, or runtime execution chains.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. Their current local work is not a Node v460 pre-approval blocker.

## Validation Result

- Focused v459/v460 catalog tests passed: 2 files / 3 tests.
- Typecheck passed.
- Build passed.
- Defer broad Vitest to the final batch version unless a focused regression suggests wider risk.
