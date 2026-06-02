# Node v556 explanation: sibling workspace availability closeout

v556 records the current Java / mini-kv workspace boundary for Node.

The active workspace contains `orderops-node` only. The Node repo still has committed historical sibling fixtures under:

- `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform`
- `fixtures/historical/sibling-workspaces/mini-kv`

So Node should use historical fixtures by default and should not require live Java or mini-kv startup unless explicit local sibling repositories are provided for a live smoke.

The closeout confirms:

- v554 chain closeout is ready;
- both historical fixture roots are present;
- live sibling startup is not a default prerequisite;
- Java and mini-kv remain recommended parallel;
- Node is not waiting for fresh sibling evidence.

Validation completed:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.test.ts test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Next step: continue Node maturity work from historical evidence, or run a live sibling smoke only after real sibling repositories are available.
