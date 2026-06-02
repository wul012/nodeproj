# Node v573 explanation: consumer readiness archive verifier support reuse

v573 makes the consumer-readiness evidence archive verifier reuse the artifact manifest and file support split in v569-v571.

## Necessity proof

- Blocker resolved: the archive verifier duplicated v493 archive paths plus file/hash/JSON/value helper code.
- Later consumer: future archive verifiers can share one support path instead of copying local helpers.
- Existing report cannot be reused alone: this is implementation reuse and drift prevention, not a runtime evidence issue.
- Growth stop condition: this reuses support only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Removed duplicate v493 archive path constants from the archive verifier.
- Reused `CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS`.
- Reused `fileReference`, `readJsonFile`, `readTextFile`, `valueAt`, `objectField`, `stringValue`, and `numberValue` from the batch closeout file support module.
- Kept `ConsumerReadinessArchiveFileReference` as a type alias for compatibility.

Java and mini-kv remain recommended parallel. Node v573 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
