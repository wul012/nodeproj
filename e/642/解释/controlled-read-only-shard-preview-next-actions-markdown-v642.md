# v642 Controlled read-only shard preview next actions Markdown

## Purpose

v642 renders plan-backed `nextActions` in the controlled read-only shard preview Markdown output.

v641 made JSON `nextActions` derive from the source matrix consumption plan. v642 exposes the same guidance in the route Markdown output used by smoke checks and human review.

## Change

Updated:

- `renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(...)`;
- route test Markdown assertions.

Markdown now includes:

- `## Next Actions`;
- the plan-backed consume action;
- the digest-covered plan step text, including `observeSources=java|miniKv`.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: Markdown consumers could not see the v641 plan-backed next actions;
- later consumer: HTTP smoke and manual review can inspect the same plan-derived next steps as JSON clients;
- reuse decision: it renders the existing `nextActions` field;
- stop condition: only Markdown output changed, with no new artifact or route.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v642 consumes only Node's derived read-only consumption plan. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v642 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused route test passed: 1 file, 1 test.
- Build passed.

CI note:

- v642 closes the local v638-v642 batch for push/CI verification.
