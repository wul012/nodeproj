# Node v563 code walkthrough: consumer readiness mini-kv support split

## Support Module

`javaMiniKvRouteCatalogCleanupConsumerReadinessMiniKvSupport.ts` now owns the mini-kv post-closeout release sequence, version union, and expected digest table for v202-v209.

## Loader Update

`javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.ts` imports the support constants and still builds the same file map, release evidence array, checks, and summary.

## Why This Split

The consumer-readiness evidence loader remains the owner of parsing and readiness checks. The support module only holds static mini-kv metadata so future continuity updates do not have to edit the large loader just to adjust release metadata.

## Boundary

v563 changes no runtime route, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
