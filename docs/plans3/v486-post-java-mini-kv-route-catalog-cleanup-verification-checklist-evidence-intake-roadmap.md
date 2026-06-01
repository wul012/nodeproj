# v486 Java / mini-kv route catalog cleanup verification checklist evidence intake roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj\advanced-order-platform` has completed tags through `v217-order-platform-shard-readiness-v215-consumer-verification-checklist-historical-compatibility`, with local v218-like integrity changes.
- mini-kv: `D:\C\mini-kv` has completed tag `第二百零一版路由目录清理后收口连续性台账`, with local v202-like source/test/fixture changes.
- Node dependency decision: recommended parallel. v486 consumes frozen Java v215/v216/v217 and mini-kv v201 tagged evidence only; dirty v218-like and v202-like work stay out of Node.

## Scope

Node v486 adds a typed verification-checklist intake over:

- Java v215 consumer verification checklist evidence.
- Java v215 consumer verification checklist static fixture.
- Java v216 checklist snapshot freeze evidence.
- Java v217 checklist historical compatibility evidence.
- mini-kv v201 post-closeout continuity fixture and command archive note.

## Necessity Proof

- Blocker resolved: Node now has a frozen reader for the next completed sibling checklist/continuity evidence chain.
- Later consumer: v487+ can expose and archive these inputs without reading sibling dirty working trees.
- Reuse check: v486 reuses the historical evidence resolver and focused intake pattern from v481.
- Growth stop: this version is evidence intake only; it adds no approval chain, runtime execution, service startup, write path, or managed-audit connection.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. Node v486 is not a pre-approval blocker for Java v218+ or mini-kv v202+.

## Validation Plan

- Focused Vitest: `test/javaMiniKvRouteCatalogCleanupVerificationChecklistEvidence.test.ts`.
- Forced historical fallback inside the focused test.
- Typecheck.
- Build.
