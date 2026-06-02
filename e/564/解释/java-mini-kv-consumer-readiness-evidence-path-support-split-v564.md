# Node v564 explanation: consumer readiness evidence path support split

v564 continues shrinking the consumer-readiness evidence loader by extracting static evidence paths.

## Necessity proof

- Blocker resolved: the loader still owned static Java and mini-kv evidence path constants alongside parsing and readiness checks.
- Later consumer: future evidence intake or archive checks can reuse path constants without importing the loader.
- Existing report cannot be reused alone: reports describe runtime evidence state, while this change improves source ownership.
- Growth stop condition: this split moves constants only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessEvidencePaths.ts`.
- Moved Java v220-v224 evidence paths and the mini-kv v210 audit note path into the path support module.
- Updated the consumer-readiness loader to import the paths while keeping the same output shape.

Java and mini-kv remain recommended parallel. Node v564 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
