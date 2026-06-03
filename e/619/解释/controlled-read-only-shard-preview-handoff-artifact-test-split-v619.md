# v619 Controlled read-only shard preview handoff artifact test split

## Purpose

v619 is feature version 1 of the new 20-version run after v618 closeout.

v618 split handoff artifact builders into their own module. v619 follows through by splitting the corresponding tests so base source-matrix review behavior and handoff artifact behavior are no longer mixed in one 768-line test file.

## Change

Added:

- `test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts`;
- `test/support/controlledReadOnlyShardPreviewReviewArtifactFixtures.ts`.

Reworked:

- `test/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts` now covers only the base chain through handoff notes.

The profile active/source/next chain is now:

- active: `Node v619`;
- source: `Node v618`;
- next: `Node v620`.

## Maintainability result

- Review artifact test: 768 lines down to 239 lines.
- New handoff artifact test: 296 lines.
- Shared fixtures: 105 lines.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: the review artifact test was too broad and made handoff regressions harder to isolate;
- later consumer: Node v620 can add route-level handoff digest coverage with dedicated handoff tests already isolated;
- reuse decision: shared source matrices moved to a support fixture instead of duplicating large test data;
- stop condition: tests are split by base review chain vs. handoff artifact chain.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v619 is Node-only maintainability work. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 12 tests.
- Build passed.

CI note:

- v619 remains local for the v619-v623 batch.
