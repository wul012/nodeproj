# 1316. Node v1311 signed approval artifact draft text package comparison preflight walkthrough

## Code path

The controlled shard preview builds the chain through loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview. After v1286 text package submission preflight is created, Node v1287-v1311 calls createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight.

## Module split

- ...TextPackageComparisonPreflightTypes.ts owns public lane, acceptance control, gate, and profile contracts.
- ...TextPackageComparisonPreflightLaneCatalog.ts derives 25 comparison lanes from v1286 submission slots.
- ...TextPackageComparisonPreflightAcceptanceControlCatalog.ts derives 25 acceptance controls from those lanes.
- ...TextPackageComparisonPreflightBuilder.ts maps source submission slots and comparison controls into read-only comparison records.
- ...TextPackageComparisonPreflightValidator.ts proves source readiness, digest presence, zero compared package material, and no side effects.
- ...TextPackageComparisonPreflightArtifacts.ts assembles counts, blockers, and stable digest.
- ...TextPackageComparisonPreflightRenderer.ts renders archive and route Markdown.

## Safety invariants

The profile reports readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight=true only for offline comparison preflight readiness. It keeps readyForSignedApprovalArtifactDraft=false, readyForSignedApprovalCapture=false, readyForRuntimePayload=false, submittedDraftTextPackageCount=0, comparedDraftTextPackageCount=0, acceptedDraftTextPackageCount=0, and rejectedDraftTextPackageCount=0.

## This version slice

Node v1311 focuses on the archive closeout slice: summarizes 25 ready comparison lanes, 25 acceptance controls, and the next maintainable step: submitted package comparison review.

## Maintenance guidance

Do not add real package parsing here. The next maintainable step is a separate submitted package comparison review that consumes these lanes without enabling execution or sibling writes.