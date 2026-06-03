# Node v638 code walkthrough: controlled read-only shard preview source matrix consumption plan

## Goal

v638 adds a compact read-only source matrix consumption plan to the controlled shard preview profile.

## Implementation

`createSourceMatrixConsumptionPlan(...)` lives in `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSourceMatrixFlowArtifacts.ts`.

It consumes:

- `sourceMatrixConsumer`;
- `sourceMatrixDriftSummary`.

It emits:

- plan state;
- observed/missing sources;
- routing modes;
- drift and blocking counts;
- digest-covered plan steps;
- read-only safety boundaries.

## Profile

`loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview(...)` now builds the plan after the drift summary and stores it as `profile.preview.sourceMatrixConsumptionPlan`.

The active/source/next markers now move to Node v638/v637/v639.

## Markdown

`renderControlledReadOnlyShardPreviewSourceMatrixSections(...)` now renders a `Source Matrix Consumption Plan` section before the review checklist.

## Behavior

The plan does not authorize routing, service startup, sibling mutation, approval, or fresh sibling evidence. It is a consumption guide for existing read-only preview data.

## Cross-project status

Java and mini-kv can continue in parallel. v638 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused source matrix / route / barrel tests passed: 3 files, 8 tests.
- Build passed.
