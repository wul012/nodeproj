# v473 Java / mini-kv route catalog cleanup handoff evidence roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at `9581a898`, tag `v206-order-platform-shard-readiness-v1-contract-endpoint-pair-integrity`, with local v207-like v1 contract controller split changes.
- mini-kv: `D:\C\mini-kv` is at `2f653ed`, tag `第一百九十二版路由目录清理收口交接审计`, with local v193-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v473 consumes already tagged/frozen Java v202/v206 and mini-kv v191/v192 evidence, so Java and mini-kv do not need to wait for Node and Node must not consume their dirty working trees.

## Scope

Node v473 adds a typed evidence reader for the completed route catalog cleanup handoff signals:

- Java v202 consumer probe plan fixture.
- Java v206 v1 contract endpoint pair integrity evidence.
- mini-kv v191 route catalog cleanup closeout handoff fixture.
- mini-kv v192 handoff audit explanation note.

## Necessity Proof

- Blocker resolved: Node now has a stable evidence intake layer for the Java and mini-kv route catalog cleanup handoff without depending on live sibling workspaces.
- Later consumer: v474+ can build archive verification and route/report layers from this typed reader instead of reparsing sibling files.
- Reuse check: existing historical evidence utilities already resolve real sibling paths and frozen fallback paths; v473 reuses them and adds no new resolver chain.
- Growth stop: v473 only freezes and checks the newest sibling handoff inputs. It does not add routes, approvals, runtime execution, credentials, or service startup authority.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. Node v473 consumes frozen historical evidence and is not a pre-approval blocker for either project.

## Validation Plan

- Focused Vitest: `test/javaMiniKvRouteCatalogCleanupHandoffEvidence.test.ts`.
- Forced historical fallback: `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` inside the focused test.
- Typecheck.
- Build.
