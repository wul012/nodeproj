# Node v566 explanation: consumer readiness type ownership split

v566 moves consumer-readiness evidence type definitions out of the loader.

## Necessity proof

- Blocker resolved: `javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.ts` still mixed public shape definitions with path loading, parsing, checks, and summaries.
- Later consumer: archive verification and report code can import the evidence shape from a dedicated types module.
- Existing report cannot be reused alone: this is source ownership and maintainability, not a runtime evidence problem.
- Growth stop condition: this split moves types only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessTypes.ts`.
- Moved Java digest, Java guard, mini-kv release, mini-kv audit note, and full consumer-readiness evidence interfaces into that file.
- Re-exported the same public types from the loader file so existing imports remain compatible.

Java and mini-kv remain recommended parallel. Node v566 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessSupport.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
