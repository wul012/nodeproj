# v623 Controlled read-only shard preview handoff route coverage archive verification

## Purpose

v623 is feature version 5 of the 20-version run after v618 closeout.

v622 archived the verified handoff route coverage. v623 verifies that archive snapshot so later versions can summarize or consume it without reopening routing, service startup, or sibling evidence questions.

## Change

Added `sourceMatrixHandoffRouteCoverageArchiveVerification` to the controlled read-only shard preview profile.

The verification records:

- input snapshot version `Node v622`;
- snapshot digest value;
- archive section count;
- preserved verification gate counts;
- blocked reason codes;
- safety boundaries.

The verification gates are:

- snapshot ready;
- snapshot digest present;
- archived sections complete;
- verification gates preserved;
- no routing activation required;
- no fresh sibling evidence required;
- read-only verification only.

The profile active/source/next chain is now:

- active: `Node v623`;
- source: `Node v622`;
- next: `Node v624`.

## Growth control

This version does not add a new route, approval rule, receipt chain, or sibling evidence requirement.

Necessity proof:

- blocker resolved: v622 snapshot needed an explicit verification gate before summary/export versions consume it;
- later consumer: Node v624 can summarize the verified archive state;
- reuse decision: the existing controlled read-only preview JSON/Markdown route remains the only surface;
- stop condition: archive verification only checks the fixed v622 snapshot fields and does not expand the route coverage section list.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v623 is Node-only archive verification. It requires no fresh sibling evidence, starts no sibling services, and does not block Java or mini-kv progress.

## Verification

Ran the v623 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewHandoffArtifacts.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route/review/handoff-artifact tests passed: 4 files, 13 tests.
- Build passed.

CI remains batched. v623 starts the next local batch after v618-v622.
