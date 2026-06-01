# v479 Java / mini-kv latest route catalog cleanup evidence archive verification route roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at `d57ad648`, tag `v211-order-platform-shard-readiness-v1-contract-consumer-handoff-bundle`, with local v212-like bundle snapshot changes.
- mini-kv: `D:\C\mini-kv` is at `adb646e`, tag `第一百九十五版路由目录清理收口版本目录审计`, with local v196-like source/fixture changes.
- Node dependency decision: recommended parallel. v479 exposes Node v478 archive verification only and does not consume dirty sibling working trees.

## Scope

Node v479 exposes the v478 archive verifier through the existing route catalog cleanup handoff audit route group:

- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-evidence-archive-verification`
- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-evidence-archive-verification?format=markdown`

It adds the third route to the existing group and updates total audit JSON/Markdown routes to 201.

## Necessity Proof

- Blocker resolved: the v477 archive verification is now visible through the normal JSON/Markdown audit surface.
- Later consumer: v480 can close out the eight-version batch with validation and clear next steps.
- Reuse check: v479 reuses the existing route group, access policy, and archive verifier.
- Growth stop: one route is added under the existing group; no approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v479 is a Node archive verification route version and is not a pre-approval blocker.

## Validation Result

- Focused Vitest passed: 5 files / 11 tests.
- Typecheck passed.
- Build passed.
- HTTP-style smoke passed through Fastify inject: handoff JSON 200, latest JSON 200, verifier JSON 200, verifier Markdown 200, verifier ready=true, 16/16 checks.
