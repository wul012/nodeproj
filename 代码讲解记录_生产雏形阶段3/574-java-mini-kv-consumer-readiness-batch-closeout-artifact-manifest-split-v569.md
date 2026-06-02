# Node v569 code walkthrough: consumer readiness batch closeout artifact manifest split

## Manifest Module

`javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArtifacts.ts` now owns the v491-v495 required artifact map.

## Closeout Service

`javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout.ts` imports the manifest as `REQUIRED_ARTIFACTS` and continues to build file references, source archive evidence, checks, and summaries the same way.

## Boundary

v569 changes no route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
