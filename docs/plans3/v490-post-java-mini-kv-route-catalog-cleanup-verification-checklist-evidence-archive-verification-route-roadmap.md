# v490 Java / mini-kv route catalog cleanup verification checklist evidence archive verification route roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at tag `v222-order-platform-shard-readiness-v220-consumer-evidence-digest-historical-compatibility`, with local v223-like integrity changes.
- mini-kv: `D:\C\mini-kv` is at tag `第二百零一版路由目录清理后收口连续性台账`, with local v202-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v490 exposes Node v489 archive verification and closes the v481-v490 Node batch; it does not consume dirty sibling working trees.

## Scope

Node v490 exposes the v489 archive verifier through the existing route catalog cleanup handoff audit route group:

- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-archive-verification`
- `GET /api/v1/audit/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-archive-verification?format=markdown`

It adds the seventh route to the existing group and updates total audit JSON/Markdown routes to 205.

## Necessity Proof

- Blocker resolved: the v488 archive verification is now visible through the normal JSON/Markdown audit surface.
- Later consumer: the next Node batch can consume fresh Java v222+ and mini-kv v202+ only after they are frozen cleanly.
- Reuse check: v490 reuses the existing route group, access policy, and archive verifier.
- Growth stop: one route plus closeout summary; no approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v490 is a Node archive verification route and batch closeout version, not a pre-approval blocker.

## Validation Plan

- Focused Vitest: route group, archive verifier, route catalog group, and registration quality tests.
- Typecheck.
- Build.
- HTTP-style Fastify inject smoke for the new verifier JSON and Markdown route.
