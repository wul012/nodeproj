# Node v569 explanation: consumer readiness batch closeout artifact manifest split

v569 extracts the v491-v495 batch closeout artifact manifest from the closeout service.

## Necessity proof

- Blocker resolved: the batch closeout service mixed a large static artifact manifest with archive reading, source verification, checks, and summaries.
- Later consumer: archive verifiers or index checks can import the manifest without importing the service loader.
- Existing report cannot be reused alone: this is source ownership for static artifact metadata.
- Growth stop condition: this split moves the manifest only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArtifacts.ts`.
- Moved the v491-v495 required artifact map into that module.
- Updated the closeout service to import the manifest as `REQUIRED_ARTIFACTS` so the rest of the service behavior stays unchanged.

Java and mini-kv remain recommended parallel. Node v569 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
