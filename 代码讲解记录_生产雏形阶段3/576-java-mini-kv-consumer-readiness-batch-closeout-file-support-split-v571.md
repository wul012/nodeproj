# Node v571 code walkthrough: consumer readiness batch closeout file support split

## File Support Module

`javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.ts` now owns file references, hashing, JSON/text reads, and simple value extraction helpers.

## Closeout Service

`javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout.ts` imports the helper functions and re-exports `BatchCloseoutFileReference` for compatibility.

## Boundary

v571 changes no route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
