import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessTypes.js";

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGates(
  readiness:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
  slots:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot[],
  guards:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuard[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGates {
  const digestSlots = slots.filter((slot) => slot.slotMode === "digest-review-package-entry");

  return {
    sourceArtifactDraftReadinessReady: readiness.readyForSignedApprovalArtifactDraftReadiness,
    packageSlotCountComplete:
      slots.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_VERSIONS.length,
    packageGuardCountComplete:
      guards.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_VERSIONS.length,
    slotVersionsSequential: slots.every((slot, index) =>
      slot.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_VERSIONS[index]),
    guardVersionsSequential: guards.every((guard, index) =>
      guard.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_VERSIONS[index]),
    sourceReadinessLanesReady: slots.every((slot) => slot.sourceReadinessLaneReady),
    sourceReadinessControlsReady: slots.every((slot) => slot.sourceReadinessControlReady),
    allSlotsReady: slots.every((slot) => slot.readyForManualSignedApprovalDraftReviewPackageSlot),
    allGuardsReady: guards.every((guard) => guard.readyForManualSignedApprovalDraftReviewPackageGuard),
    allSlotPurposesDeclared: slots.every((slot) => slot.reviewPackagePurpose.length > 0),
    allGuardTextsDeclared: guards.every((guard) => guard.guardText.length > 0),
    allReadinessLaneModesCovered: slots.every((slot) => slot.requiredReadinessLaneModeCovered),
    allSourceReadinessLanesReadOnly: slots.every((slot) => slot.sourceReadinessLaneReadOnly),
    allSourceReadinessControlsReadOnly: slots.every((slot) => slot.sourceReadinessControlReadOnly),
    allSlotsReadOnly: slots.every((slot) => slot.readOnly),
    allGuardsReadOnly: guards.every((guard) => guard.readOnly),
    allGuardsRejectMissingPackageSlots:
      guards.every((guard) => guard.rejectsMissingReviewPackageSlot),
    allGuardsBlockPackageMaterialization:
      guards.every((guard) => guard.blocksPackageMaterialization),
    allGuardsBlockSignedDraftText:
      guards.every((guard) => guard.blocksSignedDraftText),
    allGuardsBlockSignaturePayload:
      guards.every((guard) => guard.blocksSignaturePayload),
    allGuardsBlockApprovalGrant:
      guards.every((guard) => guard.blocksApprovalGrant),
    allGuardsBlockRuntimePayload:
      guards.every((guard) => guard.blocksRuntimePayload),
    allGuardsBlockWrites:
      guards.every((guard) => guard.blocksWrites),
    allGuardsBlockSiblingMutation:
      guards.every((guard) => guard.blocksSiblingMutation),
    sourceReadinessDigestPresent:
      DIGEST_PATTERN.test(readiness.signedApprovalCaptureArtifactDraftReadinessDigest),
    sourceDraftPreflightDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest),
    sourceArtifactPreflightDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalCaptureArtifactPreflightDigest),
    sourceCapturePreflightDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent: DIGEST_PATTERN.test(readiness.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent: DIGEST_PATTERN.test(readiness.sourceApprovalPacketReviewDigest),
    digestPackageSlotsReady:
      digestSlots.length === 5
      && digestSlots.every((slot) => slot.readyForManualSignedApprovalDraftReviewPackageSlot),
    sourceReadinessStillReadOnly:
      !readiness.executionAllowed
      && !readiness.writeRoutingAllowed
      && !readiness.startsServices
      && !readiness.mutatesSiblingState
      && !readiness.importsRuntimePayload,
    sourceStillNoDraftMaterialization:
      !readiness.draftArtifactCreated
      && readiness.draftArtifactMaterializedCount === 0
      && readiness.manualDraftMaterializedCount === 0,
    sourceStillNoSignaturePayload:
      readiness.draftSignaturePayloadCount === 0 && !readiness.containsSecretValue,
    sourceStillNoApprovalGrant: !readiness.approvalGrantPresent,
    sourceStillNoSignedApproval: !readiness.signedApprovalPresent,
    reviewPackageAllowedButNotMaterialized:
      readiness.readyForSignedApprovalArtifactDraftReadiness
      && slots.every((slot) => slot.readyForManualSignedApprovalDraftReviewPackageSlot)
      && slots.every((slot) => !slot.packageSlotMaterialized && !slot.packageArtifactCreated),
    signedApprovalDraftStillDisabled:
      !readiness.readyForSignedApprovalArtifactDraft
      && slots.every((slot) => !slot.readyForSignedApprovalArtifactDraft)
      && guards.every((guard) => !guard.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !readiness.readyForSignedApprovalCapture
      && slots.every((slot) => !slot.readyForSignedApprovalCapture)
      && guards.every((guard) => !guard.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !readiness.readyForOperatorValueSupply
      && slots.every((slot) => !slot.readyForOperatorValueSupply)
      && guards.every((guard) => !guard.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !readiness.readyForEvidenceImport
      && slots.every((slot) => !slot.readyForEvidenceImport)
      && guards.every((guard) => !guard.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !readiness.readyForRuntimePayload
      && slots.every((slot) => !slot.readyForRuntimePayload)
      && guards.every((guard) => !guard.readyForRuntimePayload),
    liveExecutionStillBlocked: !readiness.readyForLiveExecution,
    productionExecutionStillBlocked: !readiness.readyForProductionExecution,
    noSideEffectsAllowed:
      !readiness.writeRoutingAllowed
      && !readiness.startsServices
      && !readiness.mutatesSiblingState
      && slots.every((slot) => !slot.writesAllowed && !slot.startsServices && !slot.mutatesSiblingState)
      && guards.every((guard) => !guard.writesAllowed && !guard.startsServices
        && !guard.mutatesSiblingState),
    requiresHumanDraftArtifactAuthoring: true,
    requiresDetachedSignatureOutOfBand: true,
    requiresDigestRecheckBeforeDraftMaterialization: true,
    requiresSiblingNonMutationEvidence: true,
    nextStepRequiresManualDraftArtifactAuthoring: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightBlockedReasons(
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGates,
): string[] {
  return [
    gates.sourceArtifactDraftReadinessReady ? null : "SOURCE_ARTIFACT_DRAFT_READINESS_NOT_READY",
    gates.packageSlotCountComplete ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SLOT_COUNT_INCOMPLETE",
    gates.packageGuardCountComplete ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_GUARD_COUNT_INCOMPLETE",
    gates.slotVersionsSequential ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SLOT_VERSIONS_NOT_SEQUENTIAL",
    gates.guardVersionsSequential ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_GUARD_VERSIONS_NOT_SEQUENTIAL",
    gates.sourceReadinessLanesReady ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_LANES_NOT_READY",
    gates.sourceReadinessControlsReady ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_CONTROLS_NOT_READY",
    gates.allSlotsReady ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SLOTS_NOT_READY",
    gates.allGuardsReady ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_GUARDS_NOT_READY",
    gates.allSlotPurposesDeclared ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SLOT_PURPOSES_MISSING",
    gates.allGuardTextsDeclared ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_GUARD_TEXTS_MISSING",
    gates.allReadinessLaneModesCovered ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_LANE_MODES_NOT_COVERED",
    gates.allSourceReadinessLanesReadOnly ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_LANES_NOT_READ_ONLY",
    gates.allSourceReadinessControlsReadOnly ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_CONTROLS_NOT_READ_ONLY",
    gates.allSlotsReadOnly ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SLOT_NOT_READ_ONLY",
    gates.allGuardsReadOnly ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_GUARD_NOT_READ_ONLY",
    gates.allGuardsRejectMissingPackageSlots ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_MISSING_SLOT_NOT_REJECTED",
    gates.allGuardsBlockPackageMaterialization ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_MATERIALIZATION_NOT_BLOCKED",
    gates.allGuardsBlockSignedDraftText ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SIGNED_TEXT_NOT_BLOCKED",
    gates.allGuardsBlockSignaturePayload ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SIGNATURE_PAYLOAD_NOT_BLOCKED",
    gates.allGuardsBlockApprovalGrant ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_APPROVAL_GRANT_NOT_BLOCKED",
    gates.allGuardsBlockRuntimePayload ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_RUNTIME_PAYLOAD_NOT_BLOCKED",
    gates.allGuardsBlockWrites ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_WRITES_NOT_BLOCKED",
    gates.allGuardsBlockSiblingMutation ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SIBLING_MUTATION_NOT_BLOCKED",
    gates.sourceReadinessDigestPresent ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_READINESS_DIGEST_MISSING",
    gates.sourceDraftPreflightDigestPresent ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING",
    gates.sourceArtifactPreflightDigestPresent ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_ARTIFACT_DIGEST_MISSING",
    gates.sourceCapturePreflightDigestPresent ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_CAPTURE_DIGEST_MISSING",
    gates.sourceTemplateDigestPresent ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_TEMPLATE_DIGEST_MISSING",
    gates.sourceReviewDigestPresent ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_REVIEW_DIGEST_MISSING",
    gates.digestPackageSlotsReady ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_DIGEST_SLOTS_NOT_READY",
    gates.sourceReadinessStillReadOnly ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_NOT_READ_ONLY",
    gates.sourceStillNoDraftMaterialization ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_DRAFT_MATERIALIZED",
    gates.sourceStillNoSignaturePayload ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_SIGNATURE_PAYLOAD_PRESENT",
    gates.sourceStillNoApprovalGrant ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_APPROVAL_GRANT_PRESENT",
    gates.sourceStillNoSignedApproval ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SOURCE_SIGNED_APPROVAL_PRESENT",
    gates.reviewPackageAllowedButNotMaterialized ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_NOT_READY_OR_MATERIALIZED",
    gates.signedApprovalDraftStillDisabled ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SIGNED_DRAFT_ENABLED",
    gates.signedApprovalCaptureStillDisabled ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_CAPTURE_ENABLED",
    gates.operatorValueSupplyStillDisabled ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_OPERATOR_VALUE_SUPPLY_ENABLED",
    gates.evidenceImportStillBlocked ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_EVIDENCE_IMPORT_ENABLED",
    gates.runtimePayloadStillBlocked ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_RUNTIME_PAYLOAD_ENABLED",
    gates.liveExecutionStillBlocked ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_PRODUCTION_EXECUTION_ENABLED",
    gates.noSideEffectsAllowed ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SIDE_EFFECTS_ALLOWED",
    gates.requiresHumanDraftArtifactAuthoring ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_HUMAN_AUTHORING_NOT_REQUIRED",
    gates.requiresDetachedSignatureOutOfBand ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_DETACHED_SIGNATURE_NOT_OUT_OF_BAND",
    gates.requiresDigestRecheckBeforeDraftMaterialization ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_DIGEST_RECHECK_NOT_REQUIRED",
    gates.requiresSiblingNonMutationEvidence ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_SIBLING_NON_MUTATION_NOT_REQUIRED",
    gates.nextStepRequiresManualDraftArtifactAuthoring ? null : "ARTIFACT_DRAFT_REVIEW_PACKAGE_NEXT_STEP_NOT_HUMAN_AUTHORING",
  ].filter((reason): reason is string => reason !== null);
}
