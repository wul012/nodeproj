# Node v546 code walkthrough: latest sibling live smoke archive verification

## Why This Version Exists

v545 proved the three-project local smoke in real runtime conditions. v546 turns that raw archive into a typed verifier so later versions can consume one stable profile instead of manually trusting loose JSON/Markdown files.

## Service

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification.ts` loads the v545 JSON, Markdown, compact summary, and cleanup proof. It builds:

- archive file references with size and SHA-256;
- source live-smoke metadata;
- record counts and command summaries;
- cleanup proof summaries;
- 24 checks covering readiness, target composition, proxy bypass, cleanup, and production boundaries.

The verifier itself is marked `archiveVerificationOnly=true`, `startsJavaService=false`, and `startsMiniKvService=false`. That distinction matters because the source v545 smoke did start sibling services, but v546 only reads files.

## Support Split

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationSupport.ts` contains reusable archive helpers:

- file reference and SHA-256 calculation;
- BOM-tolerant JSON reading;
- text reading;
- record lookup/count helpers;
- small value coercion helpers.

This keeps the main service focused on business checks instead of filesystem parsing.

## Renderer

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRenderer.ts` renders source smoke fields, record summary, cleanup proof, checks, archive files, and next actions as Markdown.

## Test

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification.test.ts` verifies:

- active/source versions are v546/v545;
- v545 source smoke is ready;
- 9 records are present and read-only;
- Node, Java, and mini-kv record counts match the v544 preflight;
- mini-kv commands are exactly `HEALTH`, `COMMANDSJSON`, `SHARDJSON`, and `QUIT`;
- cleanup proof has four started PIDs, zero before/after listeners, and `distRemoved=true`;
- all verifier checks are true;
- renderer includes the important proxy and cleanup checks.

## Boundary

v546 does not approve production operations, does not read secrets, does not start sibling services, and does not expose a route. v547 can expose this verified profile through the existing cleanup route group.
