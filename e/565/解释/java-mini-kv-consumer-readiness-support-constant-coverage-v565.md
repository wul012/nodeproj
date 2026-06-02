# Node v565 explanation: consumer readiness support constant coverage

v565 adds direct test coverage for the consumer-readiness support constants split in v563-v564.

## Necessity proof

- Blocker resolved: newly extracted support constants were only covered through the larger loader test.
- Later consumer: future path or mini-kv continuity changes can fail in a small focused test before affecting evidence loading.
- Existing report cannot be reused alone: reports verify resolved evidence, but they do not isolate static support metadata.
- Growth stop condition: this is test coverage only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `test/javaMiniKvRouteCatalogCleanupConsumerReadinessSupport.test.ts`.
- Locked the Java v220/v224 evidence paths and the mini-kv v210 `解释/说明.md` audit note path.
- Verified the mini-kv v202-v209 release sequence and digest table remain aligned.

Java and mini-kv remain recommended parallel. Node v565 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessSupport.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
