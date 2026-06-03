# v610 Controlled read-only shard preview handoff digest stability coverage

## Purpose

v610 is feature version 13 of the requested 20-version feature run.

v609 added a digest over handoff notes. v610 adds focused stability coverage for that digest and advances the profile version chain.

## Change

Added a review artifacts test that builds handoff notes twice from the same summary export and verifies the `handoffDigest` is identical.

The profile active/source/next chain is now:

- active: `Node v610`;
- source: `Node v609`;
- next: `Node v611`.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: handoff digest stability needed direct focused coverage;
- later consumer: Node v611 can add a compact handoff notes summary;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: digest stability stays covered by the focused review artifacts test.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v610 is Node-only coverage and profile version bookkeeping. It requires no fresh sibling evidence and does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 12 tests.
- Build passed.

CI note:

- v610 remains local for the v608-v612 batch.
