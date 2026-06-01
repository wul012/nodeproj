# v483 Java / mini-kv current route catalog cleanup evidence report archive roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at tag `v215-order-platform-shard-readiness-v1-contract-consumer-verification-checklist`, with local v216-like snapshot changes.
- mini-kv: `D:\C\mini-kv` is still based on tag `第二百版路由目录清理证据批次收口审计`, with local v201-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v483 archives Node v482 route output only and does not consume the dirty Java or mini-kv working trees.

## Scope

Node v483 captures the v482 current evidence report output as durable archive evidence:

- `e/483/evidence/java-mini-kv-current-route-catalog-cleanup-evidence-report-v482-http.json`
- `e/483/evidence/java-mini-kv-current-route-catalog-cleanup-evidence-report-v482-http.md`
- `e/483/evidence/java-mini-kv-current-route-catalog-cleanup-evidence-report-v483-archive-summary.json`

## Necessity Proof

- Blocker resolved: the v482 report can be verified later without rerunning the route or reading sibling workspaces.
- Later consumer: v484 can add archive verification over these files.
- Reuse check: v483 captures existing route output and does not add another runtime profile or route.
- Growth stop: archive only; no approval chain, runtime execution, service startup, write path, or managed-audit connection is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v483 is a Node archive version over existing route output.

## Validation Plan

- Generate archive JSON/Markdown through Fastify inject.
- Verify archive summary status codes, ready flag, 18/18 checks, and SHA-256 digests.
- Focused route test.
- Typecheck.
- Build.
