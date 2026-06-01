# v471 route catalog expected integrity snapshot roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is clean at `79be6529`, tag `v201-order-platform-shard-readiness-v199-handoff-manifest-historical-snapshot-compatibility`.
- mini-kv: `D:\C\mini-kv` is clean at `1b6a565`, tag `mini-kv-v186-route-catalog-anchor-removal-audit`.
- Node dependency decision: v471 is a Node-only catalog integrity ownership cleanup. It does not need fresh Java or mini-kv evidence.

## Scope

Node v471 moves the expected audit route catalog integrity snapshot factory into `auditJsonMarkdownRouteCatalogIntegrity.ts` and makes the route-quality service consume that factory.

## Necessity Proof

- Blocker resolved: v470 centralized expected summary counts, but the route-quality service still assembled an integrity result object locally.
- Later consumer: v472 can close the batch with one catalog-owned fallback path and stronger full validation.
- Reuse check: the expected snapshot is tested against the live catalog evaluator.
- Growth stop: v471 moves an existing fallback object to the catalog layer and removes the service-local copy.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v471 is not an upstream pre-approval blocker.

## Validation Result

- Focused catalog/route-quality tests passed: 3 files / 7 tests.
- Typecheck passed.
- Build passed.
