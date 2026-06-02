# Node v572 explanation: consumer readiness batch closeout file support coverage

v572 adds direct unit coverage for the batch closeout file support helpers introduced in v571.

## Necessity proof

- Blocker resolved: file support helpers were only covered through the larger batch closeout service.
- Later consumer: future archive-verification support can reuse these helpers with focused tests protecting behavior.
- Existing report cannot be reused alone: reports prove file presence, not helper-level missing/invalid handling.
- Growth stop condition: this is test coverage only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `test/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.test.ts`.
- Covered present files, missing files, invalid JSON, nested value extraction, object coercion, string coercion, and number coercion.
- Tests create and delete their own temporary directory.

Java and mini-kv remain recommended parallel. Node v572 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
