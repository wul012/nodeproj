# v609 Controlled read-only shard preview handoff note digest

## Purpose

v609 is feature version 12 of the requested 20-version feature run.

v608 added audience-specific handoff notes. v609 adds a digest over those notes so the handoff can be compared without parsing every note in downstream reports.

## Change

Added `handoffDigest` to `preview.sourceMatrixHandoffNotes`.

The digest records:

- algorithm: `sha256`;
- scope: `read-only-handoff-notes`;
- value;
- covered note count.

The digest material covers the notes version, input summary export version, and normalized notes.

## Growth control

This version does not add a new route, approval rule, archive verifier, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: handoff notes need a stable digest before later reports consume them;
- later consumer: Node v610 can add scope/stability coverage;
- reuse decision: the existing controlled read-only preview route remains the only surface;
- stop condition: do not add another handoff digest unless note material changes.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v609 consumes Node v608 output and requires no fresh sibling evidence. It does not block sibling progress.

## Verification

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review-artifact/catalog tests passed: 6 files, 11 tests.
- Build passed.

CI note:

- v609 remains local for the v608-v612 batch.
