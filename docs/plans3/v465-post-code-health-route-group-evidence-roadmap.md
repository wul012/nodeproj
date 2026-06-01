# v465 code health route group evidence roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is clean at `64d1dfdb`, tag `v198-order-platform-shard-readiness-v196-operator-checklist-historical-snapshot-compatibility`.
- mini-kv: `D:\C\mini-kv` is clean at `506ff62`, tag `第一百八十四版路由目录最终收口窗口`.
- Node dependency decision: v465 is a Node-local code-health evidence refactor. It does not need fresh Java or mini-kv evidence.

## Scope

Node v465 changes `managedAuditSandboxCodeHealthPass` so v247 route registration evidence is read from the real precheck route-group file instead of depending on compatibility anchor text in the central route table.

## Necessity Proof

- Blocker resolved: the v248 code-health report still treated a central route-table source anchor as proof of registration.
- Later consumer: v466 can move or remove central route-table anchors without breaking code-health.
- Reuse check: v465 keeps the existing code-health profile fields and adds `routeGroupFile` evidence instead of adding another report chain.
- Growth stop: this is evidence-source correction only; it does not add routes, approvals, receipts, or runtime execution behavior.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v465 is not an upstream pre-approval blocker.

## Validation Result

- Focused code-health/catalog tests passed: 3 files / 6 tests.
- Typecheck passed.
- Build passed.
