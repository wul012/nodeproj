# v464 audit route catalog final closeout roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is clean at `64d1dfdb`, tag `v198-order-platform-shard-readiness-v196-operator-checklist-historical-snapshot-compatibility`.
- mini-kv: `D:\C\mini-kv` remains at `989d13d`, tag `第一百八十一版路由目录完整性窗口`, with v182-like local source/test/docs changes and `.playwright-mcp/`.
- Node dependency decision: v464 is a Node final closeout and broad validation pass. It does not consume fresh Java or mini-kv evidence.

## Scope

Node v464 finishes the route catalog batch by migrating the legacy runbook test away from `auditJsonMarkdownRoutes.ts` source reads and by fixing the v463 service-level route import cycle.

After v464, `test/auditJsonMarkdownRouteGroups.test.ts` is the only test that reads `auditJsonMarkdownRoutes.ts` directly, because it owns the central source-shape assertion.

## Necessity Proof

- Blocker resolved: v463 exposed an ESM-cycle risk when a service imported route catalog modules directly and a test imported a route group first.
- Later consumer: full validation can now cover the route catalog, route quality report, runbook route group, and downstream dry-run packages without import-order sensitivity.
- Reuse check: route quality still consumes the same `AuditJsonMarkdownRouteCatalogIntegrityResult`; tests pass the live result, while runtime routes use a current snapshot to avoid reverse service-to-route imports.
- Growth stop: v464 is a closeout/refinement/validation version. It does not add routes, approvals, evidence chains, readiness gates, receipt chains, or runtime execution behavior.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v464 is not an upstream pre-approval blocker.

## Validation Result

- Focused closeout tests passed: 7 files / 17 tests.
- Typecheck passed.
- Build passed.
- Full Vitest passed: 393 files / 1221 tests.
- `dist`, `.tmp`, and transient temp folders are cleaned before commit.
