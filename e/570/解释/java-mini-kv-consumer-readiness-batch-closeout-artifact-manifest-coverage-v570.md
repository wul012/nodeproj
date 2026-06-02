# Node v570 explanation: consumer readiness batch closeout artifact manifest coverage

v570 adds direct coverage for the v491-v495 batch closeout artifact manifest.

## Necessity proof

- Blocker resolved: after v569, the manifest existed as a support module but only had indirect closeout coverage.
- Later consumer: future manifest edits can fail in a focused test that points directly at path metadata.
- Existing report cannot be reused alone: closeout reports prove file presence, not the exact manifest contract.
- Growth stop condition: this is test coverage only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `test/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArtifacts.test.ts`.
- Verified the manifest has 22 entries.
- Locked representative v491, v493, v494, and v495 paths, including `解释` and `代码讲解记录_生产雏形阶段3` paths.

Java and mini-kv remain recommended parallel. Node v570 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArtifacts.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
