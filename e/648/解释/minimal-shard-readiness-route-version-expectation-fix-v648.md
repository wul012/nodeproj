# v648 Minimal shard readiness route version expectation fix

## Purpose

v648 fixes the GitHub Actions failure from run `26874521807`.

The v638 profile moved the controlled read-only shard preview markers to `activeNodeVersion=Node v638` and `sourceNodeVersion=Node v637`. The focused tests were updated, but `auditMinimalShardReadinessRoutes.test.ts` still expected v627/v626 in the shared route group coverage.

## Change

Updated:

- `auditMinimalShardReadinessRoutes.test.ts`.

The test now expects:

- `activeNodeVersion: Node v638`;
- `sourceNodeVersion: Node v637`.

It also verifies the newer Markdown sections:

- `Source Matrix Consumption Plan`;
- `Next Actions`.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: CI failed on stale route test version expectations;
- later consumer: full-suite route coverage stays aligned with the current controlled read-only shard preview profile;
- reuse decision: test expectations only; production code is unchanged;
- stop condition: this fixes the failing expectation without expanding behavior.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v648 is a Node-only CI fix. It consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran the v648 focused set:

- `npm.cmd test -- test\auditMinimalShardReadinessRoutes.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Result:

- Focused route tests passed: 2 files, 2 tests.
- Typecheck passed.
- Build passed.

CI note:

- v648 is pushed immediately to clear the failed v638-v642 CI run.
