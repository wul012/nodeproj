# Node v574 explanation: consumer readiness batch closeout archive verifier support reuse

v574 makes the batch closeout archive verifier reuse shared file support and a focused archive artifact manifest.

## Necessity proof

- Blocker resolved: the batch closeout archive verifier duplicated file/hash/JSON/value helper code.
- Later consumer: future route archive verifiers can reuse the same file support rather than copying helpers.
- Existing report cannot be reused alone: this is implementation reuse and drift prevention, not a runtime evidence issue.
- Growth stop condition: this reuses support only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationArtifacts.ts`.
- Reused `fileReference`, `readJsonFile`, `readTextFile`, `valueAt`, `objectField`, `stringValue`, and `numberValue`.
- Kept `BatchCloseoutArchiveFileReference` as a type alias for compatibility.

Java and mini-kv remain recommended parallel. Node v574 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
