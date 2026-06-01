# v468 route catalog integrity anchor field removal roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is at `b23e2a1d`, tag `v199-order-platform-shard-readiness-v1-contract-handoff-manifest`, with v200-like handoff manifest snapshot source/test/docs changes.
- mini-kv: `D:\C\mini-kv` is at `506ff62`, tag `mini-kv-v184-route-catalog-final-closeout-window`, with v185-like route-catalog closeout source/test/fixture changes.
- Node dependency decision: v468 is a Node-only cleanup after v467 anchor removal. It does not need fresh Java or mini-kv evidence.

## Scope

Node v468 removes residual source-anchor fields from route catalog integrity and managed audit route quality reporting:

- `sourceAnchorsMatchGroupCount`
- `sourceAnchorCount`
- `sourceAnchorsAligned`
- `SOURCE_ANCHORS_NOT_ALIGNED`

## Necessity Proof

- Blocker resolved: v467 removed the source anchor catalog, but the integrity/result shapes still exposed anchor-derived fields with constant zero/true values.
- Later consumer: v469 can add a clean typed catalog summary without carrying retired compatibility fields.
- Reuse check: the existing catalog integrity evaluator still verifies groups, routes, uniqueness, empty groups, and route-table flattening.
- Growth stop: v468 removes stale report fields and one obsolete blocker rule; it does not add routes, gates, or evidence chains.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v468 is not an upstream pre-approval blocker.

## Validation Result

- Focused catalog/route-quality/downstream package tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.
