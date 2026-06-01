# v467 route catalog anchor removal roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is at `64d1dfdb`, tag `v198-order-platform-shard-readiness-v196-operator-checklist-historical-snapshot-compatibility`, with v199-like handoff manifest/controller/test/docs changes.
- mini-kv: `D:\C\mini-kv` is at `506ff62`, tag `第一百八十四版路由目录最终收口窗口`, with v185-like route-catalog closeout source/test/fixture changes.
- Node dependency decision: v467 removes Node-only compatibility anchors. It does not need fresh Java or mini-kv evidence.

## Scope

Node v467 removes `auditJsonMarkdownRouteGroupSourceAnchors` entirely from the route catalog test path. Route group tests now rely only on typed catalog identity, route order, and flatMap alignment.

## Necessity Proof

- Blocker resolved: after v466, anchors were no longer needed for the central route table but still existed as a compatibility test dependency.
- Later consumer: v468 can simplify catalog integrity and route-quality reports so they no longer mention source-anchor counts.
- Reuse check: the shared test helper still verifies the catalog and central flattened route table; it simply stops requiring string anchors.
- Growth stop: v467 removes metadata rather than adding new reporting or verification chains.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v467 is not an upstream pre-approval blocker.

## Validation Result

- Affected route-group/catalog/route-quality tests passed: 53 files / 59 tests.
- Typecheck passed.
- Build passed.
