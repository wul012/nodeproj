import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";

type SubmissionPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight;
type ComparisonLane =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane;
type AcceptanceControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl;
type Gates =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightGates;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightGates(
  preflight: SubmissionPreflight,
  lanes: readonly ComparisonLane[],
  controls: readonly AcceptanceControl[],
): Gates {
  const expectedVersions = [...CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_VERSIONS];

  return {
    sourceSubmissionPreflightReady:
      preflight.readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight,
    comparisonLaneCountComplete: lanes.length === 25,
    acceptanceControlCountComplete: controls.length === 25,
    laneVersionsSequential:
      lanes.map((lane) => lane.nodeVersion).join("|") === expectedVersions.join("|"),
    controlVersionsSequential:
      controls.map((control) => control.nodeVersion).join("|") === expectedVersions.join("|"),
    sourceSubmissionSlotsReady:
      lanes.every((lane) => lane.sourceSubmissionSlotReady),
    sourceComparisonControlsReady:
      lanes.every((lane) => lane.sourceComparisonControlReady),
    allComparisonLanesReady:
      lanes.every((lane) => lane.readyForOfflineSignedApprovalDraftTextPackageComparisonLane),
    allAcceptanceControlsReady:
      controls.every((control) => control.readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl),
    allRequiredComparisonEvidenceDeclared:
      lanes.every((lane) => lane.requiredComparisonEvidence.length > 0),
    allDigestRecheckQuestionsDeclared:
      lanes.every((lane) => lane.digestRecheckQuestion.length > 0),
    allAcceptanceQuestionsDeclared:
      lanes.every((lane) => lane.acceptanceQuestion.length > 0),
    allControlTextsDeclared:
      controls.every((control) => control.guardText.length > 0),
    allSourceSubmissionSlotsReadOnly:
      lanes.every((lane) => lane.sourceSubmissionSlotReadOnly),
    allSourceComparisonControlsReadOnly:
      lanes.every((lane) => lane.sourceComparisonControlReadOnly),
    allComparisonLanesReadOnly:
      lanes.every((lane) => lane.readOnly && !lane.writesAllowed && !lane.startsServices && !lane.mutatesSiblingState),
    allAcceptanceControlsReadOnly:
      controls.every((control) =>
        control.readOnly && !control.writesAllowed && !control.startsServices && !control.mutatesSiblingState),
    allControlsRejectUncomparedLanes:
      controls.every((control) => control.rejectsUncomparedLane),
    allControlsBlockDraftTextPackageSubmission:
      controls.every((control) => control.blocksDraftTextPackageSubmission),
    allControlsBlockDraftTextPackageComparison:
      controls.every((control) => control.blocksDraftTextPackageComparison),
    allControlsBlockDraftTextPackageAcceptance:
      controls.every((control) => control.blocksDraftTextPackageAcceptance),
    allControlsBlockSignedDraftText:
      controls.every((control) => control.blocksSignedDraftText),
    allControlsBlockSignaturePayload:
      controls.every((control) => control.blocksSignaturePayload),
    allControlsBlockApprovalGrant:
      controls.every((control) => control.blocksApprovalGrant),
    allControlsBlockRuntimePayload:
      controls.every((control) => control.blocksRuntimePayload),
    allControlsBlockWrites:
      controls.every((control) => control.blocksWrites),
    allControlsBlockSiblingMutation:
      controls.every((control) => control.blocksSiblingMutation),
    sourceSubmissionPreflightDigestPresent:
      preflight.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest.length === 64,
    sourceReviewPreflightDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest.length === 64,
    sourceTextPackageIntakeDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest.length === 64,
    sourceInstructionPreflightDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest.length === 64,
    sourceAuthoringReadinessDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest.length === 64,
    sourceReviewPackageDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest.length === 64,
    sourceDraftReadinessDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest.length === 64,
    sourceDraftPreflightDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest.length === 64,
    sourceArtifactPreflightDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactPreflightDigest.length === 64,
    sourceCapturePreflightDigestPresent:
      preflight.sourceSignedApprovalCapturePreflightDigest.length === 64,
    sourceTemplateDigestPresent:
      preflight.sourceSignedApprovalTemplateDigest.length === 64,
    sourceReviewDigestPresent:
      preflight.sourceApprovalPacketReviewDigest.length === 64,
    digestComparisonLanesReady:
      lanes.filter((lane) => lane.laneMode === "digest-recheck-lane")
        .every((lane) => lane.readyForOfflineSignedApprovalDraftTextPackageComparisonLane),
    sourceStillNoSubmittedDraftTextPackage:
      preflight.submittedDraftTextPackageCount === 0
      && lanes.every((lane) => !lane.sourceDraftTextPackageSubmitted),
    sourceStillNoComparedDraftTextPackage:
      preflight.comparedDraftTextPackageCount === 0
      && lanes.every((lane) => !lane.sourceDraftTextPackageCompared),
    sourceStillNoAcceptedDraftTextPackage:
      preflight.acceptedDraftTextPackageCount === 0
      && lanes.every((lane) => !lane.sourceDraftTextPackageAccepted),
    sourceStillNoRejectedDraftTextPackage:
      preflight.rejectedDraftTextPackageCount === 0
      && lanes.every((lane) => !lane.sourceDraftTextPackageRejected),
    sourceStillNoSignedDraftText:
      preflight.signedDraftTextCount === 0
      && lanes.every((lane) => !lane.sourceSignedDraftTextPresent),
    sourceStillNoSignaturePayload:
      preflight.draftSignaturePayloadCount === 0
      && lanes.every((lane) => !lane.sourceDraftSignaturePayloadPresent),
    sourceStillNoApprovalGrant:
      !preflight.approvalGrantPresent
      && lanes.every((lane) => !lane.sourceApprovalGrantPresent),
    comparisonPreflightReadyButNoPackageCompared:
      lanes.every((lane) =>
        !lane.comparisonLaneMaterialized
        && !lane.draftTextPackageSubmitted
        && !lane.draftTextPackageCompared
        && !lane.draftTextPackageAccepted
        && !lane.draftTextPackageRejected),
    signedApprovalDraftStillDisabled:
      !preflight.readyForSignedApprovalArtifactDraft
      && lanes.every((lane) => !lane.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !preflight.readyForSignedApprovalCapture
      && lanes.every((lane) => !lane.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !preflight.readyForOperatorValueSupply
      && lanes.every((lane) => !lane.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !preflight.readyForEvidenceImport
      && lanes.every((lane) => !lane.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !preflight.readyForRuntimePayload
      && lanes.every((lane) => !lane.readyForRuntimePayload),
    liveExecutionStillBlocked: !preflight.readyForLiveExecution,
    productionExecutionStillBlocked: !preflight.readyForProductionExecution,
    noSideEffectsAllowed:
      !preflight.executionAllowed
      && !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && !preflight.importsRuntimePayload,
    requiresManualArtifactSubmission:
      preflight.readyForManualSignedApprovalDraftTextPackageSubmission,
    requiresOfflinePackageComparison:
      preflight.readyForOfflineSignedApprovalDraftTextPackageComparison,
    requiresDigestRecheckBeforeAcceptance:
      lanes.filter((lane) => lane.laneMode === "digest-recheck-lane").length === 5,
    requiresSeparateApprovalGrantReview:
      !preflight.approvalCaptured && !preflight.approvalGrantPresent,
    nextStepRequiresSubmittedPackageComparison: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightBlockedReasons(
  gates: Gates,
): string[] {
  const blockedReasonCodes: string[] = [];
  const reasonByGate: Record<keyof Gates, string> = {
    sourceSubmissionPreflightReady: "SOURCE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_NOT_READY",
    comparisonLaneCountComplete: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_LANES_NOT_READY",
    acceptanceControlCountComplete: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_NOT_READY",
    laneVersionsSequential: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_LANE_VERSIONS_NOT_SEQUENTIAL",
    controlVersionsSequential: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROL_VERSIONS_NOT_SEQUENTIAL",
    sourceSubmissionSlotsReady: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_SOURCE_SUBMISSION_SLOTS_NOT_READY",
    sourceComparisonControlsReady: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_SOURCE_CONTROLS_NOT_READY",
    allComparisonLanesReady: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_LANES_BLOCKED",
    allAcceptanceControlsReady: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_BLOCKED",
    allRequiredComparisonEvidenceDeclared: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_EVIDENCE_NOT_DECLARED",
    allDigestRecheckQuestionsDeclared: "ARTIFACT_DRAFT_TEXT_PACKAGE_DIGEST_RECHECK_QUESTIONS_NOT_DECLARED",
    allAcceptanceQuestionsDeclared: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_QUESTIONS_NOT_DECLARED",
    allControlTextsDeclared: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROL_TEXTS_NOT_DECLARED",
    allSourceSubmissionSlotsReadOnly: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SUBMISSION_SLOTS_NOT_READ_ONLY",
    allSourceComparisonControlsReadOnly: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_COMPARISON_CONTROLS_NOT_READ_ONLY",
    allComparisonLanesReadOnly: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_LANES_NOT_READ_ONLY",
    allAcceptanceControlsReadOnly: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_NOT_READ_ONLY",
    allControlsRejectUncomparedLanes: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_DO_NOT_REJECT_UNCOMPARED_LANES",
    allControlsBlockDraftTextPackageSubmission: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_SUBMISSION",
    allControlsBlockDraftTextPackageComparison: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_COMPARISON",
    allControlsBlockDraftTextPackageAcceptance: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_ACCEPTANCE",
    allControlsBlockSignedDraftText: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_SIGNED_DRAFT_TEXT",
    allControlsBlockSignaturePayload: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_SIGNATURE_PAYLOAD",
    allControlsBlockApprovalGrant: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_APPROVAL_GRANT",
    allControlsBlockRuntimePayload: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_RUNTIME_PAYLOAD",
    allControlsBlockWrites: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_WRITES",
    allControlsBlockSiblingMutation: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_CONTROLS_ALLOW_SIBLING_MUTATION",
    sourceSubmissionPreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SUBMISSION_PREFLIGHT_DIGEST_MISSING",
    sourceReviewPreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_REVIEW_PREFLIGHT_DIGEST_MISSING",
    sourceTextPackageIntakeDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_INTAKE_DIGEST_MISSING",
    sourceInstructionPreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_INSTRUCTION_DIGEST_MISSING",
    sourceAuthoringReadinessDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_AUTHORING_DIGEST_MISSING",
    sourceReviewPackageDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_REVIEW_PACKAGE_DIGEST_MISSING",
    sourceDraftReadinessDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_DRAFT_READINESS_DIGEST_MISSING",
    sourceDraftPreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING",
    sourceArtifactPreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ARTIFACT_PREFLIGHT_DIGEST_MISSING",
    sourceCapturePreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_CAPTURE_PREFLIGHT_DIGEST_MISSING",
    sourceTemplateDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_TEMPLATE_DIGEST_MISSING",
    sourceReviewDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_REVIEW_DIGEST_MISSING",
    digestComparisonLanesReady: "ARTIFACT_DRAFT_TEXT_PACKAGE_DIGEST_COMPARISON_LANES_NOT_READY",
    sourceStillNoSubmittedDraftTextPackage: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ALREADY_SUBMITTED_PACKAGE",
    sourceStillNoComparedDraftTextPackage: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ALREADY_COMPARED_PACKAGE",
    sourceStillNoAcceptedDraftTextPackage: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ALREADY_ACCEPTED_PACKAGE",
    sourceStillNoRejectedDraftTextPackage: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ALREADY_REJECTED_PACKAGE",
    sourceStillNoSignedDraftText: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SIGNED_DRAFT_PRESENT",
    sourceStillNoSignaturePayload: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SIGNATURE_PAYLOAD_PRESENT",
    sourceStillNoApprovalGrant: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_APPROVAL_GRANT_PRESENT",
    comparisonPreflightReadyButNoPackageCompared: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_ALREADY_MATERIALIZED",
    signedApprovalDraftStillDisabled: "ARTIFACT_DRAFT_TEXT_PACKAGE_SIGNED_APPROVAL_DRAFT_ENABLED_TOO_EARLY",
    signedApprovalCaptureStillDisabled: "ARTIFACT_DRAFT_TEXT_PACKAGE_SIGNED_APPROVAL_CAPTURE_ENABLED_TOO_EARLY",
    operatorValueSupplyStillDisabled: "ARTIFACT_DRAFT_TEXT_PACKAGE_OPERATOR_VALUE_SUPPLY_ENABLED_TOO_EARLY",
    evidenceImportStillBlocked: "ARTIFACT_DRAFT_TEXT_PACKAGE_EVIDENCE_IMPORT_ENABLED_TOO_EARLY",
    runtimePayloadStillBlocked: "ARTIFACT_DRAFT_TEXT_PACKAGE_RUNTIME_PAYLOAD_ENABLED_TOO_EARLY",
    liveExecutionStillBlocked: "ARTIFACT_DRAFT_TEXT_PACKAGE_LIVE_EXECUTION_ENABLED_TOO_EARLY",
    productionExecutionStillBlocked: "ARTIFACT_DRAFT_TEXT_PACKAGE_PRODUCTION_EXECUTION_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_SIDE_EFFECTS_ENABLED",
    requiresManualArtifactSubmission: "ARTIFACT_DRAFT_TEXT_PACKAGE_MANUAL_SUBMISSION_REQUIREMENT_MISSING",
    requiresOfflinePackageComparison: "ARTIFACT_DRAFT_TEXT_PACKAGE_OFFLINE_COMPARISON_REQUIREMENT_MISSING",
    requiresDigestRecheckBeforeAcceptance: "ARTIFACT_DRAFT_TEXT_PACKAGE_DIGEST_RECHECK_REQUIREMENT_MISSING",
    requiresSeparateApprovalGrantReview: "ARTIFACT_DRAFT_TEXT_PACKAGE_APPROVAL_GRANT_REVIEW_REQUIREMENT_MISSING",
    nextStepRequiresSubmittedPackageComparison: "ARTIFACT_DRAFT_TEXT_PACKAGE_NEXT_STEP_NOT_COMPARISON",
  };

  for (const [gate, passed] of Object.entries(gates) as [keyof Gates, boolean][]) {
    if (!passed) {
      blockedReasonCodes.push(reasonByGate[gate]);
    }
  }

  return blockedReasonCodes;
}
