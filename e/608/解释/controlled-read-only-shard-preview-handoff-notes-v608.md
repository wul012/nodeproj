# v608 Controlled read-only shard preview handoff notes

## Purpose

v608 is feature version 11 of the requested 20-version feature run.

v605-v607 made the archive snapshot summary export compact and digestible. v608 adds read-only handoff notes so operator, Node, Java, and mini-kv audiences can understand what the summary export authorizes and what it does not authorize.

## Change

Added `preview.sourceMatrixHandoffNotes`.

The handoff notes include:

- notes and input summary export versions;
- handoff state;
- read-only handoff readiness;
- note and action-required counts;
- four audience-specific notes for operator, Node, Java, and mini-kv;
- safety flags showing no approval, routing activation, fresh sibling evidence, service start, or sibling mutation is required.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: summary exports need a human-readable handoff boundary before later digest coverage;
- later consumer: Node v609 can add digest coverage over these notes;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: keep notes as explanatory handoff material unless a future version explicitly opens an activation plan.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v608 consumes Node v607 output and requires no fresh sibling evidence. It does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 11 tests.
- Build passed.

CI note:

- v608 starts the v608-v612 local batch.
