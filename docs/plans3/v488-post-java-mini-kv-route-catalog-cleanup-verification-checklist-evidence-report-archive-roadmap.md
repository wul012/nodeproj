# v488 Java / mini-kv route catalog cleanup verification checklist evidence report archive roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at tag `v220-order-platform-shard-readiness-v1-contract-consumer-evidence-digest`, with local v221-like snapshot changes.
- mini-kv: `D:\C\mini-kv` is at tag `第二百零一版路由目录清理后收口连续性台账`, with local v202-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v488 archives Node v487 route output only and does not consume fresh sibling evidence.

## Scope

Node v488 captures the v487 verification checklist evidence report output as durable archive evidence:

- `e/488/evidence/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report-v487-http.json`
- `e/488/evidence/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report-v487-http.md`
- `e/488/evidence/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report-v488-archive-summary.json`

## Necessity Proof

- Blocker resolved: the v487 report can be verified later without rerunning the route or reading sibling workspaces.
- Later consumer: v489 can add archive verification over these files.
- Reuse check: v488 captures existing route output and does not add another runtime profile or route.
- Growth stop: archive only; no approval chain, runtime execution, service startup, write path, or managed-audit connection is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v488 is a Node archive version over existing route output.

## Validation Plan

- Generate archive JSON/Markdown through Fastify inject.
- Verify archive summary status codes, ready flag, 18/18 checks, and SHA-256 digests.
- Focused route test.
- Typecheck.
- Build.
