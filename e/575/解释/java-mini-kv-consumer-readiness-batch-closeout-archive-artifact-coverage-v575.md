# Node v575 explanation: consumer readiness batch closeout archive artifact coverage

v575 adds direct coverage for the v498 batch closeout archive artifact manifest introduced in v574.

## Necessity proof

- Blocker resolved: the v498 archive artifact manifest had only indirect verifier coverage.
- Later consumer: future archive route changes can fail in a small path-focused test before the larger verifier test.
- Existing report cannot be reused alone: the report proves resolved files, not the exact manifest contract.
- Growth stop condition: this is test coverage only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `test/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationArtifacts.test.ts`.
- Locked the v498 archived JSON, Markdown, and summary paths.

Java and mini-kv remain recommended parallel. Node v575 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationArtifacts.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
