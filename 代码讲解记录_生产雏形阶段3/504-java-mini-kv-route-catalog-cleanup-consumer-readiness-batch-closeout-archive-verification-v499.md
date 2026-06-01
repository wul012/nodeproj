# Node v499 code walkthrough: consumer readiness batch closeout archive verification

## Version Progress

v499 verifies the archive generated in v498. It is the verification step before v500 route exposure.

## Why This Version Exists

The v498 archive summary records hashes, but a verifier must recompute them and check the archived JSON and Markdown content. v499 does that without regenerating the archive.

## Code Flow

`loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification()` reads:

- `e/498/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-v497-http.json`;
- `e/498/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-v497-http.md`;
- `e/498/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-v498-archive-summary.json`.

It creates file references with size and SHA-256, extracts a compact source report from the archived JSON and summary, and evaluates checks.

## Checks

The checks confirm file presence, readability, digest parity, profile version, source versions, ready state, 15/15 check count, closed version count, routeCountAtCloseout=207, Markdown evidence, summary parity, and closed runtime boundary.

## Boundary Decisions

v499 does not call the v497 route again and does not read sibling projects. It verifies immutable files from `e/498/evidence`.

## What v500 Can Safely Do

v500 can register the verifier route, update route counts to 209 total and 45 Java/mini-kv routes, then smoke JSON/Markdown.
