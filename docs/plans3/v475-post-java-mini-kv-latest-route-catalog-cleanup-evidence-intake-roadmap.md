# v475 Java / mini-kv latest route catalog cleanup evidence intake roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at `ff116a92`, tag `v208-order-platform-shard-readiness-v1-contract-endpoint-catalog`, with local v209-like endpoint catalog snapshot changes.
- mini-kv: `D:\C\mini-kv` is at `8046f37`, tag `第一百九十三版路由目录清理收口交接审计冻结`, with local v194-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v475 consumes Java v207/v208 and mini-kv v193 tagged evidence only; it does not consume dirty Java v209 or mini-kv v194 work.

## Scope

Node v475 adds a typed latest-evidence intake over:

- Java v207 controller split evidence.
- Java v208 endpoint catalog evidence.
- Java v208 endpoint catalog static fixture.
- mini-kv v193 route catalog cleanup handoff audit freeze fixture.

## Necessity Proof

- Blocker resolved: Node now has a frozen reader for the newest completed sibling route-catalog cleanup handoff tags.
- Later consumer: v476+ can expose or archive these latest tagged inputs without reading sibling dirty working trees.
- Reuse check: v475 reuses the historical evidence resolver and does not add another route or report chain.
- Growth stop: this version is evidence intake only; it adds no approval, runtime execution, service startup, write path, or managed-audit connection.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. Node v475 consumes frozen tagged evidence and is not a pre-approval blocker for Java v209 or mini-kv v194 work.

## Validation Plan

- Focused Vitest: `test/javaMiniKvRouteCatalogCleanupLatestEvidence.test.ts`.
- Forced historical fallback: `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` inside the focused test.
- Typecheck.
- Build.
