import type {
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckTypes.js";

export function renderControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckMarkdown(
  precheck: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck,
): string {
  const lines: string[] = [
    "# Controlled read-only shard preview candidate document submission precheck",
    "",
    `- Candidate document submission precheck version: ${precheck.candidateDocumentSubmissionPrecheckVersion}`,
    `- Source candidate document request package version: ${precheck.sourceCandidateDocumentRequestPackageVersion}`,
    `- Candidate document submission precheck state: ${precheck.candidateDocumentSubmissionPrecheckState}`,
    `- Ready for candidate document submission precheck: ${precheck.readyForCandidateDocumentSubmissionPrecheck}`,
    `- Ready for reviewed real candidate document submission: ${precheck.readyForReviewedRealCandidateDocumentSubmission}`,
    `- Ready for candidate document intake: ${precheck.readyForCandidateDocumentIntake}`,
    `- Ready for candidate payload import: ${precheck.readyForCandidatePayloadImport}`,
    `- Ready for candidate evaluation: ${precheck.readyForCandidateEvaluation}`,
    `- Ready for approval grant: ${precheck.readyForApprovalGrant}`,
    `- Ready for signed approval: ${precheck.readyForSignedApproval}`,
    `- Checkpoint count: ${precheck.checkpointCount}`,
    `- Validator count: ${precheck.validatorCount}`,
    `- Source request item count: ${precheck.sourceRequestItemCount}`,
    `- Source acceptance check count: ${precheck.sourceAcceptanceCheckCount}`,
    `- Ready checkpoint count: ${precheck.readyCheckpointCount}`,
    `- Ready validator count: ${precheck.readyValidatorCount}`,
    `- Required candidate field count: ${precheck.requiredCandidateFieldCount}`,
    `- Submission candidate field count: ${precheck.submissionCandidateFieldCount}`,
    `- Real candidate document count: ${precheck.realCandidateDocumentCount}`,
    `- Synthetic candidate document count: ${precheck.syntheticCandidateDocumentCount}`,
    `- Staged candidate document count: ${precheck.stagedCandidateDocumentCount}`,
    `- Imported candidate payload count: ${precheck.importedCandidatePayloadCount}`,
    `- Evaluated candidate payload count: ${precheck.evaluatedCandidatePayloadCount}`,
    `- Accepted candidate payload count: ${precheck.acceptedCandidatePayloadCount}`,
    `- Candidate document submission allowed: ${precheck.candidateDocumentSubmissionAllowed}`,
    `- Candidate document intake allowed: ${precheck.candidateDocumentIntakeAllowed}`,
    `- Candidate payload import allowed: ${precheck.candidatePayloadImportAllowed}`,
    `- Candidate evaluation allowed: ${precheck.candidateEvaluationAllowed}`,
    `- Execution allowed: ${precheck.executionAllowed}`,
    `- Write routing allowed: ${precheck.writeRoutingAllowed}`,
    `- Starts services: ${precheck.startsServices}`,
    `- Mutates sibling state: ${precheck.mutatesSiblingState}`,
    `- Imports runtime payload: ${precheck.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${precheck.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${precheck.containsSecretValue}`,
    `- Gate count: ${precheck.gateCount}`,
    `- Passed gate count: ${precheck.passedGateCount}`,
    `- Blocked reason codes: ${precheck.blockedReasonCodes.join(", ") || "none"}`,
    `- Source candidate document request package digest: ${precheck.sourceCandidateDocumentRequestPackageDigest}`,
    `- Candidate document submission precheck digest: ${precheck.candidateDocumentSubmissionPrecheckDigest}`,
    "",
    "## Submission Checkpoints",
  ];

  for (const checkpoint of precheck.checkpoints) {
    lines.push(
      "",
      `### ${checkpoint.order}. ${checkpoint.nodeVersion} ${checkpoint.code}`,
      `- Checkpoint name: ${checkpoint.checkpointName}`,
      `- Kind: ${checkpoint.kind}`,
      `- Source request item codes: ${checkpoint.sourceRequestItemCodes.join(", ") || "none"}`,
      `- Source request check codes: ${checkpoint.sourceRequestCheckCodes.join(", ") || "none"}`,
      `- Source ready: ${checkpoint.sourceReady}`,
      `- Candidate fields: ${checkpoint.candidateFields.join(", ") || "none"}`,
      `- Candidate field count: ${checkpoint.candidateFieldCount}`,
      `- Submission instruction: ${checkpoint.submissionInstruction}`,
      `- Validation criterion: ${checkpoint.validationCriterion}`,
      `- Ready for candidate document submission checkpoint: ${checkpoint.readyForCandidateDocumentSubmissionCheckpoint}`,
      `- Requires reviewed real candidate document: ${checkpoint.requiresReviewedRealCandidateDocument}`,
      `- Real candidate document count: ${checkpoint.realCandidateDocumentCount}`,
      `- Synthetic candidate document count: ${checkpoint.syntheticCandidateDocumentCount}`,
      `- Imported candidate payload count: ${checkpoint.importedCandidatePayloadCount}`,
      `- Evaluated candidate payload count: ${checkpoint.evaluatedCandidatePayloadCount}`,
      `- Accepted candidate payload count: ${checkpoint.acceptedCandidatePayloadCount}`,
      `- Read only: ${checkpoint.readOnly}`,
      `- Writes allowed: ${checkpoint.writesAllowed}`,
      `- Mutates sibling state: ${checkpoint.mutatesSiblingState}`,
    );
  }

  lines.push("", "## Submission Validators");

  for (const validator of precheck.validators) {
    lines.push(
      "",
      `### ${validator.order}. ${validator.nodeVersion} ${validator.code}`,
      `- Kind: ${validator.kind}`,
      `- Source checkpoint code: ${validator.sourceCheckpointCode}`,
      `- Source checkpoint ready: ${validator.sourceCheckpointReady}`,
      `- Validator text: ${validator.validatorText}`,
      `- Rejects missing candidate document: ${validator.rejectsMissingCandidateDocument}`,
      `- Rejects synthetic candidate document: ${validator.rejectsSyntheticCandidateDocument}`,
      `- Quarantines unreviewed candidate document: ${validator.quarantinesUnreviewedCandidateDocument}`,
      `- Blocks candidate payload import: ${validator.blocksCandidatePayloadImport}`,
      `- Blocks candidate evaluation: ${validator.blocksCandidateEvaluation}`,
      `- Blocks candidate acceptance: ${validator.blocksCandidateAcceptance}`,
      `- Blocks approval grant: ${validator.blocksApprovalGrant}`,
      `- Blocks signed approval: ${validator.blocksSignedApproval}`,
      `- Blocks runtime payload: ${validator.blocksRuntimePayload}`,
      `- Blocks writes: ${validator.blocksWrites}`,
      `- Blocks sibling mutation: ${validator.blocksSiblingMutation}`,
      `- Ready for candidate document submission validator: ${validator.readyForCandidateDocumentSubmissionValidator}`,
      `- Read only: ${validator.readOnly}`,
      `- Writes allowed: ${validator.writesAllowed}`,
      `- Mutates sibling state: ${validator.mutatesSiblingState}`,
    );
  }

  return `${lines.join("\n")}\n`;
}
