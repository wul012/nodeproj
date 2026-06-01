# v474 Java / mini-kv route catalog cleanup handoff evidence report roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at `4ab89d0b`, tag `v207-order-platform-shard-readiness-v1-contract-controller-split`, with local v208-like endpoint catalog source/test/fixture changes.
- mini-kv: `D:\C\mini-kv` is at `8046f37`, tag `第一百九十三版路由目录清理收口交接审计冻结`, with local v194-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v474 exposes Node v473 frozen evidence through a JSON/Markdown route and does not consume dirty Java or mini-kv working trees.

## Scope

Node v474 turns the v473 typed handoff evidence into a first-class audit report route:

- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-handoff-evidence`
- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-handoff-evidence?format=markdown`

It registers the route through the shared audit JSON/Markdown catalog and updates route-count expectations to 50 groups / 199 routes.

## Necessity Proof

- Blocker resolved: v473 evidence is now externally inspectable as JSON/Markdown without opening a runtime execution path.
- Later consumer: v475 can archive and verify this route output instead of reconstructing v473 evidence directly.
- Reuse check: this version reuses `auditJsonMarkdownRoute`, the route catalog, and the existing access guard policy pattern.
- Growth stop: only one route is added for the v473 handoff report; no approval chain, upstream service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v474 is a Node report/route version over frozen evidence and is not a pre-approval blocker for either project.

## Validation Result

- Focused Vitest passed: 6 files / 15 tests.
- Typecheck passed.
- Build passed.
- HTTP-style smoke passed through Fastify inject: JSON 200, Markdown 200, ready=true, 16/16 checks.
