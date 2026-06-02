# Node v566 code walkthrough: consumer readiness type ownership split

## Types Module

`javaMiniKvRouteCatalogCleanupConsumerReadinessTypes.ts` now owns the public evidence-shape interfaces for Java digest evidence, Java readiness guards, mini-kv post-closeout releases, mini-kv audit-note evidence, and the full consumer-readiness evidence object.

## Loader Compatibility

`javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.ts` imports those types for implementation and re-exports them, preserving existing type imports from the loader module.

## Maintenance Result

The loader file now focuses more on evidence file creation, parsing, check construction, and summary assembly. Static paths, mini-kv metadata, and public types live in smaller support modules.

## Boundary

v566 changes no route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
