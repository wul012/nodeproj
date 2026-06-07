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
  return [
    gates.sourceReviewPackagePreflightReady ? null : "SOURCE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_NOT_READY",
    gates.authoringRequirementCountComplete ? null : "ARTIFACT_DRAFT_AUTHORING_REQUIREMENT_COUNT_INCOMPLETE",
    gates.authoringBlockerCountComplete ? null : "ARTIFACT_DRAFT_AUTHORING_BLOCKER_COUNT_INCOMPLETE",
    gates.requirementVersionsSequential ? null : "ARTIFACT_DRAFT_AUTHORING_REQUIREMENT_VERSIONS_NOT_SEQUENTIAL",
    gates.blockerVersionsSequential ? null : "ARTIFACT_DRAFT_AUTHORING_BLOCKER_VERSIONS_NOT_SEQUENTIAL",
    gates.sourcePackageSlotsReady ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_SLOTS_NOT_READY",
    gates.sourcePackageGuardsReady ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_GUARDS_NOT_READY",
    gates.allRequirementsReady ? null : "ARTIFACT_DRAFT_AUTHORING_REQUIREMENTS_NOT_READY",
    gates.allBlockersReady ? null : "ARTIFACT_DRAFT_AUTHORING_BLOCKERS_NOT_READY",
    gates.allAuthoringPurposesDeclared ? null : "ARTIFACT_DRAFT_AUTHORING_PURPOSES_MISSING",
    gates.allBlockerTextsDeclared ? null : "ARTIFACT_DRAFT_AUTHORING_BLOCKER_TEXTS_MISSING",
    gates.allPackageSlotModesCovered ? null : "ARTIFACT_DRAFT_AUTHORING_SLOT_MODES_NOT_COVERED",
    gates.allSourcePackageSlotsReadOnly ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_SLOTS_NOT_READ_ONLY",
    gates.allSourcePackageGuardsReadOnly ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_GUARDS_NOT_READ_ONLY",
    gates.allRequirementsReadOnly ? null : "ARTIFACT_DRAFT_AUTHORING_REQUIREMENT_NOT_READ_ONLY",
    gates.allBlockersReadOnly ? null : "ARTIFACT_DRAFT_AUTHORING_BLOCKER_NOT_READ_ONLY",
    gates.allBlockersRejectMissingRequirements ? null : "ARTIFACT_DRAFT_AUTHORING_MISSING_REQUIREMENT_NOT_REJECTED",
    gates.allBlockersBlockAuthoringMaterialization ? null : "ARTIFACT_DRAFT_AUTHORING_MATERIALIZATION_NOT_BLOCKED",
    gates.allBlockersBlockDraftArtifactCreation ? null : "ARTIFACT_DRAFT_AUTHORING_DRAFT_ARTIFACT_NOT_BLOCKED",
    gates.allBlockersBlockSignedDraftText ? null : "ARTIFACT_DRAFT_AUTHORING_SIGNED_TEXT_NOT_BLOCKED",
    gates.allBlockersBlockSignaturePayload ? null : "ARTIFACT_DRAFT_AUTHORING_SIGNATURE_PAYLOAD_NOT_BLOCKED",
    gates.allBlockersBlockApprovalGrant ? null : "ARTIFACT_DRAFT_AUTHORING_APPROVAL_GRANT_NOT_BLOCKED",
    gates.allBlockersBlockRuntimePayload ? null : "ARTIFACT_DRAFT_AUTHORING_RUNTIME_PAYLOAD_NOT_BLOCKED",
    gates.allBlockersBlockWrites ? null : "ARTIFACT_DRAFT_AUTHORING_WRITES_NOT_BLOCKED",
    gates.allBlockersBlockSiblingMutation ? null : "ARTIFACT_DRAFT_AUTHORING_SIBLING_MUTATION_NOT_BLOCKED",
    gates.sourceReviewPackagePreflightDigestPresent ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_PACKAGE_DIGEST_MISSING",
    gates.sourceReadinessDigestPresent ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_READINESS_DIGEST_MISSING",
    gates.sourceDraftPreflightDigestPresent ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING",
    gates.sourceArtifactPreflightDigestPresent ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_ARTIFACT_DIGEST_MISSING",
    gates.sourceCapturePreflightDigestPresent ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_CAPTURE_DIGEST_MISSING",
    gates.sourceTemplateDigestPresent ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_TEMPLATE_DIGEST_MISSING",
    gates.sourceReviewDigestPresent ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_REVIEW_DIGEST_MISSING",
    gates.digestAuthoringRequirementsReady ? null : "ARTIFACT_DRAFT_AUTHORING_DIGEST_REQUIREMENTS_NOT_READY",
    gates.sourcePackageStillReadOnly ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_NOT_READ_ONLY",
    gates.sourceStillNoPackageMaterialization ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_PACKAGE_MATERIALIZED",
    gates.sourceStillNoSignedDraftText ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_SIGNED_TEXT_PRESENT",
    gates.sourceStillNoSignaturePayload ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_SIGNATURE_PAYLOAD_PRESENT",
    gates.sourceStillNoApprovalGrant ? null : "ARTIFACT_DRAFT_AUTHORING_SOURCE_APPROVAL_GRANT_PRESENT",
    gates.authoringAllowedButNotMaterialized ? null : "ARTIFACT_DRAFT_AUTHORING_NOT_READY_OR_MATERIALIZED",
    gates.signedApprovalDraftStillDisabled ? null : "ARTIFACT_DRAFT_AUTHORING_SIGNED_DRAFT_ENABLED",
    gates.signedApprovalCaptureStillDisabled ? null : "ARTIFACT_DRAFT_AUTHORING_CAPTURE_ENABLED",
    gates.operatorValueSupplyStillDisabled ? null : "ARTIFACT_DRAFT_AUTHORING_OPERATOR_VALUE_SUPPLY_ENABLED",
    gates.evidenceImportStillBlocked ? null : "ARTIFACT_DRAFT_AUTHORING_EVIDENCE_IMPORT_ENABLED",
    gates.runtimePayloadStillBlocked ? null : "ARTIFACT_DRAFT_AUTHORING_RUNTIME_PAYLOAD_ENABLED",
    gates.liveExecutionStillBlocked ? null : "ARTIFACT_DRAFT_AUTHORING_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "ARTIFACT_DRAFT_AUTHORING_PRODUCTION_EXECUTION_ENABLED",
    gates.noSideEffectsAllowed ? null : "ARTIFACT_DRAFT_AUTHORING_SIDE_EFFECTS_ALLOWED",
    gates.requiresOfflineHumanDraftAuthoring ? null : "ARTIFACT_DRAFT_AUTHORING_OFFLINE_HUMAN_AUTHORING_NOT_REQUIRED",
    gates.requiresDetachedSignatureOutOfBand ? null : "ARTIFACT_DRAFT_AUTHORING_DETACHED_SIGNATURE_NOT_OUT_OF_BAND",
    gates.requiresDigestRecheckBeforeDraftArtifact ? null : "ARTIFACT_DRAFT_AUTHORING_DIGEST_RECHECK_NOT_REQUIRED",
    gates.nextStepRequiresManualDraftArtifactPackage ? null : "ARTIFACT_DRAFT_AUTHORING_NEXT_STEP_NOT_MANUAL_PACKAGE",
  ].filter((reason): reason is string => reason !== null);
}
