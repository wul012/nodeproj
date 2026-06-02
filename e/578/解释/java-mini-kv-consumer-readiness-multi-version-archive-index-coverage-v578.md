# Node v578 explanation: consumer readiness multi-version archive index coverage

v578 adds a focused archive-index test for the v566-v578 consumer-readiness maturity run.

## Necessity proof

- Blocker resolved: the archive index was updated manually for each version without focused coverage.
- Later consumer: handoff or audit review can rely on the index listing the maturity-run versions.
- Existing report cannot be reused alone: individual version reports do not prove the aggregate archive index is complete.
- Growth stop condition: this is index coverage only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `test/javaMiniKvRouteCatalogCleanupConsumerReadinessArchiveIndex.test.ts`.
- Verified `e/README.md` contains v566-v578 entries for the current consumer-readiness maturity run.

Java and mini-kv remain recommended parallel. Node v578 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessArchiveIndex.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
