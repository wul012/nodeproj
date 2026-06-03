# v631 Controlled read-only shard preview handoff artifact stability test split

## Purpose

v631 is maintenance version 13 of the 20-version run after v618 closeout.

After v623-v627, the handoff artifact test file contained both ready/blocked behavior-chain assertions and digest stability assertions. v631 separates stability coverage so the behavior test remains focused and easier to maintain.

## Change

Added `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifactStability.test.ts`.

The new test file owns stable digest/verification checks for:

- handoff summary digest;
- handoff receipt archive snapshot digest;
- route coverage archive verification;
- route coverage archive summary digest;
- route coverage archive summary receipt digest;
- route coverage archive summary receipt snapshot digest;
- route coverage archive summary receipt archive verification.

The existing handoff artifact test now keeps the ready and blocked artifact-chain assertions.

Line-count impact:

- handoff artifact behavior test: 800 lines down to 631 lines;
- new stability test: 204 lines.

## Growth control

This version does not add a new route, approval rule, report chain, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: behavior and stability assertions were mixed in one large test file;
- later consumer: future stability-only changes can touch the dedicated stability file;
- reuse decision: no production code or route output changes;
- stop condition: only digest/verification stability tests moved.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v631 is Node-only test refactoring. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

Ran the v631 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifactStability.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused handoff artifact tests passed: 2 files, 9 tests.
- Build passed.

CI remains batched. v631 stays in the local v628-v632 batch.
