# v489 Java / mini-kv route catalog cleanup verification checklist evidence archive verification roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` is at tag `v221-order-platform-shard-readiness-v220-consumer-evidence-digest-snapshot-freeze`, with local v222-like historical compatibility changes.
- mini-kv: `D:\C\mini-kv` is at tag `第二百零一版路由目录清理后收口连续性台账`, with local v202-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v489 verifies v488 archive files only and does not consume fresh sibling evidence.

## Scope

Node v489 adds an archive verifier for the v488 verification checklist evidence report archive:

- Reads archived JSON response.
- Reads archived Markdown response.
- Reads archive summary and validates SHA-256 file digests.
- Confirms the archived report remains ready, read-only, and free of sibling service startup.

## Necessity Proof

- Blocker resolved: v488 archive files can now be checked without rerunning the route or reading sibling workspaces.
- Later consumer: v490 can expose this verifier through the existing route group and close the ten-version batch.
- Reuse check: v489 reads existing archive files and uses existing count helpers.
- Growth stop: verifier only; no new route, approval chain, runtime execution, service startup, or credential path is introduced.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v489 is a Node archive verification version and is not a pre-approval blocker.

## Validation Plan

- Focused Vitest: `test/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification.test.ts`.
- Typecheck.
- Build.
