import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGates(
  readiness:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
  slots:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot[],
  guards:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuard[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGates {
  const digestSlots = slots.filter((slot) => slot.slotMode === "digest-instruction-pin");

  return {
    sourceAuthoringReadinessReady: readiness.readyForSignedApprovalArtifactDraftAuthoringReadiness,
    instructionSlotCountComplete:
      slots.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_VERSIONS.length,
    instructionGuardCountComplete:
      guards.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_VERSIONS.length,
    slotVersionsSequential: slots.every((slot, index) =>
      slot.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_VERSIONS[index]),
    guardVersionsSequential: guards.every((guard, index) =>
      guard.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_VERSIONS[index]),
    sourceAuthoringRequirementsReady: slots.every((slot) => slot.sourceAuthoringRequirementReady),
    sourceAuthoringBlockersReady: slots.every((slot) => slot.sourceAuthoringBlockerReady),
    allInstructionSlotsReady: slots.every((slot) => slot.readyForHumanSignedApprovalDraftInstructionSlot),
    allInstructionGuardsReady: guards.every((guard) => guard.readyForHumanSignedApprovalDraftInstructionGuard),
    allInstructionPurposesDeclared: slots.every((slot) => slot.instructionPurpose.length > 0),
    allGuardTextsDeclared: guards.every((guard) => guard.guardText.length > 0),
    allSourceRequirementsReadOnly: slots.every((slot) => slot.sourceAuthoringRequirementReadOnly),
    allSourceBlockersReadOnly: slots.every((slot) => slot.sourceAuthoringBlockerReadOnly),
    allSlotsReadOnly: slots.every((slot) => slot.readOnly),
    allGuardsReadOnly: guards.every((guard) => guard.readOnly),
    allGuardsRejectMissingInstructions: guards.every((guard) => guard.rejectsMissingInstructionSlot),
    allGuardsBlockInstructionMaterialization:
      guards.every((guard) => guard.blocksInstructionMaterialization),
    allGuardsBlockDraftArtifactCreation: guards.every((guard) => guard.blocksDraftArtifactCreation),
    allGuardsBlockSignedDraftText: guards.every((guard) => guard.blocksSignedDraftText),
    allGuardsBlockSignaturePayload: guards.every((guard) => guard.blocksSignaturePayload),
    allGuardsBlockApprovalGrant: guards.every((guard) => guard.blocksApprovalGrant),
    allGuardsBlockRuntimePayload: guards.every((guard) => guard.blocksRuntimePayload),
    allGuardsBlockWrites: guards.every((guard) => guard.blocksWrites),
    allGuardsBlockSiblingMutation: guards.every((guard) => guard.blocksSiblingMutation),
    sourceAuthoringReadinessDigestPresent:
      DIGEST_PATTERN.test(readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessDigest),
    sourceReviewPackageDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest),
    sourceDraftReadinessDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalCaptureArtifactDraftReadinessDigest),
    sourceDraftPreflightDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest),
    sourceArtifactPreflightDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalCaptureArtifactPreflightDigest),
    sourceCapturePreflightDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent:
      DIGEST_PATTERN.test(readiness.sourceApprovalPacketReviewDigest),
    digestInstructionSlotsReady:
      digestSlots.length === 5
      && digestSlots.every((slot) => slot.readyForHumanSignedApprovalDraftInstructionSlot),
    sourceStillNoInstructionMaterialization: readiness.authoringInstructionMaterializedCount === 0,
    sourceStillNoDraftArtifact: !readiness.draftArtifactCreated,
    sourceStillNoSignedDraftText:
      readiness.signedDraftTextCount === 0 && !readiness.containsSecretValue,
    sourceStillNoSignaturePayload: readiness.draftSignaturePayloadCount === 0,
    sourceStillNoApprovalGrant: !readiness.approvalGrantPresent,
    instructionPreflightReadyButUnmaterialized:
      readiness.readyForSignedApprovalArtifactDraftAuthoringReadiness
      && slots.every((slot) =>
        slot.readyForHumanSignedApprovalDraftInstructionSlot
        && !slot.instructionMaterialized
        && !slot.draftArtifactCreated
        && !slot.signedDraftTextPresent)
      && guards.every((guard) => guard.readyForHumanSignedApprovalDraftInstructionGuard),
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
      && guards.every((guard) => !guard.writesAllowed && !guard.startsServices && !guard.mutatesSiblingState),
    requiresOfflineHumanInstructionAuthoring: true,
    requiresSeparateDraftTextPackage: true,
    requiresDetachedSignatureOutOfBand: true,
    requiresDigestRecheckBeforeDraftText: true,
    nextStepRequiresManualDraftTextPackage: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightBlockedReasons(
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceAuthoringReadinessReady, "SOURCE_ARTIFACT_DRAFT_AUTHORING_READINESS_NOT_READY"],
    [gates.instructionSlotCountComplete, "ARTIFACT_DRAFT_INSTRUCTION_SLOT_COUNT_INCOMPLETE"],
    [gates.instructionGuardCountComplete, "ARTIFACT_DRAFT_INSTRUCTION_GUARD_COUNT_INCOMPLETE"],
    [gates.slotVersionsSequential, "ARTIFACT_DRAFT_INSTRUCTION_SLOT_VERSIONS_NOT_SEQUENTIAL"],
    [gates.guardVersionsSequential, "ARTIFACT_DRAFT_INSTRUCTION_GUARD_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourceAuthoringRequirementsReady, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_REQUIREMENTS_NOT_READY"],
    [gates.sourceAuthoringBlockersReady, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_BLOCKERS_NOT_READY"],
    [gates.allInstructionSlotsReady, "ARTIFACT_DRAFT_INSTRUCTION_SLOTS_NOT_READY"],
    [gates.allInstructionGuardsReady, "ARTIFACT_DRAFT_INSTRUCTION_GUARDS_NOT_READY"],
    [gates.allInstructionPurposesDeclared, "ARTIFACT_DRAFT_INSTRUCTION_PURPOSES_MISSING"],
    [gates.allGuardTextsDeclared, "ARTIFACT_DRAFT_INSTRUCTION_GUARD_TEXTS_MISSING"],
    [gates.allSourceRequirementsReadOnly, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_REQUIREMENTS_NOT_READ_ONLY"],
    [gates.allSourceBlockersReadOnly, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_BLOCKERS_NOT_READ_ONLY"],
    [gates.allSlotsReadOnly, "ARTIFACT_DRAFT_INSTRUCTION_SLOTS_NOT_READ_ONLY"],
    [gates.allGuardsReadOnly, "ARTIFACT_DRAFT_INSTRUCTION_GUARDS_NOT_READ_ONLY"],
    [gates.allGuardsRejectMissingInstructions, "ARTIFACT_DRAFT_INSTRUCTION_MISSING_SLOT_NOT_REJECTED"],
    [gates.allGuardsBlockInstructionMaterialization, "ARTIFACT_DRAFT_INSTRUCTION_MATERIALIZATION_NOT_BLOCKED"],
    [gates.allGuardsBlockDraftArtifactCreation, "ARTIFACT_DRAFT_INSTRUCTION_DRAFT_ARTIFACT_NOT_BLOCKED"],
    [gates.allGuardsBlockSignedDraftText, "ARTIFACT_DRAFT_INSTRUCTION_SIGNED_TEXT_NOT_BLOCKED"],
    [gates.allGuardsBlockSignaturePayload, "ARTIFACT_DRAFT_INSTRUCTION_SIGNATURE_PAYLOAD_NOT_BLOCKED"],
    [gates.allGuardsBlockApprovalGrant, "ARTIFACT_DRAFT_INSTRUCTION_APPROVAL_GRANT_NOT_BLOCKED"],
    [gates.allGuardsBlockRuntimePayload, "ARTIFACT_DRAFT_INSTRUCTION_RUNTIME_PAYLOAD_NOT_BLOCKED"],
    [gates.allGuardsBlockWrites, "ARTIFACT_DRAFT_INSTRUCTION_WRITES_NOT_BLOCKED"],
    [gates.allGuardsBlockSiblingMutation, "ARTIFACT_DRAFT_INSTRUCTION_SIBLING_MUTATION_NOT_BLOCKED"],
    [gates.sourceAuthoringReadinessDigestPresent, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_AUTHORING_DIGEST_MISSING"],
    [gates.sourceReviewPackageDigestPresent, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_PACKAGE_DIGEST_MISSING"],
    [gates.sourceDraftReadinessDigestPresent, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_READINESS_DIGEST_MISSING"],
    [gates.sourceDraftPreflightDigestPresent, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING"],
    [gates.sourceArtifactPreflightDigestPresent, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_ARTIFACT_DIGEST_MISSING"],
    [gates.sourceCapturePreflightDigestPresent, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_CAPTURE_DIGEST_MISSING"],
    [gates.sourceTemplateDigestPresent, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_TEMPLATE_DIGEST_MISSING"],
    [gates.sourceReviewDigestPresent, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_REVIEW_DIGEST_MISSING"],
    [gates.digestInstructionSlotsReady, "ARTIFACT_DRAFT_INSTRUCTION_DIGEST_SLOTS_NOT_READY"],
    [gates.sourceStillNoInstructionMaterialization, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_INSTRUCTIONS_MATERIALIZED"],
    [gates.sourceStillNoDraftArtifact, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_DRAFT_ARTIFACT_PRESENT"],
    [gates.sourceStillNoSignedDraftText, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_SIGNED_TEXT_PRESENT"],
    [gates.sourceStillNoSignaturePayload, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_SIGNATURE_PAYLOAD_PRESENT"],
    [gates.sourceStillNoApprovalGrant, "ARTIFACT_DRAFT_INSTRUCTION_SOURCE_APPROVAL_GRANT_PRESENT"],
    [gates.instructionPreflightReadyButUnmaterialized, "ARTIFACT_DRAFT_INSTRUCTION_NOT_READY_OR_MATERIALIZED"],
    [gates.signedApprovalDraftStillDisabled, "ARTIFACT_DRAFT_INSTRUCTION_SIGNED_DRAFT_ENABLED"],
    [gates.signedApprovalCaptureStillDisabled, "ARTIFACT_DRAFT_INSTRUCTION_CAPTURE_ENABLED"],
    [gates.operatorValueSupplyStillDisabled, "ARTIFACT_DRAFT_INSTRUCTION_OPERATOR_VALUE_SUPPLY_ENABLED"],
    [gates.evidenceImportStillBlocked, "ARTIFACT_DRAFT_INSTRUCTION_EVIDENCE_IMPORT_ENABLED"],
    [gates.runtimePayloadStillBlocked, "ARTIFACT_DRAFT_INSTRUCTION_RUNTIME_PAYLOAD_ENABLED"],
    [gates.liveExecutionStillBlocked, "ARTIFACT_DRAFT_INSTRUCTION_LIVE_EXECUTION_ENABLED"],
    [gates.productionExecutionStillBlocked, "ARTIFACT_DRAFT_INSTRUCTION_PRODUCTION_EXECUTION_ENABLED"],
    [gates.noSideEffectsAllowed, "ARTIFACT_DRAFT_INSTRUCTION_SIDE_EFFECTS_ALLOWED"],
    [gates.requiresOfflineHumanInstructionAuthoring, "ARTIFACT_DRAFT_INSTRUCTION_OFFLINE_HUMAN_AUTHORING_NOT_REQUIRED"],
    [gates.requiresSeparateDraftTextPackage, "ARTIFACT_DRAFT_INSTRUCTION_SEPARATE_TEXT_PACKAGE_NOT_REQUIRED"],
    [gates.requiresDetachedSignatureOutOfBand, "ARTIFACT_DRAFT_INSTRUCTION_DETACHED_SIGNATURE_NOT_OUT_OF_BAND"],
    [gates.requiresDigestRecheckBeforeDraftText, "ARTIFACT_DRAFT_INSTRUCTION_DIGEST_RECHECK_NOT_REQUIRED"],
    [gates.nextStepRequiresManualDraftTextPackage, "ARTIFACT_DRAFT_INSTRUCTION_NEXT_STEP_NOT_MANUAL_TEXT_PACKAGE"],
  ]);
}
