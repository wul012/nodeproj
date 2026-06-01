# v461 audit route catalog test support roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is clean at `e3211bfd`, tag `v195-order-platform-shard-readiness-v193-evidence-packet-historical-snapshot-compatibility`.
- mini-kv: `D:\C\mini-kv` remains at `901e46e`, tag `第一百七十九版路由拆分窗口数字跨度审计`, with local v180-like source/test/evidence changes plus `.playwright-mcp/`.
- Node dependency decision: v461 changes Node test support only. It does not consume fresh Java or mini-kv evidence.

## Scope

Node v461 adds `test/support/auditJsonMarkdownRouteCatalogTestSupport.ts` and migrates 12 route-group tests from reading `src/routes/auditJsonMarkdownRoutes.ts` source strings to a typed catalog expectation.

The migrated batch covers foundational routes, Java/mini-kv runtime execution, minimal integration/shard readiness, sandbox handle review, managed-audit route quality, and the manual sandbox connection packet/readiness/command/precheck/adapter-client/fake-transport groups.

## Necessity Proof

- Blocker resolved: after v459/v460, too many route-group tests still asserted route registration by scanning the central source file.
- Later consumer: v462+ can migrate the remaining source-string tests and eventually retire compatibility anchors safely.
- Reuse check: the helper consumes `auditJsonMarkdownRouteGroups`, `auditJsonMarkdownRoutes`, and `auditJsonMarkdownRouteGroupSourceAnchors`; it does not duplicate route path tables.
- Growth stop: this is a test-support refactor only. It does not add approval, readiness, receipt, verification, or runtime chains.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v461 is not an upstream pre-approval blocker.

## Validation Result

- Migrated route-group tests plus v459/v460 catalog tests passed: 14 files / 15 tests.
- Typecheck passed.
- Build passed.
- Defer full Vitest to the final batch version unless focused tests expose a broader regression.
