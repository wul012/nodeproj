# v466 central route anchor extraction roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is at `64d1dfdb`, tag `v198-order-platform-shard-readiness-v196-operator-checklist-historical-snapshot-compatibility`, with local v199-like handoff manifest files and controller edits.
- mini-kv: `D:\C\mini-kv` is clean at `506ff62`, tag `第一百八十四版路由目录最终收口窗口`.
- Node dependency decision: v466 is a Node route catalog cleanup. It does not need fresh Java or mini-kv evidence.

## Scope

Node v466 moves `auditJsonMarkdownRouteGroupSourceAnchors` out of the central route table and into `auditJsonMarkdownRouteGroups.ts`. The central `auditJsonMarkdownRoutes.ts` now stays as a pure catalog flatMap consumer.

## Necessity Proof

- Blocker resolved: v459 kept compatibility anchors in the central route table to protect old source-string checks; v461-v465 removed those consumers.
- Later consumer: v467 can remove source-anchor requirements from test support and integrity summaries.
- Reuse check: route group tests and route quality still consume the same anchor array, but from the catalog file where route-group metadata belongs.
- Growth stop: v466 only relocates metadata. It does not add routes, reports, approvals, readiness gates, or runtime behavior.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v466 is not an upstream pre-approval blocker.

## Validation Result

- Focused catalog/route-quality/code-health tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.
