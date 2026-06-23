import { renderEntries, renderProfileEntrySections } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function renderControlledReadOnlyShardPreviewCandidateDocumentProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return renderProfileEntrySections([
    {
      heading: "Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Request Package",
      lines: renderComparedEvidenceCandidateDocumentRequestPackageProfileEntries(
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentRequestPackage,
      ),
    },
    {
      heading: "Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Submission Precheck",
      lines: renderComparedEvidenceCandidateDocumentSubmissionPrecheckProfileEntries(
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentSubmissionPrecheck,
      ),
    },
    {
      heading: "Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Intake Packet",
      lines: renderComparedEvidenceCandidateDocumentIntakePacketProfileEntries(
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentIntakePacket,
      ),
    },
    {
      heading: "Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Material Request Package",
      lines: renderComparedEvidenceCandidateDocumentMaterialRequestPackageProfileEntries(
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialRequestPackage,
      ),
    },
    {
      heading: "Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Document Material Submission Precheck",
      lines: renderComparedEvidenceCandidateDocumentMaterialSubmissionPrecheckProfileEntries(
        profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialSubmissionPrecheck,
      ),
    },
  ]);
}

function renderComparedEvidenceCandidateDocumentRequestPackageProfileEntries(
  requestPackage:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentRequestPackage"],
): string[] {
  return renderEntries({
    candidateDocumentRequestPackageVersion:
      requestPackage.candidateDocumentRequestPackageVersion,
    sourceCandidateIntakeVersion: requestPackage.sourceCandidateIntakeVersion,
    candidateDocumentRequestPackageState:
      requestPackage.candidateDocumentRequestPackageState,
    readyForCandidateDocumentRequestPackage:
      requestPackage.readyForCandidateDocumentRequestPackage,
    readyForRealComparedPackageEvidenceCandidateDocument:
      requestPackage.readyForRealComparedPackageEvidenceCandidateDocument,
    readyForCandidateDocumentIntake: requestPackage.readyForCandidateDocumentIntake,
    readyForCandidatePayloadImport: requestPackage.readyForCandidatePayloadImport,
    readyForCandidateEvaluation: requestPackage.readyForCandidateEvaluation,
    readyForApprovalGrant: requestPackage.readyForApprovalGrant,
    readyForSignedApproval: requestPackage.readyForSignedApproval,
    readyForRuntimePayload: requestPackage.readyForRuntimePayload,
    requestItemCount: requestPackage.requestItemCount,
    acceptanceCheckCount: requestPackage.acceptanceCheckCount,
    sourceIntakeSlotCount: requestPackage.sourceIntakeSlotCount,
    sourceIntakeGuardCount: requestPackage.sourceIntakeGuardCount,
    readyRequestItemCount: requestPackage.readyRequestItemCount,
    readyAcceptanceCheckCount: requestPackage.readyAcceptanceCheckCount,
    requiredCandidateFieldCount: requestPackage.requiredCandidateFieldCount,
    requestedCandidateFieldCount: requestPackage.requestedCandidateFieldCount,
    realCandidateDocumentCount: requestPackage.realCandidateDocumentCount,
    syntheticCandidateDocumentCount: requestPackage.syntheticCandidateDocumentCount,
    stagedCandidateDocumentCount: requestPackage.stagedCandidateDocumentCount,
    importedCandidatePayloadCount: requestPackage.importedCandidatePayloadCount,
    evaluatedCandidatePayloadCount: requestPackage.evaluatedCandidatePayloadCount,
    acceptedCandidatePayloadCount: requestPackage.acceptedCandidatePayloadCount,
    rejectedCandidatePayloadCount: requestPackage.rejectedCandidatePayloadCount,
    candidateDocumentRequestAllowed: requestPackage.candidateDocumentRequestAllowed,
    candidateDocumentIntakeAllowed: requestPackage.candidateDocumentIntakeAllowed,
    candidatePayloadImportAllowed: requestPackage.candidatePayloadImportAllowed,
    candidateEvaluationAllowed: requestPackage.candidateEvaluationAllowed,
    executionAllowed: requestPackage.executionAllowed,
    writeRoutingAllowed: requestPackage.writeRoutingAllowed,
    gateCount: requestPackage.gateCount,
    passedGateCount: requestPackage.passedGateCount,
    sourceCandidateIntakeDigest: requestPackage.sourceCandidateIntakeDigest,
    importsRuntimePayload: requestPackage.importsRuntimePayload,
    acceptsSyntheticEvidence: requestPackage.acceptsSyntheticEvidence,
    containsSecretValue: requestPackage.containsSecretValue,
    candidateDocumentRequestPackageDigest:
      requestPackage.candidateDocumentRequestPackageDigest,
  });
}

function renderComparedEvidenceCandidateDocumentSubmissionPrecheckProfileEntries(
  precheck:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentSubmissionPrecheck"],
): string[] {
  return renderEntries({
    candidateDocumentSubmissionPrecheckVersion:
      precheck.candidateDocumentSubmissionPrecheckVersion,
    sourceCandidateDocumentRequestPackageVersion:
      precheck.sourceCandidateDocumentRequestPackageVersion,
    candidateDocumentSubmissionPrecheckState:
      precheck.candidateDocumentSubmissionPrecheckState,
    readyForCandidateDocumentSubmissionPrecheck:
      precheck.readyForCandidateDocumentSubmissionPrecheck,
    readyForReviewedRealCandidateDocumentSubmission:
      precheck.readyForReviewedRealCandidateDocumentSubmission,
    readyForCandidateDocumentIntake: precheck.readyForCandidateDocumentIntake,
    readyForCandidatePayloadImport: precheck.readyForCandidatePayloadImport,
    readyForCandidateEvaluation: precheck.readyForCandidateEvaluation,
    readyForApprovalGrant: precheck.readyForApprovalGrant,
    readyForSignedApproval: precheck.readyForSignedApproval,
    readyForRuntimePayload: precheck.readyForRuntimePayload,
    checkpointCount: precheck.checkpointCount,
    validatorCount: precheck.validatorCount,
    sourceRequestItemCount: precheck.sourceRequestItemCount,
    sourceAcceptanceCheckCount: precheck.sourceAcceptanceCheckCount,
    readyCheckpointCount: precheck.readyCheckpointCount,
    readyValidatorCount: precheck.readyValidatorCount,
    requiredCandidateFieldCount: precheck.requiredCandidateFieldCount,
    submissionCandidateFieldCount: precheck.submissionCandidateFieldCount,
    realCandidateDocumentCount: precheck.realCandidateDocumentCount,
    syntheticCandidateDocumentCount: precheck.syntheticCandidateDocumentCount,
    stagedCandidateDocumentCount: precheck.stagedCandidateDocumentCount,
    importedCandidatePayloadCount: precheck.importedCandidatePayloadCount,
    evaluatedCandidatePayloadCount: precheck.evaluatedCandidatePayloadCount,
    acceptedCandidatePayloadCount: precheck.acceptedCandidatePayloadCount,
    rejectedCandidatePayloadCount: precheck.rejectedCandidatePayloadCount,
    candidateDocumentSubmissionAllowed: precheck.candidateDocumentSubmissionAllowed,
    candidateDocumentIntakeAllowed: precheck.candidateDocumentIntakeAllowed,
    candidatePayloadImportAllowed: precheck.candidatePayloadImportAllowed,
    candidateEvaluationAllowed: precheck.candidateEvaluationAllowed,
    executionAllowed: precheck.executionAllowed,
    writeRoutingAllowed: precheck.writeRoutingAllowed,
    gateCount: precheck.gateCount,
    passedGateCount: precheck.passedGateCount,
    sourceCandidateDocumentRequestPackageDigest:
      precheck.sourceCandidateDocumentRequestPackageDigest,
    importsRuntimePayload: precheck.importsRuntimePayload,
    acceptsSyntheticEvidence: precheck.acceptsSyntheticEvidence,
    containsSecretValue: precheck.containsSecretValue,
    candidateDocumentSubmissionPrecheckDigest:
      precheck.candidateDocumentSubmissionPrecheckDigest,
  });
}

function renderComparedEvidenceCandidateDocumentIntakePacketProfileEntries(
  packet:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentIntakePacket"],
): string[] {
  return renderEntries({
    candidateDocumentIntakePacketVersion:
      packet.candidateDocumentIntakePacketVersion,
    sourceCandidateDocumentSubmissionPrecheckVersion:
      packet.sourceCandidateDocumentSubmissionPrecheckVersion,
    candidateDocumentIntakePacketState:
      packet.candidateDocumentIntakePacketState,
    readyForCandidateDocumentIntakePacket:
      packet.readyForCandidateDocumentIntakePacket,
    readyForReviewedRealCandidateDocumentIntake:
      packet.readyForReviewedRealCandidateDocumentIntake,
    readyForCandidatePayloadImport: packet.readyForCandidatePayloadImport,
    readyForCandidateEvaluation: packet.readyForCandidateEvaluation,
    readyForApprovalGrant: packet.readyForApprovalGrant,
    readyForSignedApproval: packet.readyForSignedApproval,
    readyForRuntimePayload: packet.readyForRuntimePayload,
    intakeSlotCount: packet.intakeSlotCount,
    intakeGuardCount: packet.intakeGuardCount,
    sourceCheckpointCount: packet.sourceCheckpointCount,
    sourceValidatorCount: packet.sourceValidatorCount,
    readyIntakeSlotCount: packet.readyIntakeSlotCount,
    readyIntakeGuardCount: packet.readyIntakeGuardCount,
    requiredCandidateFieldCount: packet.requiredCandidateFieldCount,
    intakeCandidateFieldCount: packet.intakeCandidateFieldCount,
    reviewedRealCandidateDocumentPresent:
      packet.reviewedRealCandidateDocumentPresent,
    realCandidateDocumentCount: packet.realCandidateDocumentCount,
    syntheticCandidateDocumentCount: packet.syntheticCandidateDocumentCount,
    stagedCandidateDocumentCount: packet.stagedCandidateDocumentCount,
    importedCandidatePayloadCount: packet.importedCandidatePayloadCount,
    evaluatedCandidatePayloadCount: packet.evaluatedCandidatePayloadCount,
    acceptedCandidatePayloadCount: packet.acceptedCandidatePayloadCount,
    rejectedCandidatePayloadCount: packet.rejectedCandidatePayloadCount,
    candidateDocumentSubmissionAllowed: packet.candidateDocumentSubmissionAllowed,
    candidateDocumentIntakeAllowed: packet.candidateDocumentIntakeAllowed,
    candidatePayloadImportAllowed: packet.candidatePayloadImportAllowed,
    candidateEvaluationAllowed: packet.candidateEvaluationAllowed,
    executionAllowed: packet.executionAllowed,
    writeRoutingAllowed: packet.writeRoutingAllowed,
    gateCount: packet.gateCount,
    passedGateCount: packet.passedGateCount,
    sourceCandidateDocumentSubmissionPrecheckDigest:
      packet.sourceCandidateDocumentSubmissionPrecheckDigest,
    importsRuntimePayload: packet.importsRuntimePayload,
    acceptsSyntheticEvidence: packet.acceptsSyntheticEvidence,
    containsSecretValue: packet.containsSecretValue,
    candidateDocumentIntakePacketDigest:
      packet.candidateDocumentIntakePacketDigest,
  });
}

function renderComparedEvidenceCandidateDocumentMaterialRequestPackageProfileEntries(
  requestPackage:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialRequestPackage"],
): string[] {
  return renderEntries({
    candidateDocumentMaterialRequestPackageVersion:
      requestPackage.candidateDocumentMaterialRequestPackageVersion,
    sourceCandidateDocumentIntakePacketVersion:
      requestPackage.sourceCandidateDocumentIntakePacketVersion,
    candidateDocumentMaterialRequestPackageState:
      requestPackage.candidateDocumentMaterialRequestPackageState,
    readyForCandidateDocumentMaterialRequestPackage:
      requestPackage.readyForCandidateDocumentMaterialRequestPackage,
    readyForReviewedRealCandidateDocumentSubmission:
      requestPackage.readyForReviewedRealCandidateDocumentSubmission,
    readyForCandidateDocumentMaterialIntake:
      requestPackage.readyForCandidateDocumentMaterialIntake,
    readyForCandidatePayloadImport: requestPackage.readyForCandidatePayloadImport,
    readyForCandidateEvaluation: requestPackage.readyForCandidateEvaluation,
    readyForApprovalGrant: requestPackage.readyForApprovalGrant,
    readyForSignedApproval: requestPackage.readyForSignedApproval,
    readyForRuntimePayload: requestPackage.readyForRuntimePayload,
    materialRequestItemCount: requestPackage.materialRequestItemCount,
    materialAcceptanceCheckCount: requestPackage.materialAcceptanceCheckCount,
    sourceIntakeSlotCount: requestPackage.sourceIntakeSlotCount,
    sourceIntakeGuardCount: requestPackage.sourceIntakeGuardCount,
    readyMaterialRequestItemCount:
      requestPackage.readyMaterialRequestItemCount,
    readyMaterialAcceptanceCheckCount:
      requestPackage.readyMaterialAcceptanceCheckCount,
    requiredMaterialFieldCount: requestPackage.requiredMaterialFieldCount,
    requestedMaterialFieldCount: requestPackage.requestedMaterialFieldCount,
    reviewedRealCandidateDocumentMaterialPresent:
      requestPackage.reviewedRealCandidateDocumentMaterialPresent,
    realCandidateDocumentCount: requestPackage.realCandidateDocumentCount,
    syntheticCandidateDocumentCount: requestPackage.syntheticCandidateDocumentCount,
    stagedCandidateDocumentCount: requestPackage.stagedCandidateDocumentCount,
    importedCandidatePayloadCount: requestPackage.importedCandidatePayloadCount,
    evaluatedCandidatePayloadCount: requestPackage.evaluatedCandidatePayloadCount,
    acceptedCandidatePayloadCount: requestPackage.acceptedCandidatePayloadCount,
    rejectedCandidatePayloadCount: requestPackage.rejectedCandidatePayloadCount,
    candidateDocumentSubmissionAllowed:
      requestPackage.candidateDocumentSubmissionAllowed,
    candidateDocumentIntakeAllowed: requestPackage.candidateDocumentIntakeAllowed,
    candidateDocumentMaterialIntakeAllowed:
      requestPackage.candidateDocumentMaterialIntakeAllowed,
    candidatePayloadImportAllowed: requestPackage.candidatePayloadImportAllowed,
    candidateEvaluationAllowed: requestPackage.candidateEvaluationAllowed,
    executionAllowed: requestPackage.executionAllowed,
    writeRoutingAllowed: requestPackage.writeRoutingAllowed,
    gateCount: requestPackage.gateCount,
    passedGateCount: requestPackage.passedGateCount,
    sourceCandidateDocumentIntakePacketDigest:
      requestPackage.sourceCandidateDocumentIntakePacketDigest,
    importsRuntimePayload: requestPackage.importsRuntimePayload,
    acceptsSyntheticEvidence: requestPackage.acceptsSyntheticEvidence,
    containsSecretValue: requestPackage.containsSecretValue,
    candidateDocumentMaterialRequestPackageDigest:
      requestPackage.candidateDocumentMaterialRequestPackageDigest,
  });
}

function renderComparedEvidenceCandidateDocumentMaterialSubmissionPrecheckProfileEntries(
  precheck:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDocumentMaterialSubmissionPrecheck"],
): string[] {
  return renderEntries({
    candidateDocumentMaterialSubmissionPrecheckVersion:
      precheck.candidateDocumentMaterialSubmissionPrecheckVersion,
    sourceCandidateDocumentMaterialRequestPackageVersion:
      precheck.sourceCandidateDocumentMaterialRequestPackageVersion,
    candidateDocumentMaterialSubmissionPrecheckState:
      precheck.candidateDocumentMaterialSubmissionPrecheckState,
    readyForCandidateDocumentMaterialSubmissionPrecheck:
      precheck.readyForCandidateDocumentMaterialSubmissionPrecheck,
    readyForReviewedRealCandidateDocumentMaterialSubmission:
      precheck.readyForReviewedRealCandidateDocumentMaterialSubmission,
    readyForCandidateDocumentMaterialIntake:
      precheck.readyForCandidateDocumentMaterialIntake,
    readyForCandidatePayloadImport: precheck.readyForCandidatePayloadImport,
    readyForCandidateEvaluation: precheck.readyForCandidateEvaluation,
    readyForApprovalGrant: precheck.readyForApprovalGrant,
    readyForSignedApproval: precheck.readyForSignedApproval,
    readyForRuntimePayload: precheck.readyForRuntimePayload,
    checkpointCount: precheck.checkpointCount,
    validatorCount: precheck.validatorCount,
    sourceMaterialRequestItemCount: precheck.sourceMaterialRequestItemCount,
    sourceMaterialAcceptanceCheckCount:
      precheck.sourceMaterialAcceptanceCheckCount,
    readyCheckpointCount: precheck.readyCheckpointCount,
    readyValidatorCount: precheck.readyValidatorCount,
    requiredMaterialFieldCount: precheck.requiredMaterialFieldCount,
    submissionMaterialFieldCount: precheck.submissionMaterialFieldCount,
    reviewedRealCandidateDocumentMaterialPresent:
      precheck.reviewedRealCandidateDocumentMaterialPresent,
    realCandidateDocumentCount: precheck.realCandidateDocumentCount,
    syntheticCandidateDocumentCount: precheck.syntheticCandidateDocumentCount,
    stagedCandidateDocumentCount: precheck.stagedCandidateDocumentCount,
    importedCandidatePayloadCount: precheck.importedCandidatePayloadCount,
    evaluatedCandidatePayloadCount: precheck.evaluatedCandidatePayloadCount,
    acceptedCandidatePayloadCount: precheck.acceptedCandidatePayloadCount,
    rejectedCandidatePayloadCount: precheck.rejectedCandidatePayloadCount,
    candidateDocumentSubmissionAllowed:
      precheck.candidateDocumentSubmissionAllowed,
    candidateDocumentIntakeAllowed: precheck.candidateDocumentIntakeAllowed,
    candidateDocumentMaterialSubmissionAllowed:
      precheck.candidateDocumentMaterialSubmissionAllowed,
    candidateDocumentMaterialIntakeAllowed:
      precheck.candidateDocumentMaterialIntakeAllowed,
    candidatePayloadImportAllowed: precheck.candidatePayloadImportAllowed,
    candidateEvaluationAllowed: precheck.candidateEvaluationAllowed,
    executionAllowed: precheck.executionAllowed,
    writeRoutingAllowed: precheck.writeRoutingAllowed,
    gateCount: precheck.gateCount,
    passedGateCount: precheck.passedGateCount,
    sourceCandidateDocumentMaterialRequestPackageDigest:
      precheck.sourceCandidateDocumentMaterialRequestPackageDigest,
    importsRuntimePayload: precheck.importsRuntimePayload,
    acceptsSyntheticEvidence: precheck.acceptsSyntheticEvidence,
    containsSecretValue: precheck.containsSecretValue,
    candidateDocumentMaterialSubmissionPrecheckDigest:
      precheck.candidateDocumentMaterialSubmissionPrecheckDigest,
  });
}
