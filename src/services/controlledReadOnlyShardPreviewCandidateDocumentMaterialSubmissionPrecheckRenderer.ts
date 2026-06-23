import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheck,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckTypes.js";
import {
  renderVerificationReportMarkdown,
  renderVerificationSeparatedBlockLines,
} from "./verificationReportBuilder.js";

type CandidateDocumentMaterialSubmissionPrecheck =
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheck;

export function renderControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckMarkdown(
  precheck: CandidateDocumentMaterialSubmissionPrecheck,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview candidate document material submission precheck",
    meta: [
      ["Candidate document material submission precheck version", precheck.candidateDocumentMaterialSubmissionPrecheckVersion],
      ["Source candidate document material request package version", precheck.sourceCandidateDocumentMaterialRequestPackageVersion],
      ["Candidate document material submission precheck state", precheck.candidateDocumentMaterialSubmissionPrecheckState],
      ["Ready for candidate document material submission precheck", precheck.readyForCandidateDocumentMaterialSubmissionPrecheck],
      ["Ready for reviewed real candidate document material submission", precheck.readyForReviewedRealCandidateDocumentMaterialSubmission],
      ["Ready for candidate document material intake", precheck.readyForCandidateDocumentMaterialIntake],
      ["Checkpoint count", precheck.checkpointCount],
      ["Validator count", precheck.validatorCount],
      ["Source material request item count", precheck.sourceMaterialRequestItemCount],
      ["Source material acceptance check count", precheck.sourceMaterialAcceptanceCheckCount],
      ["Ready checkpoint count", precheck.readyCheckpointCount],
      ["Ready validator count", precheck.readyValidatorCount],
      ["Required material field count", precheck.requiredMaterialFieldCount],
      ["Submission material field count", precheck.submissionMaterialFieldCount],
      ["Reviewed real candidate document material present", precheck.reviewedRealCandidateDocumentMaterialPresent],
      ["Real candidate document count", precheck.realCandidateDocumentCount],
      ["Imported candidate payload count", precheck.importedCandidatePayloadCount],
      ["Evaluated candidate payload count", precheck.evaluatedCandidatePayloadCount],
      ["Candidate document material submission allowed", precheck.candidateDocumentMaterialSubmissionAllowed],
      ["Candidate document material intake allowed", precheck.candidateDocumentMaterialIntakeAllowed],
      ["Candidate payload import allowed", precheck.candidatePayloadImportAllowed],
      ["Candidate evaluation allowed", precheck.candidateEvaluationAllowed],
      ["Execution allowed", precheck.executionAllowed],
      ["Write routing allowed", precheck.writeRoutingAllowed],
      ["Gate count", precheck.gateCount],
      ["Passed gate count", precheck.passedGateCount],
      ["Source candidate document material request package digest", precheck.sourceCandidateDocumentMaterialRequestPackageDigest],
      ["Candidate document material submission precheck digest", precheck.candidateDocumentMaterialSubmissionPrecheckDigest],
    ],
    sections: [
      {
        heading: "Material Submission Checkpoints",
        lines: renderVerificationSeparatedBlockLines(precheck.checkpoints, renderCheckpoint),
        bodyLeadingBlankLine: precheck.checkpoints.length > 0,
      },
      {
        heading: "Material Submission Validators",
        lines: renderVerificationSeparatedBlockLines(precheck.validators, renderValidator),
        bodyLeadingBlankLine: precheck.validators.length > 0,
      },
    ],
    trailingNewline: false,
  });
}

function renderCheckpoint(
  checkpoint: CandidateDocumentMaterialSubmissionPrecheck["checkpoints"][number],
): string[] {
  return [
    `### ${checkpoint.order}. ${checkpoint.nodeVersion} ${checkpoint.code}`,
    `- Checkpoint name: ${checkpoint.checkpointName}`,
    `- Kind: ${checkpoint.kind}`,
    `- Source material request item codes: ${checkpoint.sourceMaterialRequestItemCodes.join(", ")}`,
    `- Source material acceptance check codes: ${checkpoint.sourceMaterialAcceptanceCheckCodes.join(", ")}`,
    `- Source ready: ${checkpoint.sourceReady}`,
    `- Material field count: ${checkpoint.materialFieldCount}`,
    `- Submission instruction: ${checkpoint.submissionInstruction}`,
    `- Validation rule: ${checkpoint.validationRule}`,
    `- Ready for candidate document material submission checkpoint: ${checkpoint.readyForCandidateDocumentMaterialSubmissionCheckpoint}`,
    `- Requires reviewed real candidate document material: ${checkpoint.requiresReviewedRealCandidateDocumentMaterial}`,
    `- Reviewed real candidate document material present: ${checkpoint.reviewedRealCandidateDocumentMaterialPresent}`,
    `- Read only: ${checkpoint.readOnly}`,
    `- Writes allowed: ${checkpoint.writesAllowed}`,
    `- Starts services: ${checkpoint.startsServices}`,
    `- Mutates sibling state: ${checkpoint.mutatesSiblingState}`,
  ];
}

function renderValidator(
  validator: CandidateDocumentMaterialSubmissionPrecheck["validators"][number],
): string[] {
  return [
    `### ${validator.order}. ${validator.nodeVersion} ${validator.code}`,
    `- Kind: ${validator.kind}`,
    `- Source checkpoint code: ${validator.sourceCheckpointCode}`,
    `- Source checkpoint ready: ${validator.sourceCheckpointReady}`,
    `- Validator text: ${validator.validatorText}`,
    `- Rejects missing material: ${validator.rejectsMissingMaterial}`,
    `- Rejects synthetic material: ${validator.rejectsSyntheticMaterial}`,
    `- Quarantines unreviewed material: ${validator.quarantinesUnreviewedMaterial}`,
    `- Blocks material intake: ${validator.blocksMaterialIntake}`,
    `- Blocks candidate payload import: ${validator.blocksCandidatePayloadImport}`,
    `- Blocks candidate evaluation: ${validator.blocksCandidateEvaluation}`,
    `- Blocks writes: ${validator.blocksWrites}`,
    `- Blocks sibling mutation: ${validator.blocksSiblingMutation}`,
    `- Ready for candidate document material submission validator: ${validator.readyForCandidateDocumentMaterialSubmissionValidator}`,
  ];
}
