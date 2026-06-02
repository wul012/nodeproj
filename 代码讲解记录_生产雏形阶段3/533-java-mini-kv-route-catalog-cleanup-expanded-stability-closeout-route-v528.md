# Node v528 code walkthrough: expanded stability closeout route

## Why This Version Exists

v527 created the expanded stability closeout. v528 exposes it through the audit JSON/Markdown route catalog so v529 can archive a stable HTTP source.

## Route Constant

`javaMiniKvRouteCatalogCleanupExpandedStabilityCloseout.ts` exports `JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ROUTE_PATH`.

## Route Registration

`auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts` appends one route using the v527 closeout loader and renderer.

## Catalog Counts

The central route catalog summary moves from 219 to 220 total routes and from 55 to 56 Java / mini-kv routes. The cleanup handoff group test moves from 21 to 22 routes.

## Boundary

Java and mini-kv remain recommended parallel. The route reads local Node state only.
