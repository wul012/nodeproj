# Node v564 code walkthrough: consumer readiness evidence path support split

## Path Module

`javaMiniKvRouteCatalogCleanupConsumerReadinessEvidencePaths.ts` now owns the static Java v220-v224 evidence paths and the mini-kv v210 audit note path.

## Loader Update

`javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.ts` imports those paths and still performs the same evidence file creation, snippet matching, parsing, checks, and summary construction.

## Split Boundary

Path constants are static evidence-address metadata. Parsing functions and check construction remain in the loader where they are easier to follow together.

## Boundary

v564 changes no route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
