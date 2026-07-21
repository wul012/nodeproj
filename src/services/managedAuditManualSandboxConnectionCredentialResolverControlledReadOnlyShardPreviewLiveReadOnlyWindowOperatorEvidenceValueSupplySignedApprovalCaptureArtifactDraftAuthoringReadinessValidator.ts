import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlocker,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessGates(
  preflight:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
  requirements:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement[],
  blockers:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlocker[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessGates {
  const digestRequirements = requirements.filter((requirement) =>
    requirement.requirementMode === "digest-authoring-pin");

  return {
    sourceReviewPackagePreflightReady: preflight.readyForSignedApprovalArtifactDraftReviewPackagePreflight,
    authoringRequirementCountComplete:
      requirements.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_VERSIONS.length,
    authoringBlockerCountComplete:
      blockers.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_VERSIONS.length,
    requirementVersionsSequential: requirements.every((requirement, index) =>
      requirement.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_VERSIONS[index]),
    blockerVersionsSequential: blockers.every((blocker, index) =>
      blocker.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_VERSIONS[index]),
    sourcePackageSlotsReady: requirements.every((requirement) => requirement.sourcePackageSlotReady),
    sourcePackageGuardsReady: requirements.every((requirement) => requirement.sourcePackageGuardReady),
    allRequirementsReady:
      requirements.every((requirement) =>
        requirement.readyForHumanSignedApprovalDraftArtifactAuthoringRequirement),
    allBlockersReady:
      blockers.every((blocker) => blocker.readyForHumanSignedApprovalDraftArtifactAuthoringBlocker),
    allAuthoringPurposesDeclared: requirements.every((requirement) => requirement.authoringPurpose.length > 0),
    allBlockerTextsDeclared: blockers.every((blocker) => blocker.blockerText.length > 0),
    allPackageSlotModesCovered: requirements.every((requirement) => requirement.requiredPackageSlotModeCovered),
    allSourcePackageSlotsReadOnly: requirements.every((requirement) => requirement.sourcePackageSlotReadOnly),
    allSourcePackageGuardsReadOnly: requirements.every((requirement) => requirement.sourcePackageGuardReadOnly),
    allRequirementsReadOnly: requirements.every((requirement) => requirement.readOnly),
    allBlockersReadOnly: blockers.every((blocker) => blocker.readOnly),
    allBlockersRejectMissingRequirements:
      blockers.every((blocker) => blocker.rejectsMissingAuthoringRequirement),
    allBlockersBlockAuthoringMaterialization:
      blockers.every((blocker) => blocker.blocksAuthoringInstructionMaterialization),
    allBlockersBlockDraftArtifactCreation:
      blockers.every((blocker) => blocker.blocksDraftArtifactCreation),
    allBlockersBlockSignedDraftText:
      blockers.every((blocker) => blocker.blocksSignedDraftText),
    allBlockersBlockSignaturePayload:
      blockers.every((blocker) => blocker.blocksSignaturePayload),
    allBlockersBlockApprovalGrant:
      blockers.every((blocker) => blocker.blocksApprovalGrant),
    allBlockersBlockRuntimePayload:
      blockers.every((blocker) => blocker.blocksRuntimePayload),
    allBlockersBlockWrites:
      blockers.every((blocker) => blocker.blocksWrites),
    allBlockersBlockSiblingMutation:
      blockers.every((blocker) => blocker.blocksSiblingMutation),
    sourceReviewPackagePreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest),
    sourceReadinessDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest),
    sourceDraftPreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest),
    sourceArtifactPreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactPreflightDigest),
    sourceCapturePreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent: DIGEST_PATTERN.test(preflight.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent: DIGEST_PATTERN.test(preflight.sourceApprovalPacketReviewDigest),
    digestAuthoringRequirementsReady:
      digestRequirements.length === 5
      && digestRequirements.every((requirement) =>
        requirement.readyForHumanSignedApprovalDraftArtifactAuthoringRequirement),
    sourcePackageStillReadOnly:
      !preflight.executionAllowed
      && !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && !preflight.importsRuntimePayload,
    sourceStillNoPackageMaterialization:
      !preflight.packageArtifactCreated && preflight.packageSlotMaterializedCount === 0,
    sourceStillNoSignedDraftText:
      preflight.signedDraftTextCount === 0 && !preflight.containsSecretValue,
    sourceStillNoSignaturePayload: preflight.draftSignaturePayloadCount === 0,
    sourceStillNoApprovalGrant: !preflight.approvalGrantPresent,
    authoringAllowedButNotMaterialized:
      preflight.readyForSignedApprovalArtifactDraftReviewPackagePreflight
      && requirements.every((requirement) =>
        requirement.readyForHumanSignedApprovalDraftArtifactAuthoringRequirement)
      && requirements.every((requirement) =>
        !requirement.authoringInstructionMaterialized
        && !requirement.draftArtifactCreated
        && !requirement.signedDraftTextPresent),
    signedApprovalDraftStillDisabled:
      !preflight.readyForSignedApprovalArtifactDraft
      && requirements.every((requirement) => !requirement.readyForSignedApprovalArtifactDraft)
      && blockers.every((blocker) => !blocker.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !preflight.readyForSignedApprovalCapture
      && requirements.every((requirement) => !requirement.readyForSignedApprovalCapture)
      && blockers.every((blocker) => !blocker.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !preflight.readyForOperatorValueSupply
      && requirements.every((requirement) => !requirement.readyForOperatorValueSupply)
      && blockers.every((blocker) => !blocker.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !preflight.readyForEvidenceImport
      && requirements.every((requirement) => !requirement.readyForEvidenceImport)
      && blockers.every((blocker) => !blocker.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !preflight.readyForRuntimePayload
      && requirements.every((requirement) => !requirement.readyForRuntimePayload)
      && blockers.every((blocker) => !blocker.readyForRuntimePayload),
    liveExecutionStillBlocked: !preflight.readyForLiveExecution,
    productionExecutionStillBlocked: !preflight.readyForProductionExecution,
    noSideEffectsAllowed:
      !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && requirements.every((requirement) =>
        !requirement.writesAllowed && !requirement.startsServices && !requirement.mutatesSiblingState)
      && blockers.every((blocker) =>
        !blocker.writesAllowed && !blocker.startsServices && !blocker.mutatesSiblingState),
    requiresOfflineHumanDraftAuthoring: true,
    requiresDetachedSignatureOutOfBand: true,
    requiresDigestRecheckBeforeDraftArtifact: true,
    nextStepRequiresManualDraftArtifactPackage: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockedReasons(
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceReviewPackagePreflightReady, "SOURCE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_NOT_READY"],
    [gates.authoringRequirementCountComplete, "ARTIFACT_DRAFT_AUTHORING_REQUIREMENT_COUNT_INCOMPLETE"],
    [gates.authoringBlockerCountComplete, "ARTIFACT_DRAFT_AUTHORING_BLOCKER_COUNT_INCOMPLETE"],
    [gates.requirementVersionsSequential, "ARTIFACT_DRAFT_AUTHORING_REQUIREMENT_VERSIONS_NOT_SEQUENTIAL"],
    [gates.blockerVersionsSequential, "ARTIFACT_DRAFT_AUTHORING_BLOCKER_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourcePackageSlotsReady, "ARTIFACT_DRAFT_AUTHORING_SOURCE_SLOTS_NOT_READY"],
    [gates.sourcePackageGuardsReady, "ARTIFACT_DRAFT_AUTHORING_SOURCE_GUARDS_NOT_READY"],
    [gates.allRequirementsReady, "ARTIFACT_DRAFT_AUTHORING_REQUIREMENTS_NOT_READY"],
    [gates.allBlockersReady, "ARTIFACT_DRAFT_AUTHORING_BLOCKERS_NOT_READY"],
    [gates.allAuthoringPurposesDeclared, "ARTIFACT_DRAFT_AUTHORING_PURPOSES_MISSING"],
    [gates.allBlockerTextsDeclared, "ARTIFACT_DRAFT_AUTHORING_BLOCKER_TEXTS_MISSING"],
    [gates.allPackageSlotModesCovered, "ARTIFACT_DRAFT_AUTHORING_SLOT_MODES_NOT_COVERED"],
    [gates.allSourcePackageSlotsReadOnly, "ARTIFACT_DRAFT_AUTHORING_SOURCE_SLOTS_NOT_READ_ONLY"],
    [gates.allSourcePackageGuardsReadOnly, "ARTIFACT_DRAFT_AUTHORING_SOURCE_GUARDS_NOT_READ_ONLY"],
    [gates.allRequirementsReadOnly, "ARTIFACT_DRAFT_AUTHORING_REQUIREMENT_NOT_READ_ONLY"],
    [gates.allBlockersReadOnly, "ARTIFACT_DRAFT_AUTHORING_BLOCKER_NOT_READ_ONLY"],
    [gates.allBlockersRejectMissingRequirements, "ARTIFACT_DRAFT_AUTHORING_MISSING_REQUIREMENT_NOT_REJECTED"],
    [gates.allBlockersBlockAuthoringMaterialization, "ARTIFACT_DRAFT_AUTHORING_MATERIALIZATION_NOT_BLOCKED"],
    [gates.allBlockersBlockDraftArtifactCreation, "ARTIFACT_DRAFT_AUTHORING_DRAFT_ARTIFACT_NOT_BLOCKED"],
    [gates.allBlockersBlockSignedDraftText, "ARTIFACT_DRAFT_AUTHORING_SIGNED_TEXT_NOT_BLOCKED"],
    [gates.allBlockersBlockSignaturePayload, "ARTIFACT_DRAFT_AUTHORING_SIGNATURE_PAYLOAD_NOT_BLOCKED"],
    [gates.allBlockersBlockApprovalGrant, "ARTIFACT_DRAFT_AUTHORING_APPROVAL_GRANT_NOT_BLOCKED"],
    [gates.allBlockersBlockRuntimePayload, "ARTIFACT_DRAFT_AUTHORING_RUNTIME_PAYLOAD_NOT_BLOCKED"],
    [gates.allBlockersBlockWrites, "ARTIFACT_DRAFT_AUTHORING_WRITES_NOT_BLOCKED"],
    [gates.allBlockersBlockSiblingMutation, "ARTIFACT_DRAFT_AUTHORING_SIBLING_MUTATION_NOT_BLOCKED"],
    [gates.sourceReviewPackagePreflightDigestPresent, "ARTIFACT_DRAFT_AUTHORING_SOURCE_PACKAGE_DIGEST_MISSING"],
    [gates.sourceReadinessDigestPresent, "ARTIFACT_DRAFT_AUTHORING_SOURCE_READINESS_DIGEST_MISSING"],
    [gates.sourceDraftPreflightDigestPresent, "ARTIFACT_DRAFT_AUTHORING_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING"],
    [gates.sourceArtifactPreflightDigestPresent, "ARTIFACT_DRAFT_AUTHORING_SOURCE_ARTIFACT_DIGEST_MISSING"],
    [gates.sourceCapturePreflightDigestPresent, "ARTIFACT_DRAFT_AUTHORING_SOURCE_CAPTURE_DIGEST_MISSING"],
    [gates.sourceTemplateDigestPresent, "ARTIFACT_DRAFT_AUTHORING_SOURCE_TEMPLATE_DIGEST_MISSING"],
    [gates.sourceReviewDigestPresent, "ARTIFACT_DRAFT_AUTHORING_SOURCE_REVIEW_DIGEST_MISSING"],
    [gates.digestAuthoringRequirementsReady, "ARTIFACT_DRAFT_AUTHORING_DIGEST_REQUIREMENTS_NOT_READY"],
    [gates.sourcePackageStillReadOnly, "ARTIFACT_DRAFT_AUTHORING_SOURCE_NOT_READ_ONLY"],
    [gates.sourceStillNoPackageMaterialization, "ARTIFACT_DRAFT_AUTHORING_SOURCE_PACKAGE_MATERIALIZED"],
    [gates.sourceStillNoSignedDraftText, "ARTIFACT_DRAFT_AUTHORING_SOURCE_SIGNED_TEXT_PRESENT"],
    [gates.sourceStillNoSignaturePayload, "ARTIFACT_DRAFT_AUTHORING_SOURCE_SIGNATURE_PAYLOAD_PRESENT"],
    [gates.sourceStillNoApprovalGrant, "ARTIFACT_DRAFT_AUTHORING_SOURCE_APPROVAL_GRANT_PRESENT"],
    [gates.authoringAllowedButNotMaterialized, "ARTIFACT_DRAFT_AUTHORING_NOT_READY_OR_MATERIALIZED"],
    [gates.signedApprovalDraftStillDisabled, "ARTIFACT_DRAFT_AUTHORING_SIGNED_DRAFT_ENABLED"],
    [gates.signedApprovalCaptureStillDisabled, "ARTIFACT_DRAFT_AUTHORING_CAPTURE_ENABLED"],
    [gates.operatorValueSupplyStillDisabled, "ARTIFACT_DRAFT_AUTHORING_OPERATOR_VALUE_SUPPLY_ENABLED"],
    [gates.evidenceImportStillBlocked, "ARTIFACT_DRAFT_AUTHORING_EVIDENCE_IMPORT_ENABLED"],
    [gates.runtimePayloadStillBlocked, "ARTIFACT_DRAFT_AUTHORING_RUNTIME_PAYLOAD_ENABLED"],
    [gates.liveExecutionStillBlocked, "ARTIFACT_DRAFT_AUTHORING_LIVE_EXECUTION_ENABLED"],
    [gates.productionExecutionStillBlocked, "ARTIFACT_DRAFT_AUTHORING_PRODUCTION_EXECUTION_ENABLED"],
    [gates.noSideEffectsAllowed, "ARTIFACT_DRAFT_AUTHORING_SIDE_EFFECTS_ALLOWED"],
    [gates.requiresOfflineHumanDraftAuthoring, "ARTIFACT_DRAFT_AUTHORING_OFFLINE_HUMAN_AUTHORING_NOT_REQUIRED"],
    [gates.requiresDetachedSignatureOutOfBand, "ARTIFACT_DRAFT_AUTHORING_DETACHED_SIGNATURE_NOT_OUT_OF_BAND"],
    [gates.requiresDigestRecheckBeforeDraftArtifact, "ARTIFACT_DRAFT_AUTHORING_DIGEST_RECHECK_NOT_REQUIRED"],
    [gates.nextStepRequiresManualDraftArtifactPackage, "ARTIFACT_DRAFT_AUTHORING_NEXT_STEP_NOT_MANUAL_PACKAGE"],
  ]);
}
