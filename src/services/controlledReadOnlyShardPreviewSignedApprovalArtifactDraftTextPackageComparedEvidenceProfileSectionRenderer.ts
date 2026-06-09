import { renderEntries } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageComparedEvidenceProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return [
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Package Evidence Intake",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Evaluation Preflight",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Text Package Compared Evidence Candidate Intake",
    ...renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake,
    ),
    "",
  ];
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeProfileEntries(
  intake:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion,
    artifactDraftTextPackageComparedPackageEvidenceIntakeState:
      intake.artifactDraftTextPackageComparedPackageEvidenceIntakeState,
    readyForManualComparedPackageEvidenceIntakeContract:
      intake.readyForManualComparedPackageEvidenceIntakeContract,
    readyForRealComparedPackageEvidenceIntake:
      intake.readyForRealComparedPackageEvidenceIntake,
    readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck:
      intake.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck:
      intake.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck,
    readyForSignedApprovalArtifactDraft: intake.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: intake.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: intake.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: intake.readyForOperatorValueSubmission,
    readyForEvidenceImport: intake.readyForEvidenceImport,
    readyForRuntimePayload: intake.readyForRuntimePayload,
    slotCount: intake.slotCount,
    guardCount: intake.guardCount,
    sourceAcceptanceCheckpointCount: intake.sourceAcceptanceCheckpointCount,
    sourceAcceptanceGuardCount: intake.sourceAcceptanceGuardCount,
    readySlotCount: intake.readySlotCount,
    readyGuardCount: intake.readyGuardCount,
    sourcePrecheckEvidenceSlotCount: intake.sourcePrecheckEvidenceSlotCount,
    manualSubmissionReferenceEvidenceSlotCount:
      intake.manualSubmissionReferenceEvidenceSlotCount,
    offlineComparisonResultEvidenceSlotCount:
      intake.offlineComparisonResultEvidenceSlotCount,
    identityBindingEvidenceSlotCount: intake.identityBindingEvidenceSlotCount,
    digestMatchSummaryEvidenceSlotCount: intake.digestMatchSummaryEvidenceSlotCount,
    signatureEnvelopeObservationEvidenceSlotCount:
      intake.signatureEnvelopeObservationEvidenceSlotCount,
    sourceEvidenceHandleEvidenceSlotCount: intake.sourceEvidenceHandleEvidenceSlotCount,
    policyExecutionLockEvidenceSlotCount: intake.policyExecutionLockEvidenceSlotCount,
    approvalGrantSeparationEvidenceSlotCount: intake.approvalGrantSeparationEvidenceSlotCount,
    archiveCloseoutEvidenceSlotCount: intake.archiveCloseoutEvidenceSlotCount,
    expectedRealComparedPackageEvidenceSlotCount:
      intake.expectedRealComparedPackageEvidenceSlotCount,
    realComparedPackageEvidenceCount: intake.realComparedPackageEvidenceCount,
    manualComparedPackageEvidenceMaterializedCount:
      intake.manualComparedPackageEvidenceMaterializedCount,
    syntheticComparedPackageEvidenceCount: intake.syntheticComparedPackageEvidenceCount,
    actualDraftTextPackageAcceptanceEvidenceCount:
      intake.actualDraftTextPackageAcceptanceEvidenceCount,
    submittedDraftTextPackageCount: intake.submittedDraftTextPackageCount,
    comparedDraftTextPackageCount: intake.comparedDraftTextPackageCount,
    acceptedDraftTextPackageCount: intake.acceptedDraftTextPackageCount,
    rejectedDraftTextPackageCount: intake.rejectedDraftTextPackageCount,
    signedDraftTextCount: intake.signedDraftTextCount,
    draftSignaturePayloadCount: intake.draftSignaturePayloadCount,
    approvalCaptured: intake.approvalCaptured,
    approvalGrantPresent: intake.approvalGrantPresent,
    signedApprovalPresent: intake.signedApprovalPresent,
    gateCount: intake.gateCount,
    passedGateCount: intake.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
    importsRuntimePayload: intake.importsRuntimePayload,
    acceptsSyntheticEvidence: intake.acceptsSyntheticEvidence,
    containsSecretValue: intake.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion,
    artifactDraftTextPackageComparedEvidenceEvaluationPreflightState:
      preflight.artifactDraftTextPackageComparedEvidenceEvaluationPreflightState,
    readyForComparedEvidenceEvaluationPreflightContract:
      preflight.readyForComparedEvidenceEvaluationPreflightContract,
    readyForRealComparedPackageEvidenceEvaluation:
      preflight.readyForRealComparedPackageEvidenceEvaluation,
    readyForManualComparedPackageEvidenceIntakeContract:
      preflight.readyForManualComparedPackageEvidenceIntakeContract,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    evaluationRuleCount: preflight.evaluationRuleCount,
    evaluationGuardCount: preflight.evaluationGuardCount,
    sourceIntakeSlotCount: preflight.sourceIntakeSlotCount,
    sourceIntakeGuardCount: preflight.sourceIntakeGuardCount,
    readyEvaluationRuleCount: preflight.readyEvaluationRuleCount,
    readyEvaluationGuardCount: preflight.readyEvaluationGuardCount,
    satisfiedEvaluationRuleCount: preflight.satisfiedEvaluationRuleCount,
    expectedRealComparedPackageEvidenceCandidateFieldCount:
      preflight.expectedRealComparedPackageEvidenceCandidateFieldCount,
    realComparedPackageEvidenceCandidateCount:
      preflight.realComparedPackageEvidenceCandidateCount,
    syntheticComparedPackageEvidenceCandidateCount:
      preflight.syntheticComparedPackageEvidenceCandidateCount,
    candidateMaterializedCount: preflight.candidateMaterializedCount,
    candidateAcceptedCount: preflight.candidateAcceptedCount,
    candidateRejectedCount: preflight.candidateRejectedCount,
    acceptedComparedPackageEvidenceCount: preflight.acceptedComparedPackageEvidenceCount,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    evaluationAllowed: preflight.evaluationAllowed,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateProfileEntries(
  candidate:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion:
      candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
      candidate.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion,
    artifactDraftTextPackageComparedEvidenceCandidateState:
      candidate.artifactDraftTextPackageComparedEvidenceCandidateState,
    readyForComparedEvidenceCandidateBlueprintContract:
      candidate.readyForComparedEvidenceCandidateBlueprintContract,
    readyForRealComparedPackageEvidenceCandidateIntake:
      candidate.readyForRealComparedPackageEvidenceCandidateIntake,
    readyForComparedEvidenceEvaluationPreflightContract:
      candidate.readyForComparedEvidenceEvaluationPreflightContract,
    readyForRealComparedPackageEvidenceEvaluation:
      candidate.readyForRealComparedPackageEvidenceEvaluation,
    readyForEvidenceImport: candidate.readyForEvidenceImport,
    readyForRuntimePayload: candidate.readyForRuntimePayload,
    blueprintSectionCount: candidate.blueprintSectionCount,
    blueprintBlockerCount: candidate.blueprintBlockerCount,
    sourceEvaluationRuleCount: candidate.sourceEvaluationRuleCount,
    sourceEvaluationGuardCount: candidate.sourceEvaluationGuardCount,
    readyBlueprintSectionCount: candidate.readyBlueprintSectionCount,
    readyBlueprintBlockerCount: candidate.readyBlueprintBlockerCount,
    candidateFieldCount: candidate.candidateFieldCount,
    expectedCandidateFieldCountFromPreflight:
      candidate.expectedCandidateFieldCountFromPreflight,
    realComparedPackageEvidenceCandidateValueCount:
      candidate.realComparedPackageEvidenceCandidateValueCount,
    syntheticComparedPackageEvidenceCandidateValueCount:
      candidate.syntheticComparedPackageEvidenceCandidateValueCount,
    materializedComparedPackageEvidenceCandidateValueCount:
      candidate.materializedComparedPackageEvidenceCandidateValueCount,
    acceptedComparedPackageEvidenceCandidateValueCount:
      candidate.acceptedComparedPackageEvidenceCandidateValueCount,
    rejectedComparedPackageEvidenceCandidateValueCount:
      candidate.rejectedComparedPackageEvidenceCandidateValueCount,
    approvalGrantPresent: candidate.approvalGrantPresent,
    signedApprovalPresent: candidate.signedApprovalPresent,
    candidateBlueprintMaterializationAllowed:
      candidate.candidateBlueprintMaterializationAllowed,
    candidateEvaluationAllowed: candidate.candidateEvaluationAllowed,
    executionAllowed: candidate.executionAllowed,
    writeRoutingAllowed: candidate.writeRoutingAllowed,
    gateCount: candidate.gateCount,
    passedGateCount: candidate.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest:
      candidate.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest,
    importsRuntimePayload: candidate.importsRuntimePayload,
    acceptsSyntheticEvidence: candidate.acceptsSyntheticEvidence,
    containsSecretValue: candidate.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest:
      candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeProfileEntries(
  intake:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion,
    artifactDraftTextPackageComparedEvidenceCandidateIntakeState:
      intake.artifactDraftTextPackageComparedEvidenceCandidateIntakeState,
    readyForComparedEvidenceCandidateIntakePreflightContract:
      intake.readyForComparedEvidenceCandidateIntakePreflightContract,
    readyForRealComparedPackageEvidenceCandidateDocumentIntake:
      intake.readyForRealComparedPackageEvidenceCandidateDocumentIntake,
    readyForComparedEvidenceCandidateBlueprintContract:
      intake.readyForComparedEvidenceCandidateBlueprintContract,
    readyForCandidatePayloadImport: intake.readyForCandidatePayloadImport,
    readyForCandidateEvaluation: intake.readyForCandidateEvaluation,
    readyForEvidenceImport: intake.readyForEvidenceImport,
    readyForRuntimePayload: intake.readyForRuntimePayload,
    intakeSlotCount: intake.intakeSlotCount,
    intakeGuardCount: intake.intakeGuardCount,
    sourceBlueprintSectionCount: intake.sourceBlueprintSectionCount,
    sourceBlueprintBlockerCount: intake.sourceBlueprintBlockerCount,
    readyIntakeSlotCount: intake.readyIntakeSlotCount,
    readyIntakeGuardCount: intake.readyIntakeGuardCount,
    requiredCandidateFieldCount: intake.requiredCandidateFieldCount,
    sourceCandidateFieldCount: intake.sourceCandidateFieldCount,
    realCandidateDocumentCount: intake.realCandidateDocumentCount,
    syntheticCandidateDocumentCount: intake.syntheticCandidateDocumentCount,
    stagedCandidateDocumentCount: intake.stagedCandidateDocumentCount,
    importedCandidatePayloadCount: intake.importedCandidatePayloadCount,
    evaluatedCandidatePayloadCount: intake.evaluatedCandidatePayloadCount,
    acceptedCandidatePayloadCount: intake.acceptedCandidatePayloadCount,
    rejectedCandidatePayloadCount: intake.rejectedCandidatePayloadCount,
    approvalGrantPresent: intake.approvalGrantPresent,
    signedApprovalPresent: intake.signedApprovalPresent,
    candidateDocumentIntakeAllowed: intake.candidateDocumentIntakeAllowed,
    candidatePayloadImportAllowed: intake.candidatePayloadImportAllowed,
    candidateEvaluationAllowed: intake.candidateEvaluationAllowed,
    executionAllowed: intake.executionAllowed,
    writeRoutingAllowed: intake.writeRoutingAllowed,
    gateCount: intake.gateCount,
    passedGateCount: intake.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest,
    importsRuntimePayload: intake.importsRuntimePayload,
    acceptsSyntheticEvidence: intake.acceptsSyntheticEvidence,
    containsSecretValue: intake.containsSecretValue,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest,
  });
}
