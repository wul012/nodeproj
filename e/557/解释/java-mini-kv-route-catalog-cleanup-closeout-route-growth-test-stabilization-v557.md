# Node v557 explanation: closeout route-growth test stabilization

v557 stabilizes the latest Java / mini-kv closeout tests for future route growth.

The v554 and v556 services already treat the current route catalog as a moving value that only needs to cover the archived baseline. Their tests still pinned the current route catalog to `227/63/29`. That would fail again if a later version legitimately exposes a new audit route.

## Change

- `javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.test.ts` now asserts current route counts cover the archived v552 baseline and that summary counts match the current catalog.
- `javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.test.ts` now asserts the source closeout route counts are at least the `227/63/29` baseline rather than exactly equal to it.

No production behavior changed.

Java and mini-kv are recommended parallel. Node does not need fresh sibling evidence and does not start sibling services.

Validation completed:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.test.ts test\javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Next step: if a public route is later justified, route-count tests are less likely to fail for the wrong reason.
