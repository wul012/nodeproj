# v487 Java / mini-kv route catalog cleanup verification checklist evidence report roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at tag `v219-order-platform-shard-readiness-v1-contract-consumer-route-inventory`, with local v220-like consumer evidence digest changes.
- mini-kv: `D:\C\mini-kv` is at tag `第二百零一版路由目录清理后收口连续性台账`, with local v202-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v487 exposes Node v486 frozen evidence only and does not consume dirty sibling working trees.

## Scope

Node v487 exposes the v486 checklist/continuity evidence through the existing route catalog cleanup handoff audit route group:

- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence`
- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence?format=markdown`

It adds the sixth route to the existing group and updates total audit JSON/Markdown routes to 204.

## Necessity Proof

- Blocker resolved: Java v215-v217 and mini-kv v201 frozen evidence can now be inspected through normal audit JSON/Markdown routes.
- Later consumer: v488 can archive this report before Node consumes Java v219 or mini-kv v202 work.
- Reuse check: v487 reuses the existing route group, access policy, and v486 intake reader.
- Growth stop: one route is added under the existing group; no approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v487 is a Node report/route version over frozen evidence and is not a pre-approval blocker.

## Validation Plan

- Focused Vitest: route group, v486 intake, route catalog group, and registration quality tests.
- Typecheck.
- Build.
- HTTP-style Fastify inject smoke for the new JSON and Markdown route.
