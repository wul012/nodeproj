# 1235. Node v1230 signed approval artifact draft text package intake walkthrough

## Code path

The controlled shard preview builds the chain through loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview. After v1211 instruction preflight is created, Node v1212-v1236 calls createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake.

## Module split

- ...TextPackageIntakeTypes.ts owns public field, guard, gate, and profile contracts.
- ...TextPackageIntakeFieldCatalog.ts derives 25 intake fields from v1211 instruction slots to avoid duplicated slice drift.
- ...TextPackageIntakeGuardCatalog.ts derives 25 reject guards from those intake fields.
- ...TextPackageIntakeBuilder.ts maps source instruction slots and guards into read-only intake records.
- ...TextPackageIntakeValidator.ts proves source readiness, digest presence, zero materialization, and no side effects.
- ...TextPackageIntakeArtifacts.ts assembles counts, blockers, and stable digest.
- ...TextPackageIntakeRenderer.ts renders archive and route Markdown.

## Safety invariants

The profile reports eadyForSignedApprovalArtifactDraftTextPackageIntake=true only for the expected-field contract. It keeps eadyForSignedApprovalArtifactDraft=false, eadyForSignedApprovalCapture=false, eadyForRuntimePayload=false, ctualDraftTextPackageFieldCount=0, and cceptedDraftTextPackageCount=0.

## Maintenance guidance

Do not add real signed text parsing here. The next maintainable step is a separate offline artifact review profile that can compare a human-provided package against these expected fields without enabling execution.