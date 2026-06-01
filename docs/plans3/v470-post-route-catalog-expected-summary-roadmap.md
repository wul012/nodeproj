# v470 route catalog expected summary roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is at `7e9c999b`, tag `v200-order-platform-shard-readiness-v199-handoff-manifest-snapshot-freeze`, with v201-like historical snapshot compatibility test/docs changes.
- mini-kv: `D:\C\mini-kv` is at `2c7526f`, tag `mini-kv-v185-route-catalog-closeout-snapshot`, with v186-like route catalog closeout source/test/fixture changes.
- Node dependency decision: v470 is a Node-only expected-summary centralization. It does not need fresh Java or mini-kv evidence.

## Scope

Node v470 centralizes the expected audit JSON/Markdown route catalog summary in the route summary module and makes the route-quality default snapshot reuse it.

## Necessity Proof

- Blocker resolved: v469 added a summary builder, but the route-quality fallback snapshot still duplicated group/route/domain counts.
- Later consumer: v471 can document the clean catalog summary contract without reconciling service-local count copies.
- Reuse check: the expected summary lives beside the summary builder and is tested against the live catalog.
- Growth stop: v470 removes duplicate literals from the service snapshot and adds no route, gate, or evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v470 is not an upstream pre-approval blocker.

## Validation Result

- Focused expected-summary/catalog/route-quality tests passed: 3 files / 7 tests.
- Typecheck passed.
- Build passed.
