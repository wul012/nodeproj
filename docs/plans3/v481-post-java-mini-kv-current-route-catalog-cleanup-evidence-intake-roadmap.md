# v481 Java / mini-kv current route catalog cleanup evidence intake roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at `4111cee4`, tag `v214-order-platform-shard-readiness-v1-contract-consumer-handoff-bundle-integrity`, clean and pushed.
- mini-kv: `D:\C\mini-kv` is at `bc0258e`, tag `第二百版路由目录清理证据批次收口审计`, clean and pushed.
- Node dependency decision: recommended parallel. v481 consumes frozen Java v211/v214 and mini-kv v199/v200 evidence only; Java and mini-kv can continue their own next versions without waiting for Node approval.

## Scope

Node v481 adds a typed current-evidence intake over:

- Java v211 consumer handoff bundle evidence.
- Java v211 consumer handoff bundle static fixture.
- Java v214 consumer handoff bundle integrity evidence.
- mini-kv v199 versioned route catalog cleanup evidence batch closeout fixture.
- mini-kv v200 rolling fixture frozen under a Node historical alias plus its v200 command archive note.

## Necessity Proof

- Blocker resolved: Node can now consume the latest clean Java handoff bundle integrity and mini-kv closeout audit without reading dirty or rolling sibling workspaces directly.
- Later consumer: v482+ can expose this intake through a report route, then archive and verify it.
- Reuse check: v481 reuses the historical evidence resolver and focused intake pattern from v473/v475.
- Growth stop: this version is evidence intake only; it adds no approval chain, runtime execution, service startup, write path, or managed-audit connection.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. Node v481 freezes already-completed evidence and is not a pre-approval blocker for Java v215+ or mini-kv v201+.

## Validation Plan

- Focused Vitest: `test/javaMiniKvRouteCatalogCleanupCurrentEvidence.test.ts`.
- Forced historical fallback: `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` inside the focused test.
- Typecheck.
- Build.
