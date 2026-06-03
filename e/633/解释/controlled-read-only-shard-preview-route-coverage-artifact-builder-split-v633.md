# v633 Controlled read-only shard preview route coverage artifact builder split

## Purpose

v633 is maintenance version 15 of the 20-version run after v618 closeout.

The handoff artifact builder file had already absorbed the summary handoff chain and the route coverage chain. After v623-v627 added route coverage archive layers, the file was carrying two separate responsibilities: summary handoff receipts and route coverage archive receipts.

v633 splits the route coverage artifact builders into a dedicated module while preserving the old export surface.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRouteCoverageArtifacts.ts`.

Moved into the new module:

- route markdown section coverage digest;
- route coverage verification;
- route coverage archive snapshot;
- route coverage archive verification;
- route coverage archive summary;
- route coverage archive summary receipt;
- route coverage archive summary receipt archive snapshot;
- route coverage archive summary receipt archive verification;
- route coverage blocked-reason helpers.

Kept in the original handoff artifact module:

- handoff summary builder;
- summary consumer builder;
- summary consumer export builder;
- summary consumer receipt builder;
- summary consumer receipt archive snapshot and verification;
- re-exports for the moved route coverage builders.

Line-count impact:

- original handoff artifact builder: 652 lines down to 287 lines;
- new route coverage artifact builder: 379 lines.

## Compatibility

Existing imports remain valid because the original handoff artifact module re-exports the moved route coverage builder functions.

This keeps downstream tests and review artifact assembly unchanged while making the route coverage chain independently maintainable.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: route coverage artifact builders were expanding a summary handoff builder file past a maintainable responsibility boundary;
- later consumer: v620-v627 route coverage/archive behavior can now change in one focused module;
- reuse decision: existing artifact objects, digests, and exports are preserved;
- stop condition: only module ownership changed, and no new archive/verification layer was introduced.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v633 is Node-only production refactoring. It consumes no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v633 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifactStability.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused handoff artifact tests passed: 2 files, 9 tests.
- Build passed.

CI note:

- v633 starts the next local batch after the v628-v632 CI batch.
