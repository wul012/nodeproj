# Node v571 explanation: consumer readiness batch closeout file support split

v571 extracts file-reference and JSON/text helper utilities from the v491-v495 batch closeout service.

## Necessity proof

- Blocker resolved: the closeout service mixed file hashing, JSON parsing, value extraction, checks, and summary assembly.
- Later consumer: archive verification support can reuse file references and value helpers without importing the closeout loader.
- Existing report cannot be reused alone: this is support-code ownership, not a runtime report issue.
- Growth stop condition: this split moves helper utilities only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.ts`.
- Moved `BatchCloseoutFileReference`, `fileReference`, `readJsonFile`, `readTextFile`, `valueAt`, `objectField`, `stringValue`, and `numberValue`.
- Re-exported `BatchCloseoutFileReference` from the original service module to preserve type imports.

Java and mini-kv remain recommended parallel. Node v571 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArtifacts.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
