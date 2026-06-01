# v462 audit route catalog test migration roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is clean at `ffb2fd7f`, tag `v196-order-platform-shard-readiness-v1-contract-operator-checklist`.
- mini-kv: `D:\C\mini-kv` is at `e0eafe4`, tag `第一百八十版历史证据格式化拆分`, with local v181-like shard-readiness source/test/evidence changes.
- Node dependency decision: v462 is a Node test migration. It does not consume fresh Java or mini-kv evidence.

## Scope

Node v462 migrates the remaining 37 route-group tests from `routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8")` to the shared catalog helper introduced in v461.

After v462, only two tests still read the central route table source:

- `test/auditJsonMarkdownRouteGroups.test.ts`, which intentionally verifies the central table source shape.
- `test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts`, which still checks both the route entry point and a legacy v226 route-table assertion.

## Necessity Proof

- Blocker resolved: v461 proved the helper shape, but most credential-resolver, Java/mini-kv, managed-audit, and sandbox route-group tests still duplicated central source reads.
- Later consumer: v463 can now update route-quality reporting against the typed catalog without being contradicted by dozens of source-string tests.
- Reuse check: the migration keeps each test's path and HTTP assertions; only the registration-table assertion moves to the helper.
- Growth stop: v462 is limited to test migration. It does not add routes, approvals, evidence chains, service starts, or runtime behavior.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v462 is not an upstream pre-approval blocker.

## Validation Result

- Migrated route-group tests plus v459/v460/v461 catalog/support tests passed: 39 files / 40 tests.
- Typecheck passed.
- Build passed.
- Defer full Vitest to v464 final validation unless focused tests expose a broader regression.
