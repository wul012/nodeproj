# Node v553 code walkthrough: latest sibling live smoke route archive verifier route archive verification

## Why This Version Exists

v552 archived the v551 public route output. v553 turns those archive files into a typed verifier so the JSON, Markdown, and summary can be checked without calling the route again.

## Service

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.ts` reads the v552 JSON, Markdown, and summary files.

It verifies:

- archive files exist and digests match the v552 summary;
- the archived JSON profile is the v549 route-archive verifier;
- JSON and Markdown route responses were both 200;
- the archived verifier is ready with 18/18 checks passed;
- the v548 source archive counts remain exactly `226/62/28`;
- the v552 route catalog counts remain exactly `227/63/29`;
- the current route catalog still covers the archived v552 baseline;
- runtime authority remains closed.

## Renderer

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationRenderer.ts` renders source archive fields, summary, checks, archive files, and next actions.

## Test

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification.test.ts` verifies the ready profile, historical counts, digest shapes, all checks, and Markdown output.

## Boundary

v553 does not start Java, does not start mini-kv, does not run live smoke, and does not expose a route. It is a read-only verifier over the v552 archive files. The next version should either expose this verifier for route-level parity or close out the chain in a compact report.
