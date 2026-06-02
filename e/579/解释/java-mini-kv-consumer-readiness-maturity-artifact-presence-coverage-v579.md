# Node v579 explanation: consumer readiness maturity artifact presence coverage

v579 adds artifact-presence coverage for the v566-v579 consumer-readiness maturity run.

## Necessity proof

- Blocker resolved: rapid multi-version work can update code and tests while accidentally missing explanation or walkthrough artifacts.
- Later consumer: archive review can rely on every version in this run having both explanation and code walkthrough material.
- Existing report cannot be reused alone: the archive index proves labels, not per-version artifact presence.
- Growth stop condition: this is artifact coverage only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `test/javaMiniKvRouteCatalogCleanupConsumerReadinessMaturityArtifacts.test.ts`.
- Extended the archive index test to include v579.
- Verified each v566-v579 version has an `e/<version>/解释/*-v<version>.md` file and a walkthrough file ending `-v<version>.md`.

Java and mini-kv remain recommended parallel. Node v579 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessArchiveIndex.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessMaturityArtifacts.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
