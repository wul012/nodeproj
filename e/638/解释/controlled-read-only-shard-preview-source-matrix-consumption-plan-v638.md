# v638 Controlled read-only shard preview source matrix consumption plan

## Purpose

v638 is version 20 of the controlled read-only shard preview maintenance/function run after v618 closeout.

The profile already exposed source matrix consumer gates and drift findings, but downstream consumers still had to infer the safe next step from several separate objects. v638 adds a compact read-only consumption plan that summarizes how Node may consume the matrix without activating routing or asking Java/mini-kv for fresh evidence.

## Change

Added:

- `sourceMatrixConsumptionPlan` under `profile.preview`;
- `createSourceMatrixConsumptionPlan(...)` in the source matrix flow artifact module;
- Markdown rendering for the new consumption plan section;
- route and barrel contract coverage for the new public builder.

The plan records:

- input consumer and drift summary versions;
- ready/blocked plan state;
- observed and missing sources;
- routing modes;
- blocked reason codes;
- drift and blocking finding counts;
- digest-covered plan steps;
- safety boundaries showing no approval, routing activation, fresh sibling evidence, service start, or mutation.

## Behavior

Ready preview output now includes:

- `planState=ready-for-read-only-consumption-plan`;
- `reviewMode=read-only-drift-review`;
- plan steps for observed sources, routing mode comparison, drift review, and disabled routing activation.

Blocked preview output now includes:

- `planState=blocked`;
- blocked reason codes from the source matrix consumer;
- blocking finding count from the drift summary;
- the same disabled routing boundary.

## Growth control

This version does not add a new route, approval rule, sibling evidence requirement, or service startup path.

Necessity proof:

- blocker resolved: downstream Node code had no compact consumption object for safe read-only source matrix use;
- later consumer: v639+ can consume one plan object instead of re-deriving safety state from consumer/checklist/archive layers;
- reuse decision: it uses existing consumer and drift summary artifacts rather than adding another approval or archive chain;
- stop condition: the plan is a consumption summary only, not a receipt/verification cascade.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v638 consumes only the current local read-only source matrix output. It requires no fresh sibling evidence, starts no sibling services, and does not block sibling progress.

## Verification

Ran the v638 focused set:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts`
- `npm.cmd run build`

Result:

- Typecheck passed.
- Focused source matrix / route / barrel tests passed: 3 files, 8 tests.
- Build passed.

CI note:

- v638 starts the next local batch after the pushed v633-v637 CI batch.
