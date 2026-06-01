# v485 Java / mini-kv current route catalog cleanup evidence archive verification route roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at tag `v217-order-platform-shard-readiness-v215-consumer-verification-checklist-historical-compatibility`, with local v218-like integrity changes.
- mini-kv: `D:\C\mini-kv` is at tag `第二百零一版路由目录清理后收口连续性台账`, with local v202-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v485 exposes Node v484 archive verification only and does not consume dirty sibling working trees.

## Scope

Node v485 exposes the v484 archive verifier through the existing route catalog cleanup handoff audit route group:

- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-current-evidence-archive-verification`
- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-current-evidence-archive-verification?format=markdown`

It adds the fifth route to the existing group and updates total audit JSON/Markdown routes to 203.

## Necessity Proof

- Blocker resolved: the v483 archive verification is now visible through the normal JSON/Markdown audit surface.
- Later consumer: v486 can start a fresh frozen intake from completed Java/mini-kv tags.
- Reuse check: v485 reuses the existing route group, access policy, and archive verifier.
- Growth stop: one route is added under the existing group; no approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v485 is a Node archive verification route version and is not a pre-approval blocker.

## Validation Plan

- Focused Vitest: route group, archive verifier, route catalog group, and registration quality tests.
- Typecheck.
- Build.
- HTTP-style Fastify inject smoke for the new verifier JSON and Markdown route.
