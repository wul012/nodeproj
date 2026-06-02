# Node v580 code walkthrough: consumer readiness maturity run closeout coverage

## Shared Manifest

`test/support/javaMiniKvConsumerReadinessMaturityRun.ts` keeps the v566-v580 version list and archive titles in one place.

## Archive Index Test

`javaMiniKvRouteCatalogCleanupConsumerReadinessArchiveIndex.test.ts` now reads from the shared manifest and checks all fifteen entries.

## Artifact Test

`javaMiniKvRouteCatalogCleanupConsumerReadinessMaturityArtifacts.test.ts` uses shared helper functions to verify explanation and walkthrough files.

## Closeout Test

`javaMiniKvRouteCatalogCleanupConsumerReadinessMaturityRunCloseout.test.ts` verifies:

- the run contains exactly fifteen versions;
- the versions are consecutive from v566 through v580;
- archive labels, explanations, and walkthroughs are aligned.

## Boundary

v580 is closeout coverage only. It does not add a route, start a service, or consume fresh Java/mini-kv evidence.
