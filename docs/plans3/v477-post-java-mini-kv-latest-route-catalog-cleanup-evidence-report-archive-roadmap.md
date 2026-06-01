# v477 Java / mini-kv latest route catalog cleanup evidence report archive roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at `9b1ac4d4`, tag `v210-order-platform-shard-readiness-v208-endpoint-catalog-historical-compatibility`, with local v211-like consumer handoff bundle changes.
- mini-kv: `D:\C\mini-kv` is at `5bd9a3c`, tag `第一百九十四版路由目录清理收口版本目录`, with local v195-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v477 archives v476 route output and does not consume dirty Java or mini-kv working trees.

## Scope

Node v477 captures the v476 latest evidence report output as durable archive evidence:

- JSON route response under `e/477/evidence/`.
- Markdown route response under `e/477/evidence/`.
- Archive summary with status, readiness, check counts, and file digests.

## Necessity Proof

- Blocker resolved: the latest evidence route now has durable JSON/Markdown archive files for replay and verification.
- Later consumer: v478 can verify the archive without starting a server or reading sibling workspaces.
- Reuse check: v477 captures existing route output and does not add another runtime profile or route.
- Growth stop: archive capture only; no approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v477 is a Node archive version over existing route output.

## Validation Result

- HTTP-style capture passed: JSON 200, Markdown 200, ready=true, 16/16 checks.
- Typecheck passed.
- Build passed.
