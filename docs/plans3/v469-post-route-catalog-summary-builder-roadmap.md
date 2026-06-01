# v469 route catalog summary builder roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is clean at `7e9c999b`, tag `v200-order-platform-shard-readiness-v199-handoff-manifest-snapshot-freeze`.
- mini-kv: `D:\C\mini-kv` is at `2c7526f`, tag `mini-kv-v185-route-catalog-closeout-snapshot`, with v186-like local source/test/fixture changes.
- Node dependency decision: v469 is a Node-only catalog summary extraction. It does not need fresh Java or mini-kv evidence.

## Scope

Node v469 adds a typed route catalog summary builder:

- `flattenAuditJsonMarkdownRouteCatalog(...)`
- `summarizeAuditJsonMarkdownRouteCatalog(...)`
- `domainGroupCounts`
- `domainRouteCounts`

The integrity evaluator reuses the builder instead of owning count logic directly.

## Necessity Proof

- Blocker resolved: after v468, catalog integrity had a clean shape but still owned summary calculation inline.
- Later consumer: v470 can make managed route quality reports consume the typed summary explicitly without duplicating domain counts.
- Reuse check: the builder is shared by the integrity evaluator and a focused test; it does not add a second route table.
- Growth stop: v469 adds one small helper module and one test, not a new route, gate, or evidence chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v469 is not an upstream pre-approval blocker.

## Validation Result

- Focused summary/catalog/route-quality tests passed: 4 files / 8 tests.
- Typecheck passed.
- Build passed.
