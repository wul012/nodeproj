# Node v573 code walkthrough: consumer readiness archive verifier support reuse

## Shared Manifest

`javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.ts` now reads the v493 archive paths from `CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS`.

## Shared File Helpers

The verifier now uses the batch closeout file support module for file references, JSON/text reads, and value extraction.

## Compatibility

`ConsumerReadinessArchiveFileReference` remains exported as a type alias, so renderer and downstream type imports keep working.

## Boundary

v573 changes no route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
