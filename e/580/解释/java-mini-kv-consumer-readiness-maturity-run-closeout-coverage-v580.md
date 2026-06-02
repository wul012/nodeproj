# Node v580 explanation: consumer readiness maturity run closeout coverage

v580 closes the v566-v580 consumer-readiness maturity run with one shared version manifest and a final closeout test.

## Necessity proof

- Blocker resolved: the fifteen-version run now has a single test source of truth for version numbers and archive titles.
- Later consumer: archive review can verify the run boundary, archive labels, explanations, and walkthroughs together.
- Existing report cannot be reused alone: the v579 artifact test checks files, and the archive index test checks labels, but neither proves the exact fifteen-version run boundary.
- Growth stop condition: v580 is the closeout coverage for this run. It adds no route, no archive chain, no smoke server, and no Java/mini-kv runtime dependency.

## Change

- Added `test/support/javaMiniKvConsumerReadinessMaturityRun.ts`.
- Updated the archive index and artifact tests to consume the shared manifest.
- Added `test/javaMiniKvRouteCatalogCleanupConsumerReadinessMaturityRunCloseout.test.ts`.
- Verified the exact v566-v580 sequence, archive labels, explanation files, and walkthrough files.

Java and mini-kv remain recommended parallel. Node v580 does not require fresh sibling evidence or live sibling startup.

Validation completed:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessArchiveIndex.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessMaturityArtifacts.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessMaturityRunCloseout.test.ts`
- `npm.cmd test -- <all javaMiniKvRouteCatalogCleanupConsumerReadiness*.test.ts files>`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Local full-suite note: `npm.cmd test -- --maxWorkers=2` was attempted, but the local run timed out after five minutes without assertion output. This is treated as a test-budget limit; related chain coverage passed in the split run above.
