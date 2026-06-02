# Node v563 explanation: consumer readiness mini-kv support split

v563 starts reducing the size of `javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.ts` by extracting mini-kv release constants.

## Necessity proof

- Blocker resolved: the consumer-readiness evidence loader mixed mini-kv version metadata with parsing and check construction.
- Later consumer: future mini-kv post-closeout continuity work can import the release sequence and expected digests without touching the large loader.
- Existing report cannot be reused alone: this is source-code maintainability, not a runtime report problem.
- Growth stop condition: this split moves constants only. It adds no route, no evidence archive, and no Java/mini-kv runtime dependency.

## Change

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessMiniKvSupport.ts`.
- Moved `MINI_KV_POST_CLOSEOUT_RELEASES`, `MiniKvPostCloseoutReleaseVersion`, and `MINI_KV_EXPECTED_DIGESTS` into that support module.
- Updated the consumer-readiness loader to import those constants and keep the same output shape.

Java and mini-kv remain recommended parallel. Node v563 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
