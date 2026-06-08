# 1258. Node v1253 signed approval artifact draft text package review preflight walkthrough

## Code path

The controlled shard preview builds the chain through loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview. After v1236 text package intake is created, Node v1237-v1261 calls createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight.

## Module split

- ...TextPackageReviewPreflightTypes.ts owns public criterion, control, gate, and profile contracts.
- ...TextPackageReviewPreflightCriterionCatalog.ts derives 25 review criteria from v1236 intake fields.
- ...TextPackageReviewPreflightControlCatalog.ts derives 25 rejection controls from those criteria.
- ...TextPackageReviewPreflightBuilder.ts maps source intake fields and guards into read-only review records.
- ...TextPackageReviewPreflightValidator.ts proves source readiness, digest presence, zero review materialization, and no side effects.
- ...TextPackageReviewPreflightArtifacts.ts assembles counts, blockers, and stable digest.
- ...TextPackageReviewPreflightRenderer.ts renders archive and route Markdown.

## Safety invariants

The profile reports readyForSignedApprovalArtifactDraftTextPackageReviewPreflight=true only for review preflight readiness. It keeps readyForSignedApprovalArtifactDraft=false, readyForSignedApprovalCapture=false, readyForRuntimePayload=false, reviewedDraftTextPackageCount=0, approvedDraftTextPackageCount=0, and rejectedDraftTextPackageCount=0.

## This version slice

Node v1253 focuses on approval policy assertion: keeps policy assertion review separate from approval capture.

## Maintenance guidance

Do not add real package parsing here. The next maintainable step is a separate manual artifact submission or package comparison profile that consumes these review criteria without enabling execution.