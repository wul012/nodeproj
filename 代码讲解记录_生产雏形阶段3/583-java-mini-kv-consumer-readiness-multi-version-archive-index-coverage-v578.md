# Node v578 code walkthrough: consumer readiness multi-version archive index coverage

## Archive Index Test

`javaMiniKvRouteCatalogCleanupConsumerReadinessArchiveIndex.test.ts` reads `e/README.md` and verifies the v566-v578 entries for this maturity run.

## Purpose

This protects the archive index from missing a version entry while the code and explanation artifacts are being added quickly.

## Boundary

v578 is index coverage only. It changes no route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
