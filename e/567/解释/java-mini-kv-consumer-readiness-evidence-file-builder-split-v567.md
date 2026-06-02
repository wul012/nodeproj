# Node v567 explanation: consumer readiness evidence file builder split

v567 extracts consumer-readiness evidence file and audit-note snippet construction from the loader.

## Necessity proof

- Blocker resolved: the loader still carried repetitive `evidenceFile(...)` and `snippet(...)` construction.
- Later consumer: path/file construction can be tested or reused independently from parsing and readiness checks.
- Existing report cannot be reused alone: this is source-code structure, not runtime evidence state.
- Growth stop condition: this split moves builders only. It adds no route, no archive chain, and no Java/mini-kv runtime dependency.

## Change

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessFileBuilders.ts`.
- Moved Java evidence file construction, mini-kv v202-v209 continuity file construction, and mini-kv v210 audit-note snippet construction into the builder module.
- Updated the loader to call `createConsumerReadinessEvidenceFiles()` and `createMiniKvLatestAuditNoteSnippets()`.

Java and mini-kv remain recommended parallel. Node v567 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.test.ts test\javaMiniKvRouteCatalogCleanupConsumerReadinessSupport.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
