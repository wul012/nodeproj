# v463 audit route quality catalog integrity roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is at `ffb2fd7f`, tag `v196-order-platform-shard-readiness-v1-contract-operator-checklist`, with local v197-like checklist snapshot files and docs.
- mini-kv: `D:\C\mini-kv` is at `989d13d`, tag `第一百八十一版路由目录完整性窗口`, with one untracked `fixtures/release/shard-readiness-v181.json`.
- Node dependency decision: v463 consumes Node's own route catalog integrity result. It does not need fresh Java or mini-kv evidence.

## Scope

Node v463 upgrades `managedAuditRouteRegistrationTableQualityPass` from a stale v240 route-table snapshot to the current v459-v462 catalog semantics.

The report now includes catalog integrity readiness, 49 route groups, 198 flattened routes, 49 source anchors, duplicate-path count, empty-group count, route-table/catalog alignment, and source-anchor alignment.

## Necessity Proof

- Blocker resolved: the route quality report still claimed a 44-route configuration table even after v459-v462 moved the project to a 49-group / 198-route catalog.
- Later consumer: v464 final validation can treat the quality report, catalog tests, and migrated route-group tests as one consistent route-governance surface.
- Reuse check: v463 consumes `evaluateAuditJsonMarkdownRouteCatalogIntegrity(...)`; it does not reimplement duplicate detection or route flattening.
- Growth stop: v463 is a report/test upgrade only. It does not add another route, approval, evidence, readiness, receipt, or runtime execution chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v463 is not an upstream pre-approval blocker.

## Validation Result

- Route-registration quality pass, managed-audit route-quality route, and downstream dry-run command package tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.
- Defer full Vitest to v464 final validation.
