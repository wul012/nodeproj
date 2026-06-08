import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoint,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuard,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";

type ComparisonPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight;
type Checkpoint =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoint;
type Guard =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuard;
type Gates =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGates;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGates(
  preflight: ComparisonPreflight,
  checkpoints: readonly Checkpoint[],
  guards: readonly Guard[],
): Gates {
  const expectedVersions = [
    ...CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_VERSIONS,
  ];
  const coveredLaneCodes = new Set<string>();
  const coveredControlCodes = new Set<string>();

  for (const checkpoint of checkpoints) {
    for (const lane of preflight.lanes) {
      if (checkpoint.sourceLaneKinds.includes(lane.kind) || checkpoint.sourceLaneModes.includes(lane.laneMode)) {
        coveredLaneCodes.add(lane.code);
      }
    }
    for (const control of preflight.controls) {
      if (checkpoint.sourceAcceptanceControlKinds.includes(control.kind)) {
        coveredControlCodes.add(control.code);
      }
    }
  }

  return {
    sourceComparisonPreflightReady:
      preflight.readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight,
    checkpointCountComplete: checkpoints.length === 10,
    guardCountComplete: guards.length === 10,
    checkpointVersionsSequential:
      checkpoints.map((checkpoint) => checkpoint.nodeVersion).join("|") === expectedVersions.join("|"),
    guardVersionsSequential:
      guards.map((guard) => guard.nodeVersion).join("|") === expectedVersions.join("|"),
    allCheckpointsReady:
      checkpoints.every((checkpoint) =>
        checkpoint.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint),
    allGuardsReady:
      guards.every((guard) => guard.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard),
    allCheckpointQuestionsDeclared:
      checkpoints.every((checkpoint) => checkpoint.acceptancePrecheckQuestion.length > 0),
    allRequiredAcceptanceEvidenceDeclared:
      checkpoints.every((checkpoint) => checkpoint.requiredAcceptanceEvidence.length > 0),
    allGuardTextsDeclared:
      guards.every((guard) => guard.guardText.length > 0),
    allSourceComparisonLanesCovered:
      coveredLaneCodes.size === preflight.lanes.length,
    allSourceAcceptanceControlsCovered:
      coveredControlCodes.size === preflight.controls.length,
    sourceComparisonLaneCountStillTwentyFive: preflight.comparisonLaneCount === 25,
    sourceAcceptanceControlCountStillTwentyFive: preflight.acceptanceControlCount === 25,
    sourceReadyComparisonLaneCountStillTwentyFive: preflight.readyComparisonLaneCount === 25,
    sourceReadyAcceptanceControlCountStillTwentyFive: preflight.readyAcceptanceControlCount === 25,
    digestCheckpointsCoverDigestLanes:
      checkpoints.some((checkpoint) =>
        checkpoint.kind === "digest-binding-acceptance-checkpoint"
        && checkpoint.sourceComparisonLaneCount === preflight.digestModeComparisonLaneCount
        && checkpoint.sourceAcceptanceControlCount === preflight.digestBindingAcceptanceControlCount),
    executionLockCheckpointCoversExecutionLocks:
      checkpoints.some((checkpoint) =>
        checkpoint.kind === "execution-lock-acceptance-checkpoint"
        && checkpoint.sourceComparisonLaneCount === preflight.executionLockComparisonLaneCount
        && checkpoint.sourceAcceptanceControlCount === preflight.executionLockAcceptanceControlCount),
    archiveCloseoutCheckpointPresent:
      checkpoints.some((checkpoint) =>
        checkpoint.kind === "archive-closeout-acceptance-checkpoint"
        && checkpoint.sourceComparisonLaneCount === preflight.archiveCloseoutComparisonLaneCount
        && checkpoint.sourceAcceptanceControlCount === preflight.archiveCloseoutAcceptanceControlCount),
    sourceComparisonPreflightDigestPresent:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest.length === 64,
    sourceSubmissionPreflightDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest.length === 64,
    sourceReviewPreflightDigestPresent:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest.length === 64,
    allCheckpointsReadOnly:
      checkpoints.every((checkpoint) =>
        checkpoint.readOnly && !checkpoint.writesAllowed && !checkpoint.startsServices && !checkpoint.mutatesSiblingState),
    allGuardsReadOnly:
      guards.every((guard) =>
        guard.readOnly && !guard.writesAllowed && !guard.startsServices && !guard.mutatesSiblingState),
    allGuardsRejectMissingAcceptanceEvidence:
      guards.every((guard) => guard.rejectsMissingAcceptanceEvidence),
    allGuardsBlockDraftTextPackageSubmission:
      guards.every((guard) => guard.blocksDraftTextPackageSubmission),
    allGuardsBlockDraftTextPackageComparison:
      guards.every((guard) => guard.blocksDraftTextPackageComparison),
    allGuardsBlockDraftTextPackageAcceptance:
      guards.every((guard) => guard.blocksDraftTextPackageAcceptance),
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
    sourceStillNoSubmittedDraftTextPackage: preflight.submittedDraftTextPackageCount === 0,
    sourceStillNoComparedDraftTextPackage: preflight.comparedDraftTextPackageCount === 0,
    sourceStillNoAcceptedDraftTextPackage: preflight.acceptedDraftTextPackageCount === 0,
    sourceStillNoRejectedDraftTextPackage: preflight.rejectedDraftTextPackageCount === 0,
    sourceStillNoSignedDraftText: preflight.signedDraftTextCount === 0,
    sourceStillNoSignaturePayload: preflight.draftSignaturePayloadCount === 0,
    sourceStillNoApprovalGrant: !preflight.approvalGrantPresent,
    acceptancePrecheckReadyButNoPackageAccepted:
      checkpoints.every((checkpoint) =>
        !checkpoint.acceptanceCheckpointMaterialized
        && !checkpoint.draftTextPackageSubmitted
        && !checkpoint.draftTextPackageCompared
        && !checkpoint.draftTextPackageAccepted
        && !checkpoint.draftTextPackageRejected),
    signedApprovalDraftStillDisabled:
      !preflight.readyForSignedApprovalArtifactDraft
      && checkpoints.every((checkpoint) => !checkpoint.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !preflight.readyForSignedApprovalCapture
      && checkpoints.every((checkpoint) => !checkpoint.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !preflight.readyForOperatorValueSupply
      && checkpoints.every((checkpoint) => !checkpoint.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !preflight.readyForEvidenceImport
      && checkpoints.every((checkpoint) => !checkpoint.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !preflight.readyForRuntimePayload
      && checkpoints.every((checkpoint) => !checkpoint.readyForRuntimePayload),
    liveExecutionStillBlocked: !preflight.readyForLiveExecution,
    productionExecutionStillBlocked: !preflight.readyForProductionExecution,
    noSideEffectsAllowed:
      !preflight.executionAllowed
      && !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && !preflight.importsRuntimePayload,
    requiresSubmittedPackageBeforeAcceptance:
      preflight.readyForManualSignedApprovalDraftTextPackageSubmission,
    requiresOfflinePackageComparisonBeforeAcceptance:
      preflight.readyForOfflineSignedApprovalDraftTextPackageComparison,
    requiresSeparateApprovalGrantReviewBeforeAcceptance:
      !preflight.approvalCaptured && !preflight.approvalGrantPresent,
    nextStepRequiresManualComparedPackageEvidence: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckBlockedReasons(
  gates: Gates,
): string[] {
  const blockedReasonCodes: string[] = [];
  const reasonByGate: Record<keyof Gates, string> = {
    sourceComparisonPreflightReady: "SOURCE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_NOT_READY",
    checkpointCountComplete: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_CHECKPOINTS_NOT_READY",
    guardCountComplete: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_NOT_READY",
    checkpointVersionsSequential: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_CHECKPOINT_VERSIONS_NOT_SEQUENTIAL",
    guardVersionsSequential: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARD_VERSIONS_NOT_SEQUENTIAL",
    allCheckpointsReady: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_CHECKPOINTS_BLOCKED",
    allGuardsReady: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_BLOCKED",
    allCheckpointQuestionsDeclared: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_QUESTIONS_NOT_DECLARED",
    allRequiredAcceptanceEvidenceDeclared: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_EVIDENCE_NOT_DECLARED",
    allGuardTextsDeclared: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARD_TEXTS_NOT_DECLARED",
    allSourceComparisonLanesCovered: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_LANES_NOT_COVERED",
    allSourceAcceptanceControlsCovered: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_CONTROLS_NOT_COVERED",
    sourceComparisonLaneCountStillTwentyFive: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_COMPARISON_LANE_COUNT_CHANGED",
    sourceAcceptanceControlCountStillTwentyFive: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ACCEPTANCE_CONTROL_COUNT_CHANGED",
    sourceReadyComparisonLaneCountStillTwentyFive: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_READY_COMPARISON_LANE_COUNT_CHANGED",
    sourceReadyAcceptanceControlCountStillTwentyFive: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_READY_ACCEPTANCE_CONTROL_COUNT_CHANGED",
    digestCheckpointsCoverDigestLanes: "ARTIFACT_DRAFT_TEXT_PACKAGE_DIGEST_ACCEPTANCE_PRECHECK_COVERAGE_MISSING",
    executionLockCheckpointCoversExecutionLocks: "ARTIFACT_DRAFT_TEXT_PACKAGE_EXECUTION_LOCK_ACCEPTANCE_PRECHECK_COVERAGE_MISSING",
    archiveCloseoutCheckpointPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_ARCHIVE_CLOSEOUT_ACCEPTANCE_PRECHECK_MISSING",
    sourceComparisonPreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_COMPARISON_PREFLIGHT_DIGEST_MISSING",
    sourceSubmissionPreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SUBMISSION_PREFLIGHT_DIGEST_MISSING",
    sourceReviewPreflightDigestPresent: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_REVIEW_PREFLIGHT_DIGEST_MISSING",
    allCheckpointsReadOnly: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_CHECKPOINTS_NOT_READ_ONLY",
    allGuardsReadOnly: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_NOT_READ_ONLY",
    allGuardsRejectMissingAcceptanceEvidence: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_MISSING_EVIDENCE",
    allGuardsBlockDraftTextPackageSubmission: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_SUBMISSION",
    allGuardsBlockDraftTextPackageComparison: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_COMPARISON",
    allGuardsBlockDraftTextPackageAcceptance: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_ACCEPTANCE",
    allGuardsBlockSignedDraftText: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_SIGNED_DRAFT_TEXT",
    allGuardsBlockSignaturePayload: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_SIGNATURE_PAYLOAD",
    allGuardsBlockApprovalGrant: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_APPROVAL_GRANT",
    allGuardsBlockRuntimePayload: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_RUNTIME_PAYLOAD",
    allGuardsBlockWrites: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_WRITES",
    allGuardsBlockSiblingMutation: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_GUARDS_ALLOW_SIBLING_MUTATION",
    sourceStillNoSubmittedDraftTextPackage: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ALREADY_SUBMITTED_PACKAGE",
    sourceStillNoComparedDraftTextPackage: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ALREADY_COMPARED_PACKAGE",
    sourceStillNoAcceptedDraftTextPackage: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ALREADY_ACCEPTED_PACKAGE",
    sourceStillNoRejectedDraftTextPackage: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ALREADY_REJECTED_PACKAGE",
    sourceStillNoSignedDraftText: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SIGNED_DRAFT_PRESENT",
    sourceStillNoSignaturePayload: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SIGNATURE_PAYLOAD_PRESENT",
    sourceStillNoApprovalGrant: "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_APPROVAL_GRANT_PRESENT",
    acceptancePrecheckReadyButNoPackageAccepted: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_ALREADY_MATERIALIZED",
    signedApprovalDraftStillDisabled: "ARTIFACT_DRAFT_TEXT_PACKAGE_SIGNED_APPROVAL_DRAFT_ENABLED_TOO_EARLY",
    signedApprovalCaptureStillDisabled: "ARTIFACT_DRAFT_TEXT_PACKAGE_SIGNED_APPROVAL_CAPTURE_ENABLED_TOO_EARLY",
    operatorValueSupplyStillDisabled: "ARTIFACT_DRAFT_TEXT_PACKAGE_OPERATOR_VALUE_SUPPLY_ENABLED_TOO_EARLY",
    evidenceImportStillBlocked: "ARTIFACT_DRAFT_TEXT_PACKAGE_EVIDENCE_IMPORT_ENABLED_TOO_EARLY",
    runtimePayloadStillBlocked: "ARTIFACT_DRAFT_TEXT_PACKAGE_RUNTIME_PAYLOAD_ENABLED_TOO_EARLY",
    liveExecutionStillBlocked: "ARTIFACT_DRAFT_TEXT_PACKAGE_LIVE_EXECUTION_ENABLED_TOO_EARLY",
    productionExecutionStillBlocked: "ARTIFACT_DRAFT_TEXT_PACKAGE_PRODUCTION_EXECUTION_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_PRECHECK_SIDE_EFFECTS_ENABLED",
    requiresSubmittedPackageBeforeAcceptance: "ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_REQUIREMENT_MISSING",
    requiresOfflinePackageComparisonBeforeAcceptance: "ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_REQUIREMENT_MISSING",
    requiresSeparateApprovalGrantReviewBeforeAcceptance: "ARTIFACT_DRAFT_TEXT_PACKAGE_APPROVAL_GRANT_REVIEW_REQUIREMENT_MISSING",
    nextStepRequiresManualComparedPackageEvidence: "ARTIFACT_DRAFT_TEXT_PACKAGE_NEXT_STEP_NOT_MANUAL_COMPARED_PACKAGE_EVIDENCE",
  };

  for (const [gate, passed] of Object.entries(gates) as [keyof Gates, boolean][]) {
    if (!passed) {
      blockedReasonCodes.push(reasonByGate[gate]);
    }
  }

  return blockedReasonCodes;
}
