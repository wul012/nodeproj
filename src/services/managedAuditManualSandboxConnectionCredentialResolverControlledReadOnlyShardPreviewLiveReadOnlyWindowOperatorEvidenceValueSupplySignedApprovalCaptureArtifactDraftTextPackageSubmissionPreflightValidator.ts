import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;

type ReviewPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight;
type SubmissionSlot =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlot;
type ComparisonControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControl;
type SubmissionGates =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightGates;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightGates(
  preflight: ReviewPreflight,
  slots: readonly SubmissionSlot[],
  controls: readonly ComparisonControl[],
): SubmissionGates {
  const digestSlots = slots.filter((slot) => slot.slotMode === "digest-comparison-pin");

  return {
    sourceReviewPreflightReady:
      preflight.readyForSignedApprovalArtifactDraftTextPackageReviewPreflight,
    submissionSlotCountComplete:
      slots.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_VERSIONS.length,
    comparisonControlCountComplete:
      controls.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_VERSIONS.length,
    slotVersionsSequential: slots.every((slot, index) =>
      slot.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_VERSIONS[index]),
    controlVersionsSequential: controls.every((control, index) =>
      control.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_VERSIONS[index]),
    sourceReviewCriteriaReady: slots.every((slot) => slot.sourceReviewCriterionReady),
    sourceReviewControlsReady: slots.every((slot) => slot.sourceReviewControlReady),
    allSubmissionSlotsReady:
      slots.every((slot) => slot.readyForManualSignedApprovalDraftTextPackageSubmissionSlot),
    allComparisonControlsReady:
      controls.every((control) =>
        control.readyForManualSignedApprovalDraftTextPackageComparisonControl),
    allSubmissionRequirementsDeclared:
      slots.every((slot) => slot.submissionRequirement.length > 0),
    allComparisonQuestionsDeclared:
      slots.every((slot) => slot.comparisonQuestion.length > 0),
    allControlTextsDeclared: controls.every((control) => control.guardText.length > 0),
    allSourceReviewCriteriaReadOnly: slots.every((slot) => slot.sourceReviewCriterionReadOnly),
    allSourceReviewControlsReadOnly: slots.every((slot) => slot.sourceReviewControlReadOnly),
    allSubmissionSlotsReadOnly: slots.every((slot) => slot.readOnly),
    allComparisonControlsReadOnly: controls.every((control) => control.readOnly),
    allControlsRejectUnsubmittedSlots:
      controls.every((control) => control.rejectsUnsubmittedSlot),
    allControlsBlockDraftTextPackageSubmission:
      controls.every((control) => control.blocksDraftTextPackageSubmission),
    allControlsBlockDraftTextPackageComparison:
      controls.every((control) => control.blocksDraftTextPackageComparison),
    allControlsBlockDraftTextPackageAcceptance:
      controls.every((control) => control.blocksDraftTextPackageAcceptance),
    allControlsBlockSignedDraftText: controls.every((control) => control.blocksSignedDraftText),
    allControlsBlockSignaturePayload:
      controls.every((control) => control.blocksSignaturePayload),
    allControlsBlockApprovalGrant: controls.every((control) => control.blocksApprovalGrant),
    allControlsBlockRuntimePayload: controls.every((control) => control.blocksRuntimePayload),
    allControlsBlockWrites: controls.every((control) => control.blocksWrites),
    allControlsBlockSiblingMutation:
      controls.every((control) => control.blocksSiblingMutation),
    sourceReviewPreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest),
    sourceTextPackageIntakeDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest),
    sourceInstructionPreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest),
    sourceAuthoringReadinessDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest),
    sourceReviewPackageDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest),
    sourceDraftReadinessDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest),
    sourceDraftPreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest),
    sourceArtifactPreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactPreflightDigest),
    sourceCapturePreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceApprovalPacketReviewDigest),
    digestSubmissionSlotsReady:
      digestSlots.length === 5
      && digestSlots.every((slot) => slot.readyForManualSignedApprovalDraftTextPackageSubmissionSlot),
    sourceStillNoReviewedDraftTextPackage:
      preflight.reviewedDraftTextPackageCount === 0,
    sourceStillNoApprovedDraftTextPackage:
      preflight.approvedDraftTextPackageCount === 0,
    sourceStillNoRejectedDraftTextPackage:
      preflight.rejectedDraftTextPackageCount === 0,
    sourceStillNoSignedDraftText:
      preflight.signedDraftTextCount === 0 && !preflight.containsSecretValue,
    sourceStillNoSignaturePayload:
      preflight.draftSignaturePayloadCount === 0,
    sourceStillNoApprovalGrant: !preflight.approvalGrantPresent,
    submissionPreflightReadyButNoPackageSubmitted:
      preflight.readyForSignedApprovalArtifactDraftTextPackageReviewPreflight
      && slots.every((slot) =>
        slot.readyForManualSignedApprovalDraftTextPackageSubmissionSlot
        && !slot.submissionSlotMaterialized
        && !slot.draftTextPackageSubmitted
        && !slot.draftTextPackageCompared
        && !slot.draftTextPackageAccepted
        && !slot.draftTextPackageRejected
        && !slot.signedDraftTextPresent
        && !slot.draftSignaturePayloadPresent)
      && controls.every((control) =>
        control.readyForManualSignedApprovalDraftTextPackageComparisonControl),
    signedApprovalDraftStillDisabled:
      !preflight.readyForSignedApprovalArtifactDraft
      && slots.every((slot) => !slot.readyForSignedApprovalArtifactDraft)
      && controls.every((control) => !control.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !preflight.readyForSignedApprovalCapture
      && slots.every((slot) => !slot.readyForSignedApprovalCapture)
      && controls.every((control) => !control.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !preflight.readyForOperatorValueSupply
      && slots.every((slot) => !slot.readyForOperatorValueSupply)
      && controls.every((control) => !control.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !preflight.readyForEvidenceImport
      && slots.every((slot) => !slot.readyForEvidenceImport)
      && controls.every((control) => !control.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !preflight.readyForRuntimePayload
      && slots.every((slot) => !slot.readyForRuntimePayload)
      && controls.every((control) => !control.readyForRuntimePayload),
    liveExecutionStillBlocked: !preflight.readyForLiveExecution,
    productionExecutionStillBlocked: !preflight.readyForProductionExecution,
    noSideEffectsAllowed:
      !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && slots.every((slot) => !slot.writesAllowed && !slot.startsServices && !slot.mutatesSiblingState)
      && controls.every((control) =>
        !control.writesAllowed && !control.startsServices && !control.mutatesSiblingState),
    requiresManualArtifactSubmission: true,
    requiresSeparateComparisonReview: true,
    requiresDigestRecheckBeforeComparison: true,
    requiresSeparateApprovalGrantReview: true,
    nextStepRequiresOfflinePackageComparison: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightBlockedReasons(
  gates: SubmissionGates,
): string[] {
  return [
    gates.sourceReviewPreflightReady ? null : "SOURCE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_NOT_READY",
    gates.submissionSlotCountComplete ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SLOT_COUNT_INCOMPLETE",
    gates.comparisonControlCountComplete ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_CONTROL_COUNT_INCOMPLETE",
    gates.slotVersionsSequential ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SLOT_VERSIONS_NOT_SEQUENTIAL",
    gates.controlVersionsSequential ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_CONTROL_VERSIONS_NOT_SEQUENTIAL",
    gates.sourceReviewCriteriaReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_CRITERIA_NOT_READY",
    gates.sourceReviewControlsReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_CONTROLS_NOT_READY",
    gates.allSubmissionSlotsReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SLOTS_NOT_READY",
    gates.allComparisonControlsReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_CONTROLS_NOT_READY",
    gates.allSubmissionRequirementsDeclared ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_REQUIREMENTS_MISSING",
    gates.allComparisonQuestionsDeclared ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_QUESTIONS_MISSING",
    gates.allControlTextsDeclared ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_CONTROL_TEXTS_MISSING",
    gates.allSourceReviewCriteriaReadOnly ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_CRITERIA_NOT_READ_ONLY",
    gates.allSourceReviewControlsReadOnly ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_CONTROLS_NOT_READ_ONLY",
    gates.allSubmissionSlotsReadOnly ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SLOTS_NOT_READ_ONLY",
    gates.allComparisonControlsReadOnly ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_CONTROLS_NOT_READ_ONLY",
    gates.allControlsRejectUnsubmittedSlots ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_UNSUBMITTED_SLOT_NOT_REJECTED",
    gates.allControlsBlockDraftTextPackageSubmission ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_NOT_BLOCKED",
    gates.allControlsBlockDraftTextPackageComparison ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_NOT_BLOCKED",
    gates.allControlsBlockDraftTextPackageAcceptance ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_NOT_BLOCKED",
    gates.allControlsBlockSignedDraftText ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SIGNED_TEXT_NOT_BLOCKED",
    gates.allControlsBlockSignaturePayload ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SIGNATURE_PAYLOAD_NOT_BLOCKED",
    gates.allControlsBlockApprovalGrant ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_APPROVAL_GRANT_NOT_BLOCKED",
    gates.allControlsBlockRuntimePayload ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_RUNTIME_PAYLOAD_NOT_BLOCKED",
    gates.allControlsBlockWrites ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_WRITES_NOT_BLOCKED",
    gates.allControlsBlockSiblingMutation ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SIBLING_MUTATION_NOT_BLOCKED",
    gates.sourceReviewPreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_REVIEW_PREFLIGHT_DIGEST_MISSING",
    gates.sourceTextPackageIntakeDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_INTAKE_DIGEST_MISSING",
    gates.sourceInstructionPreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_INSTRUCTION_DIGEST_MISSING",
    gates.sourceAuthoringReadinessDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_AUTHORING_DIGEST_MISSING",
    gates.sourceReviewPackageDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_PACKAGE_DIGEST_MISSING",
    gates.sourceDraftReadinessDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_READINESS_DIGEST_MISSING",
    gates.sourceDraftPreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING",
    gates.sourceArtifactPreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_ARTIFACT_DIGEST_MISSING",
    gates.sourceCapturePreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_CAPTURE_DIGEST_MISSING",
    gates.sourceTemplateDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_TEMPLATE_DIGEST_MISSING",
    gates.sourceReviewDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SOURCE_REVIEW_DIGEST_MISSING",
    gates.digestSubmissionSlotsReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_DIGEST_SLOTS_NOT_READY",
    gates.sourceStillNoReviewedDraftTextPackage ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_REVIEWED_PACKAGE_PRESENT",
    gates.sourceStillNoApprovedDraftTextPackage ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_APPROVED_PACKAGE_PRESENT",
    gates.sourceStillNoRejectedDraftTextPackage ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_REJECTED_PACKAGE_PRESENT",
    gates.sourceStillNoSignedDraftText ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SIGNED_TEXT_PRESENT",
    gates.sourceStillNoSignaturePayload ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SIGNATURE_PAYLOAD_PRESENT",
    gates.sourceStillNoApprovalGrant ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_APPROVAL_GRANT_PRESENT",
    gates.submissionPreflightReadyButNoPackageSubmitted ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_NOT_READY_OR_SUBMITTED",
    gates.signedApprovalDraftStillDisabled ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SIGNED_DRAFT_ENABLED",
    gates.signedApprovalCaptureStillDisabled ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_CAPTURE_ENABLED",
    gates.operatorValueSupplyStillDisabled ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_OPERATOR_VALUE_SUPPLY_ENABLED",
    gates.evidenceImportStillBlocked ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_EVIDENCE_IMPORT_ENABLED",
    gates.runtimePayloadStillBlocked ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_RUNTIME_PAYLOAD_ENABLED",
    gates.liveExecutionStillBlocked ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PRODUCTION_EXECUTION_ENABLED",
    gates.noSideEffectsAllowed ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_SIDE_EFFECTS_ALLOWED",
    gates.requiresManualArtifactSubmission ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_MANUAL_SUBMISSION_NOT_REQUIRED",
    gates.requiresSeparateComparisonReview ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_REVIEW_NOT_REQUIRED",
    gates.requiresDigestRecheckBeforeComparison ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_DIGEST_RECHECK_NOT_REQUIRED",
    gates.requiresSeparateApprovalGrantReview ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_APPROVAL_GRANT_REVIEW_NOT_REQUIRED",
    gates.nextStepRequiresOfflinePackageComparison ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_NEXT_STEP_NOT_OFFLINE_COMPARISON",
  ].filter((reason): reason is string => reason !== null);
}
