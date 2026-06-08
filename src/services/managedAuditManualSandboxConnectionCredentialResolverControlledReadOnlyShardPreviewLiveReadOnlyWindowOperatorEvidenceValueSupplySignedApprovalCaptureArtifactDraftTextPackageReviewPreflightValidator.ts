import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterion,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;

type TextPackageIntake =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake;
type ReviewCriterion =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterion;
type ReviewControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControl;
type ReviewGates =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightGates;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightGates(
  intake: TextPackageIntake,
  criteria: readonly ReviewCriterion[],
  controls: readonly ReviewControl[],
): ReviewGates {
  const digestCriteria = criteria.filter((criterion) => criterion.criterionMode === "digest-review-pin");

  return {
    sourceTextPackageIntakeReady:
      intake.readyForSignedApprovalArtifactDraftTextPackageIntake,
    reviewCriterionCountComplete:
      criteria.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_VERSIONS.length,
    reviewControlCountComplete:
      controls.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_VERSIONS.length,
    criterionVersionsSequential: criteria.every((criterion, index) =>
      criterion.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_VERSIONS[index]),
    controlVersionsSequential: controls.every((control, index) =>
      control.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_VERSIONS[index]),
    sourceIntakeFieldsReady: criteria.every((criterion) => criterion.sourceIntakeFieldReady),
    sourceIntakeGuardsReady: criteria.every((criterion) => criterion.sourceIntakeGuardReady),
    allReviewCriteriaReady:
      criteria.every((criterion) =>
        criterion.readyForOfflineSignedApprovalDraftTextPackageReviewCriterion),
    allReviewControlsReady:
      controls.every((control) =>
        control.readyForOfflineSignedApprovalDraftTextPackageReviewControl),
    allReviewQuestionsDeclared: criteria.every((criterion) => criterion.reviewQuestion.length > 0),
    allReviewPurposesDeclared: criteria.every((criterion) => criterion.reviewPurpose.length > 0),
    allControlTextsDeclared: controls.every((control) => control.guardText.length > 0),
    allSourceIntakeFieldsReadOnly: criteria.every((criterion) => criterion.sourceIntakeFieldReadOnly),
    allSourceIntakeGuardsReadOnly: criteria.every((criterion) => criterion.sourceIntakeGuardReadOnly),
    allCriteriaReadOnly: criteria.every((criterion) => criterion.readOnly),
    allControlsReadOnly: controls.every((control) => control.readOnly),
    allControlsRejectUnreviewableCriteria:
      controls.every((control) => control.rejectsUnreviewableCriterion),
    allControlsBlockDraftTextPackageReview:
      controls.every((control) => control.blocksDraftTextPackageReview),
    allControlsBlockDraftTextPackageApproval:
      controls.every((control) => control.blocksDraftTextPackageApproval),
    allControlsBlockSignedDraftText: controls.every((control) => control.blocksSignedDraftText),
    allControlsBlockSignaturePayload:
      controls.every((control) => control.blocksSignaturePayload),
    allControlsBlockApprovalGrant: controls.every((control) => control.blocksApprovalGrant),
    allControlsBlockRuntimePayload: controls.every((control) => control.blocksRuntimePayload),
    allControlsBlockWrites: controls.every((control) => control.blocksWrites),
    allControlsBlockSiblingMutation:
      controls.every((control) => control.blocksSiblingMutation),
    sourceTextPackageIntakeDigestPresent:
      DIGEST_PATTERN.test(intake.signedApprovalCaptureArtifactDraftTextPackageIntakeDigest),
    sourceInstructionPreflightDigestPresent:
      DIGEST_PATTERN.test(intake.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest),
    sourceAuthoringReadinessDigestPresent:
      DIGEST_PATTERN.test(intake.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest),
    sourceReviewPackageDigestPresent:
      DIGEST_PATTERN.test(intake.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest),
    sourceDraftReadinessDigestPresent:
      DIGEST_PATTERN.test(intake.sourceSignedApprovalCaptureArtifactDraftReadinessDigest),
    sourceDraftPreflightDigestPresent:
      DIGEST_PATTERN.test(intake.sourceSignedApprovalCaptureArtifactDraftPreflightDigest),
    sourceArtifactPreflightDigestPresent:
      DIGEST_PATTERN.test(intake.sourceSignedApprovalCaptureArtifactPreflightDigest),
    sourceCapturePreflightDigestPresent:
      DIGEST_PATTERN.test(intake.sourceSignedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent:
      DIGEST_PATTERN.test(intake.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent:
      DIGEST_PATTERN.test(intake.sourceApprovalPacketReviewDigest),
    digestReviewCriteriaReady:
      digestCriteria.length === 5
      && digestCriteria.every((criterion) =>
        criterion.readyForOfflineSignedApprovalDraftTextPackageReviewCriterion),
    sourceStillNoActualDraftTextPackageFields:
      intake.actualDraftTextPackageFieldCount === 0,
    sourceStillNoAcceptedDraftTextPackage:
      intake.acceptedDraftTextPackageCount === 0,
    sourceStillNoSignedDraftText:
      intake.signedDraftTextCount === 0 && !intake.containsSecretValue,
    sourceStillNoSignaturePayload:
      intake.draftSignaturePayloadCount === 0,
    sourceStillNoApprovalGrant: !intake.approvalGrantPresent,
    reviewPreflightReadyButNoPackageReviewed:
      intake.readyForSignedApprovalArtifactDraftTextPackageIntake
      && criteria.every((criterion) =>
        criterion.readyForOfflineSignedApprovalDraftTextPackageReviewCriterion
        && !criterion.reviewCriterionMaterialized
        && !criterion.draftTextPackageReviewed
        && !criterion.draftTextPackageApproved
        && !criterion.draftTextPackageRejected
        && !criterion.signedDraftTextPresent
        && !criterion.draftSignaturePayloadPresent)
      && controls.every((control) =>
        control.readyForOfflineSignedApprovalDraftTextPackageReviewControl),
    signedApprovalDraftStillDisabled:
      !intake.readyForSignedApprovalArtifactDraft
      && criteria.every((criterion) => !criterion.readyForSignedApprovalArtifactDraft)
      && controls.every((control) => !control.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !intake.readyForSignedApprovalCapture
      && criteria.every((criterion) => !criterion.readyForSignedApprovalCapture)
      && controls.every((control) => !control.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !intake.readyForOperatorValueSupply
      && criteria.every((criterion) => !criterion.readyForOperatorValueSupply)
      && controls.every((control) => !control.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !intake.readyForEvidenceImport
      && criteria.every((criterion) => !criterion.readyForEvidenceImport)
      && controls.every((control) => !control.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !intake.readyForRuntimePayload
      && criteria.every((criterion) => !criterion.readyForRuntimePayload)
      && controls.every((control) => !control.readyForRuntimePayload),
    liveExecutionStillBlocked: !intake.readyForLiveExecution,
    productionExecutionStillBlocked: !intake.readyForProductionExecution,
    noSideEffectsAllowed:
      !intake.writeRoutingAllowed
      && !intake.startsServices
      && !intake.mutatesSiblingState
      && criteria.every((criterion) =>
        !criterion.writesAllowed && !criterion.startsServices && !criterion.mutatesSiblingState)
      && controls.every((control) =>
        !control.writesAllowed && !control.startsServices && !control.mutatesSiblingState),
    requiresOfflineArtifactReview: true,
    requiresSeparateHumanReviewer: true,
    requiresDigestRecheckBeforeReview: true,
    requiresSeparateApprovalGrantReview: true,
    nextStepRequiresManualArtifactSubmission: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightBlockedReasons(
  gates: ReviewGates,
): string[] {
  return [
    gates.sourceTextPackageIntakeReady ? null : "SOURCE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_NOT_READY",
    gates.reviewCriterionCountComplete ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CRITERION_COUNT_INCOMPLETE",
    gates.reviewControlCountComplete ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CONTROL_COUNT_INCOMPLETE",
    gates.criterionVersionsSequential ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CRITERION_VERSIONS_NOT_SEQUENTIAL",
    gates.controlVersionsSequential ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CONTROL_VERSIONS_NOT_SEQUENTIAL",
    gates.sourceIntakeFieldsReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_FIELDS_NOT_READY",
    gates.sourceIntakeGuardsReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_GUARDS_NOT_READY",
    gates.allReviewCriteriaReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CRITERIA_NOT_READY",
    gates.allReviewControlsReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CONTROLS_NOT_READY",
    gates.allReviewQuestionsDeclared ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_QUESTIONS_MISSING",
    gates.allReviewPurposesDeclared ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PURPOSES_MISSING",
    gates.allControlTextsDeclared ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CONTROL_TEXTS_MISSING",
    gates.allSourceIntakeFieldsReadOnly ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_FIELDS_NOT_READ_ONLY",
    gates.allSourceIntakeGuardsReadOnly ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_GUARDS_NOT_READ_ONLY",
    gates.allCriteriaReadOnly ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CRITERIA_NOT_READ_ONLY",
    gates.allControlsReadOnly ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CONTROLS_NOT_READ_ONLY",
    gates.allControlsRejectUnreviewableCriteria ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_UNREVIEWABLE_NOT_REJECTED",
    gates.allControlsBlockDraftTextPackageReview ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_NOT_BLOCKED",
    gates.allControlsBlockDraftTextPackageApproval ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_APPROVAL_NOT_BLOCKED",
    gates.allControlsBlockSignedDraftText ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SIGNED_TEXT_NOT_BLOCKED",
    gates.allControlsBlockSignaturePayload ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SIGNATURE_PAYLOAD_NOT_BLOCKED",
    gates.allControlsBlockApprovalGrant ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_APPROVAL_GRANT_NOT_BLOCKED",
    gates.allControlsBlockRuntimePayload ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_RUNTIME_PAYLOAD_NOT_BLOCKED",
    gates.allControlsBlockWrites ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_WRITES_NOT_BLOCKED",
    gates.allControlsBlockSiblingMutation ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SIBLING_MUTATION_NOT_BLOCKED",
    gates.sourceTextPackageIntakeDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_INTAKE_DIGEST_MISSING",
    gates.sourceInstructionPreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_INSTRUCTION_DIGEST_MISSING",
    gates.sourceAuthoringReadinessDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_AUTHORING_DIGEST_MISSING",
    gates.sourceReviewPackageDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_PACKAGE_DIGEST_MISSING",
    gates.sourceDraftReadinessDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_READINESS_DIGEST_MISSING",
    gates.sourceDraftPreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING",
    gates.sourceArtifactPreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_ARTIFACT_DIGEST_MISSING",
    gates.sourceCapturePreflightDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_CAPTURE_DIGEST_MISSING",
    gates.sourceTemplateDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_TEMPLATE_DIGEST_MISSING",
    gates.sourceReviewDigestPresent ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_REVIEW_DIGEST_MISSING",
    gates.digestReviewCriteriaReady ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_DIGEST_CRITERIA_NOT_READY",
    gates.sourceStillNoActualDraftTextPackageFields ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_FIELDS_PRESENT",
    gates.sourceStillNoAcceptedDraftTextPackage ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_PACKAGE_ACCEPTED",
    gates.sourceStillNoSignedDraftText ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_SIGNED_TEXT_PRESENT",
    gates.sourceStillNoSignaturePayload ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_SIGNATURE_PAYLOAD_PRESENT",
    gates.sourceStillNoApprovalGrant ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SOURCE_APPROVAL_GRANT_PRESENT",
    gates.reviewPreflightReadyButNoPackageReviewed ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_NOT_READY_OR_REVIEWED",
    gates.signedApprovalDraftStillDisabled ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SIGNED_DRAFT_ENABLED",
    gates.signedApprovalCaptureStillDisabled ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_CAPTURE_ENABLED",
    gates.operatorValueSupplyStillDisabled ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_OPERATOR_VALUE_SUPPLY_ENABLED",
    gates.evidenceImportStillBlocked ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_EVIDENCE_IMPORT_ENABLED",
    gates.runtimePayloadStillBlocked ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_RUNTIME_PAYLOAD_ENABLED",
    gates.liveExecutionStillBlocked ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PRODUCTION_EXECUTION_ENABLED",
    gates.noSideEffectsAllowed ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SIDE_EFFECTS_ALLOWED",
    gates.requiresOfflineArtifactReview ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_OFFLINE_REVIEW_NOT_REQUIRED",
    gates.requiresSeparateHumanReviewer ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_SEPARATE_REVIEWER_NOT_REQUIRED",
    gates.requiresDigestRecheckBeforeReview ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_DIGEST_RECHECK_NOT_REQUIRED",
    gates.requiresSeparateApprovalGrantReview ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_APPROVAL_GRANT_REVIEW_NOT_REQUIRED",
    gates.nextStepRequiresManualArtifactSubmission ? null : "ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_NEXT_STEP_NOT_MANUAL_SUBMISSION",
  ].filter((reason): reason is string => reason !== null);
}
