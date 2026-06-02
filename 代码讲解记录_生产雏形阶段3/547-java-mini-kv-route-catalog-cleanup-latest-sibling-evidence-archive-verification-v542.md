# Node v542 code walkthrough: latest sibling evidence archive verification

## Why This Version Exists

v541 archived the v540 latest sibling evidence report. v542 makes that archive machine-verifiable before the verifier is published as a route.

## Service

`javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification.ts` reads the v541 JSON, Markdown, and archive summary files.

It verifies:

- archive file presence;
- JSON and Markdown readability;
- summary SHA-256 values;
- source report profile version and Node version span;
- ready state and 13/13 checks;
- Java v274 and mini-kv v247 evidence markers;
- route catalog 224/60/26;
- closed runtime boundaries.

## Renderer

`javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationRenderer.ts` renders source report metadata, route catalog, summary, checks, archive file digests, and next actions.

## Test

`javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification.test.ts` verifies the ready profile and digest shape.

## Boundary

v542 is still Node-local. It does not expose a route or start Java / mini-kv.
