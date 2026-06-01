# v484 Java / mini-kv current route catalog cleanup evidence archive verification roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at tag `v216-order-platform-shard-readiness-v215-consumer-verification-checklist-snapshot-freeze`, with local v217-like historical compatibility changes.
- mini-kv: `D:\C\mini-kv` is at tag `第二百零一版路由目录清理后收口连续性台账`, clean and pushed.
- Node dependency decision: recommended parallel. v484 verifies v483 archive files only and does not consume Java v216/v217 or mini-kv v201 as fresh evidence.

## Scope

Node v484 adds an archive verifier for the v483 current evidence report archive:

- Reads archived JSON response.
- Reads archived Markdown response.
- Reads archive summary and validates SHA-256 file digests.
- Confirms the archived report remains ready, read-only, and free of sibling service startup.

## Necessity Proof

- Blocker resolved: v483 archive files can now be checked without rerunning the route or reading sibling workspaces.
- Later consumer: v485 can expose this verifier through the existing route group.
- Reuse check: v484 reads existing archive files and uses existing count helpers.
- Growth stop: verifier only; no new route, approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v484 is a Node archive verification version and is not a pre-approval blocker.

## Validation Plan

- Focused Vitest: `test/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification.test.ts`.
- Typecheck.
- Build.
