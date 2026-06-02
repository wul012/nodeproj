# Node v568 explanation: consumer readiness Java evidence parser split

v568 moves Java v220-v224 evidence parsing out of the consumer-readiness loader.

## Necessity proof

- Blocker resolved: the loader still mixed Java JSON reads and Java parser functions with mini-kv parsing and final summary assembly.
- Later consumer: Java-only evidence archive checks can consume the Java evidence parts without importing the full loader.
- Existing report cannot be reused alone: this is source ownership and parser reuse, not a runtime report problem.
- Growth stop condition: this split moves Java parsing only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessJavaEvidence.ts`.
- Moved Java digest parsing, fixture parsing, guard parsing, and Java runtime-boundary checks into that module.
- Updated the loader to call `loadJavaConsumerReadinessEvidenceParts()` and spread the result into checks and the response.

Java and mini-kv remain recommended parallel. Node v568 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessSupport.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
