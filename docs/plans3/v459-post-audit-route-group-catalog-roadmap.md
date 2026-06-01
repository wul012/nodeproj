# v459 audit route group catalog roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is clean at `afb0a9e9`, tag `v192-order-platform-shard-readiness-v190-handoff-historical-snapshot-compatibility`. Java has advanced past the v187 in-progress state and can continue independently.
- mini-kv: `D:\C\mini-kv` is clean at `58d2aa2`, tag `第一百七十八版路由拆分窗口审计硬化`. mini-kv has advanced past the v176 route-window catch-up and can continue independently.
- Node dependency decision: v459 is a Node route-table catalog refactor only. It does not need fresh Java or mini-kv evidence and is not a pre-approval blocker for either project.

## Scope

Node v459 introduces `src/routes/auditJsonMarkdownRouteGroups.ts` as the explicit catalog of audit JSON/Markdown route groups. The central `src/routes/auditJsonMarkdownRoutes.ts` becomes a thin flatMap over that catalog.

The catalog records each group id, domain, and route array. This makes the route table inspectable without mixing import sprawl, route ordering, and flattening logic in one file.

## Necessity Proof

- Blocker resolved: after v458, `auditJsonMarkdownRoutes.ts` was still a long import-and-spread list with no route group metadata.
- Later consumer: v460+ can build catalog integrity checks, route indexes, and test helpers from one typed source of truth.
- Reuse check: existing `auditJsonMarkdownRoute(...)`, `AuditJsonMarkdownRouteRegistration`, and all route group files remain unchanged.
- Growth stop: v459 stops at catalog metadata and compatibility anchors for historical source checks. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v459 is a Node local catalog refactor and is not an upstream pre-approval blocker.

## Validation Result

- Focused catalog regression test passed: 1 file / 1 test.
- Catalog/code-health/precheck compatibility tests passed: 3 files / 5 tests.
- Typecheck passed.
- Build passed.
- Full Vitest passed: 392 files / 1218 tests.
- Browser screenshot is not required because v459 does not add or change a renderable UI page.
