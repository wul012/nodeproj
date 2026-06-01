# v478 Java / mini-kv latest route catalog cleanup evidence archive verification roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at `9b1ac4d4`, tag `v210-order-platform-shard-readiness-v208-endpoint-catalog-historical-compatibility`, with local v211-like consumer handoff bundle changes.
- mini-kv: `D:\C\mini-kv` is at `5bd9a3c`, tag `第一百九十四版路由目录清理收口版本目录`, with local v195-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v478 verifies v477 archive files only and does not consume dirty sibling working trees.

## Scope

Node v478 adds an archive verifier for the v477 latest evidence report archive:

- Reads archived JSON response.
- Reads archived Markdown response.
- Reads archive summary and validates SHA-256 file digests.
- Confirms the archived report remains ready, read-only, and free of sibling service startup.

## Necessity Proof

- Blocker resolved: v477 archive files can now be checked without rerunning the route or reading sibling workspaces.
- Later consumer: v479 can expose this verifier through the existing route group.
- Reuse check: v478 reads existing archive files and uses existing count helpers.
- Growth stop: verifier only; no new route, approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v478 is a Node archive verification version and is not a pre-approval blocker.

## Validation Result

- Focused Vitest passed: 1 file / 1 test.
- Typecheck passed.
- Build passed.
