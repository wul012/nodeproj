import { renderEntries } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageSubmissionProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return [
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Intake",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageIntakeProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Review Preflight",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Submission Preflight",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Comparison Preflight",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Comparison Acceptance Precheck",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
    ),
    "",
  ];
}

function renderSignedApprovalCaptureArtifactDraftTextPackageIntakeProfileEntries(
  intake:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageIntakeVersion,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion:
      intake.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion,
    artifactDraftTextPackageIntakeState: intake.artifactDraftTextPackageIntakeState,
    readyForSignedApprovalArtifactDraftTextPackageIntake:
      intake.readyForSignedApprovalArtifactDraftTextPackageIntake,
    readyForHumanSignedApprovalDraftTextPackageSubmission:
      intake.readyForHumanSignedApprovalDraftTextPackageSubmission,
    readyForHumanSignedApprovalDraftInstructionAuthoring:
      intake.readyForHumanSignedApprovalDraftInstructionAuthoring,
    readyForSignedApprovalArtifactDraft: intake.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: intake.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: intake.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: intake.readyForOperatorValueSubmission,
    readyForEvidenceImport: intake.readyForEvidenceImport,
    readyForRuntimePayload: intake.readyForRuntimePayload,
    intakeFieldCount: intake.intakeFieldCount,
    intakeGuardCount: intake.intakeGuardCount,
    identityIntakeFieldCount: intake.identityIntakeFieldCount,
    digestBindingIntakeFieldCount: intake.digestBindingIntakeFieldCount,
    signatureEnvelopeIntakeFieldCount: intake.signatureEnvelopeIntakeFieldCount,
    sourceEvidenceIntakeFieldCount: intake.sourceEvidenceIntakeFieldCount,
    valueBindingIntakeFieldCount: intake.valueBindingIntakeFieldCount,
    policyIntakeFieldCount: intake.policyIntakeFieldCount,
    executionLockIntakeFieldCount: intake.executionLockIntakeFieldCount,
    archiveCloseoutIntakeFieldCount: intake.archiveCloseoutIntakeFieldCount,
    digestModeIntakeFieldCount: intake.digestModeIntakeFieldCount,
    readyIntakeFieldCount: intake.readyIntakeFieldCount,
    readyIntakeGuardCount: intake.readyIntakeGuardCount,
    digestBindingIntakeGuardCount: intake.digestBindingIntakeGuardCount,
    signatureEnvelopeIntakeGuardCount: intake.signatureEnvelopeIntakeGuardCount,
    policyIntakeGuardCount: intake.policyIntakeGuardCount,
    executionLockIntakeGuardCount: intake.executionLockIntakeGuardCount,
    archiveCloseoutIntakeGuardCount: intake.archiveCloseoutIntakeGuardCount,
    expectedDraftTextPackageFieldCount: intake.expectedDraftTextPackageFieldCount,
    actualDraftTextPackageFieldCount: intake.actualDraftTextPackageFieldCount,
    acceptedDraftTextPackageCount: intake.acceptedDraftTextPackageCount,
    draftInstructionMaterializedCount: intake.draftInstructionMaterializedCount,
    draftArtifactCreated: intake.draftArtifactCreated,
    signedDraftTextCount: intake.signedDraftTextCount,
    draftSignaturePayloadCount: intake.draftSignaturePayloadCount,
    approvalCaptured: intake.approvalCaptured,
    approvalGrantPresent: intake.approvalGrantPresent,
    signedApprovalPresent: intake.signedApprovalPresent,
    gateCount: intake.gateCount,
    passedGateCount: intake.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    importsRuntimePayload: intake.importsRuntimePayload,
    acceptsSyntheticEvidence: intake.acceptsSyntheticEvidence,
    containsSecretValue: intake.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion,
    artifactDraftTextPackageReviewPreflightState:
      preflight.artifactDraftTextPackageReviewPreflightState,
    readyForSignedApprovalArtifactDraftTextPackageReviewPreflight:
      preflight.readyForSignedApprovalArtifactDraftTextPackageReviewPreflight,
    readyForOfflineSignedApprovalDraftTextPackageReview:
      preflight.readyForOfflineSignedApprovalDraftTextPackageReview,
    readyForHumanSignedApprovalDraftTextPackageSubmission:
      preflight.readyForHumanSignedApprovalDraftTextPackageSubmission,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    reviewCriterionCount: preflight.reviewCriterionCount,
    reviewControlCount: preflight.reviewControlCount,
    identityReviewCriterionCount: preflight.identityReviewCriterionCount,
    digestBindingReviewCriterionCount: preflight.digestBindingReviewCriterionCount,
    signatureEnvelopeReviewCriterionCount: preflight.signatureEnvelopeReviewCriterionCount,
    sourceEvidenceReviewCriterionCount: preflight.sourceEvidenceReviewCriterionCount,
    valueBindingReviewCriterionCount: preflight.valueBindingReviewCriterionCount,
    policyReviewCriterionCount: preflight.policyReviewCriterionCount,
    executionLockReviewCriterionCount: preflight.executionLockReviewCriterionCount,
    archiveCloseoutReviewCriterionCount: preflight.archiveCloseoutReviewCriterionCount,
    digestModeReviewCriterionCount: preflight.digestModeReviewCriterionCount,
    readyReviewCriterionCount: preflight.readyReviewCriterionCount,
    readyReviewControlCount: preflight.readyReviewControlCount,
    digestBindingReviewControlCount: preflight.digestBindingReviewControlCount,
    signatureEnvelopeReviewControlCount: preflight.signatureEnvelopeReviewControlCount,
    policyReviewControlCount: preflight.policyReviewControlCount,
    executionLockReviewControlCount: preflight.executionLockReviewControlCount,
    archiveCloseoutReviewControlCount: preflight.archiveCloseoutReviewControlCount,
    expectedDraftTextPackageFieldCount: preflight.expectedDraftTextPackageFieldCount,
    actualDraftTextPackageFieldCount: preflight.actualDraftTextPackageFieldCount,
    acceptedDraftTextPackageCount: preflight.acceptedDraftTextPackageCount,
    reviewedDraftTextPackageCount: preflight.reviewedDraftTextPackageCount,
    approvedDraftTextPackageCount: preflight.approvedDraftTextPackageCount,
    rejectedDraftTextPackageCount: preflight.rejectedDraftTextPackageCount,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion,
    artifactDraftTextPackageSubmissionPreflightState:
      preflight.artifactDraftTextPackageSubmissionPreflightState,
    readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight:
      preflight.readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight,
    readyForManualSignedApprovalDraftTextPackageSubmission:
      preflight.readyForManualSignedApprovalDraftTextPackageSubmission,
    readyForOfflineSignedApprovalDraftTextPackageComparison:
      preflight.readyForOfflineSignedApprovalDraftTextPackageComparison,
    readyForOfflineSignedApprovalDraftTextPackageReview:
      preflight.readyForOfflineSignedApprovalDraftTextPackageReview,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    submissionSlotCount: preflight.submissionSlotCount,
    comparisonControlCount: preflight.comparisonControlCount,
    identitySubmissionSlotCount: preflight.identitySubmissionSlotCount,
    digestBindingSubmissionSlotCount: preflight.digestBindingSubmissionSlotCount,
    signatureEnvelopeSubmissionSlotCount: preflight.signatureEnvelopeSubmissionSlotCount,
    sourceEvidenceSubmissionSlotCount: preflight.sourceEvidenceSubmissionSlotCount,
    valueBindingSubmissionSlotCount: preflight.valueBindingSubmissionSlotCount,
    policySubmissionSlotCount: preflight.policySubmissionSlotCount,
    executionLockSubmissionSlotCount: preflight.executionLockSubmissionSlotCount,
    archiveCloseoutSubmissionSlotCount: preflight.archiveCloseoutSubmissionSlotCount,
    digestModeSubmissionSlotCount: preflight.digestModeSubmissionSlotCount,
    readySubmissionSlotCount: preflight.readySubmissionSlotCount,
    readyComparisonControlCount: preflight.readyComparisonControlCount,
    digestBindingComparisonControlCount: preflight.digestBindingComparisonControlCount,
    signatureEnvelopeComparisonControlCount: preflight.signatureEnvelopeComparisonControlCount,
    policyComparisonControlCount: preflight.policyComparisonControlCount,
    executionLockComparisonControlCount: preflight.executionLockComparisonControlCount,
    archiveCloseoutComparisonControlCount: preflight.archiveCloseoutComparisonControlCount,
    expectedDraftTextPackageSubmissionSlotCount:
      preflight.expectedDraftTextPackageSubmissionSlotCount,
    actualDraftTextPackageSubmissionCount: preflight.actualDraftTextPackageSubmissionCount,
    submittedDraftTextPackageCount: preflight.submittedDraftTextPackageCount,
    comparedDraftTextPackageCount: preflight.comparedDraftTextPackageCount,
    acceptedDraftTextPackageCount: preflight.acceptedDraftTextPackageCount,
    rejectedDraftTextPackageCount: preflight.rejectedDraftTextPackageCount,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion,
    artifactDraftTextPackageComparisonPreflightState:
      preflight.artifactDraftTextPackageComparisonPreflightState,
    readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight:
      preflight.readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight,
    readyForOfflineSignedApprovalDraftTextPackageComparison:
      preflight.readyForOfflineSignedApprovalDraftTextPackageComparison,
    readyForManualSignedApprovalDraftTextPackageSubmission:
      preflight.readyForManualSignedApprovalDraftTextPackageSubmission,
    readyForOfflineSignedApprovalDraftTextPackageReview:
      preflight.readyForOfflineSignedApprovalDraftTextPackageReview,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    comparisonLaneCount: preflight.comparisonLaneCount,
    acceptanceControlCount: preflight.acceptanceControlCount,
    identityComparisonLaneCount: preflight.identityComparisonLaneCount,
    digestBindingComparisonLaneCount: preflight.digestBindingComparisonLaneCount,
    signatureEnvelopeComparisonLaneCount: preflight.signatureEnvelopeComparisonLaneCount,
    sourceEvidenceComparisonLaneCount: preflight.sourceEvidenceComparisonLaneCount,
    valueBindingComparisonLaneCount: preflight.valueBindingComparisonLaneCount,
    policyComparisonLaneCount: preflight.policyComparisonLaneCount,
    executionLockComparisonLaneCount: preflight.executionLockComparisonLaneCount,
    archiveCloseoutComparisonLaneCount: preflight.archiveCloseoutComparisonLaneCount,
    digestModeComparisonLaneCount: preflight.digestModeComparisonLaneCount,
    readyComparisonLaneCount: preflight.readyComparisonLaneCount,
    readyAcceptanceControlCount: preflight.readyAcceptanceControlCount,
    digestBindingAcceptanceControlCount: preflight.digestBindingAcceptanceControlCount,
    signatureEnvelopeAcceptanceControlCount: preflight.signatureEnvelopeAcceptanceControlCount,
    policyAcceptanceControlCount: preflight.policyAcceptanceControlCount,
    executionLockAcceptanceControlCount: preflight.executionLockAcceptanceControlCount,
    archiveCloseoutAcceptanceControlCount: preflight.archiveCloseoutAcceptanceControlCount,
    expectedDraftTextPackageComparisonLaneCount:
      preflight.expectedDraftTextPackageComparisonLaneCount,
    actualDraftTextPackageComparisonCount: preflight.actualDraftTextPackageComparisonCount,
    submittedDraftTextPackageCount: preflight.submittedDraftTextPackageCount,
    comparedDraftTextPackageCount: preflight.comparedDraftTextPackageCount,
    acceptedDraftTextPackageCount: preflight.acceptedDraftTextPackageCount,
    rejectedDraftTextPackageCount: preflight.rejectedDraftTextPackageCount,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckProfileEntries(
  precheck:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion:
      precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion,
    artifactDraftTextPackageComparisonAcceptancePrecheckState:
      precheck.artifactDraftTextPackageComparisonAcceptancePrecheckState,
    readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck:
      precheck.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck:
      precheck.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageComparison:
      precheck.readyForOfflineSignedApprovalDraftTextPackageComparison,
    readyForManualSignedApprovalDraftTextPackageSubmission:
      precheck.readyForManualSignedApprovalDraftTextPackageSubmission,
    readyForSignedApprovalArtifactDraft: precheck.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: precheck.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: precheck.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: precheck.readyForOperatorValueSubmission,
    readyForEvidenceImport: precheck.readyForEvidenceImport,
    readyForRuntimePayload: precheck.readyForRuntimePayload,
    checkpointCount: precheck.checkpointCount,
    guardCount: precheck.guardCount,
    sourceComparisonLaneCount: precheck.sourceComparisonLaneCount,
    sourceAcceptanceControlCount: precheck.sourceAcceptanceControlCount,
    readyCheckpointCount: precheck.readyCheckpointCount,
    readyGuardCount: precheck.readyGuardCount,
    sourceReadinessCheckpointCount: precheck.sourceReadinessCheckpointCount,
    identityCheckpointCount: precheck.identityCheckpointCount,
    digestBindingCheckpointCount: precheck.digestBindingCheckpointCount,
    signatureEnvelopeCheckpointCount: precheck.signatureEnvelopeCheckpointCount,
    sourceEvidenceCheckpointCount: precheck.sourceEvidenceCheckpointCount,
    operatorValueCheckpointCount: precheck.operatorValueCheckpointCount,
    policyCheckpointCount: precheck.policyCheckpointCount,
    executionLockCheckpointCount: precheck.executionLockCheckpointCount,
    approvalGrantReviewCheckpointCount: precheck.approvalGrantReviewCheckpointCount,
    archiveCloseoutCheckpointCount: precheck.archiveCloseoutCheckpointCount,
    expectedDraftTextPackageAcceptanceCheckpointCount:
      precheck.expectedDraftTextPackageAcceptanceCheckpointCount,
    actualDraftTextPackageAcceptanceEvidenceCount:
      precheck.actualDraftTextPackageAcceptanceEvidenceCount,
    submittedDraftTextPackageCount: precheck.submittedDraftTextPackageCount,
    comparedDraftTextPackageCount: precheck.comparedDraftTextPackageCount,
    acceptedDraftTextPackageCount: precheck.acceptedDraftTextPackageCount,
    rejectedDraftTextPackageCount: precheck.rejectedDraftTextPackageCount,
    signedDraftTextCount: precheck.signedDraftTextCount,
    draftSignaturePayloadCount: precheck.draftSignaturePayloadCount,
    approvalCaptured: precheck.approvalCaptured,
    approvalGrantPresent: precheck.approvalGrantPresent,
    signedApprovalPresent: precheck.signedApprovalPresent,
    gateCount: precheck.gateCount,
    passedGateCount: precheck.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
    importsRuntimePayload: precheck.importsRuntimePayload,
    acceptsSyntheticEvidence: precheck.acceptsSyntheticEvidence,
    containsSecretValue: precheck.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
  });
}
