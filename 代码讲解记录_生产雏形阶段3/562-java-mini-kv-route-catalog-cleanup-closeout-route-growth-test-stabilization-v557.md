# Node v557 code walkthrough: closeout route-growth test stabilization

## Why This Version Exists

The recent closeout services intentionally allow route catalog growth: archived baselines stay exact, while the current catalog only needs to cover them. Two tests still asserted the current catalog was exactly `227/63/29`.

v557 updates the tests to match the service contract.

## Test Changes

`javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.test.ts` now checks:

- current total routes cover the archived route catalog route count;
- current Java/mini-kv routes cover the archived Java/mini-kv route count;
- current cleanup handoff routes cover the archived cleanup handoff route count;
- summary route counts match the current route catalog values.

`javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.test.ts` now checks the source closeout counts are greater than or equal to the `227/63/29` baseline.

## Boundary

v557 changes tests only. It does not add routes, start Java, start mini-kv, or change runtime behavior.
