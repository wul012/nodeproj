# 1275. Node v1270 signed approval artifact draft text package submission preflight walkthrough

## Code path

The controlled shard preview builds the chain through loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview. After v1261 text package review preflight is created, Node v1262-v1286 calls createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight.

## Module split

- ...TextPackageSubmissionPreflightTypes.ts owns public slot, comparison control, gate, and profile contracts.
- ...TextPackageSubmissionPreflightSlotCatalog.ts derives 25 submission slots from v1261 review criteria.
- ...TextPackageSubmissionPreflightComparisonControlCatalog.ts derives 25 comparison controls from those slots.
- ...TextPackageSubmissionPreflightBuilder.ts maps source review criteria and controls into read-only submission records.
- ...TextPackageSubmissionPreflightValidator.ts proves source readiness, digest presence, zero submitted package material, and no side effects.
- ...TextPackageSubmissionPreflightArtifacts.ts assembles counts, blockers, and stable digest.
- ...TextPackageSubmissionPreflightRenderer.ts renders archive and route Markdown.

## Safety invariants

The profile reports readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight=true only for manual submission preflight readiness. It keeps readyForSignedApprovalArtifactDraft=false, readyForSignedApprovalCapture=false, readyForRuntimePayload=false, submittedDraftTextPackageCount=0, comparedDraftTextPackageCount=0, acceptedDraftTextPackageCount=0, and rejectedDraftTextPackageCount=0.

## This version slice

Node v1270 focuses on the signature slice: prepares detached signature envelope evidence as a submission slot without parsing or validating a real signature payload.

## Maintenance guidance

Do not add real package parsing here. The next maintainable step is a separate offline package comparison profile that consumes these submission slots without enabling execution or sibling writes.