import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightTypes.js";
import {
  renderVerificationReportMarkdown,
  renderVerificationSeparatedBlockLines,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightMarkdown(
  preflight:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package compared evidence evaluation preflight",
    meta: [
      ["Signed approval capture artifact draft text package compared evidence evaluation preflight version", `${preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion}`],
      ["Source signed approval capture artifact draft text package compared package evidence intake version", `${preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion}`],
      ["Artifact draft text package compared evidence evaluation preflight state", `${preflight.artifactDraftTextPackageComparedEvidenceEvaluationPreflightState}`],
      ["Ready for compared evidence evaluation preflight contract", `${preflight.readyForComparedEvidenceEvaluationPreflightContract}`],
      ["Ready for real compared package evidence evaluation", `${preflight.readyForRealComparedPackageEvidenceEvaluation}`],
      ["Ready for manual compared package evidence intake contract", `${preflight.readyForManualComparedPackageEvidenceIntakeContract}`],
      ["Evaluation rule count", `${preflight.evaluationRuleCount}`],
      ["Evaluation guard count", `${preflight.evaluationGuardCount}`],
      ["Source intake slot count", `${preflight.sourceIntakeSlotCount}`],
      ["Source intake guard count", `${preflight.sourceIntakeGuardCount}`],
      ["Ready evaluation rule count", `${preflight.readyEvaluationRuleCount}`],
      ["Ready evaluation guard count", `${preflight.readyEvaluationGuardCount}`],
      ["Satisfied evaluation rule count", `${preflight.satisfiedEvaluationRuleCount}`],
      ["Expected real compared package evidence candidate field count", `${preflight.expectedRealComparedPackageEvidenceCandidateFieldCount}`],
      ["Real compared package evidence candidate count", `${preflight.realComparedPackageEvidenceCandidateCount}`],
      ["Synthetic compared package evidence candidate count", `${preflight.syntheticComparedPackageEvidenceCandidateCount}`],
      ["Candidate materialized count", `${preflight.candidateMaterializedCount}`],
      ["Candidate accepted count", `${preflight.candidateAcceptedCount}`],
      ["Accepted compared package evidence count", `${preflight.acceptedComparedPackageEvidenceCount}`],
      ["Approval grant present", `${preflight.approvalGrantPresent}`],
      ["Signed approval present", `${preflight.signedApprovalPresent}`],
      ["Evaluation allowed", `${preflight.evaluationAllowed}`],
      ["Execution allowed", `${preflight.executionAllowed}`],
      ["Write routing allowed", `${preflight.writeRoutingAllowed}`],
      ["Starts services", `${preflight.startsServices}`],
      ["Mutates sibling state", `${preflight.mutatesSiblingState}`],
      ["Imports runtime payload", `${preflight.importsRuntimePayload}`],
      ["Accepts synthetic evidence", `${preflight.acceptsSyntheticEvidence}`],
      ["Contains secret value", `${preflight.containsSecretValue}`],
      ["Gate count", `${preflight.gateCount}`],
      ["Passed gate count", `${preflight.passedGateCount}`],
      ["Blocked reason codes", `${preflight.blockedReasonCodes.join(", ") || "none"}`],
      ["Signed approval capture artifact draft text package compared evidence evaluation preflight digest", `${preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest}`],
    ],
    sections: [
      {
        heading: "Evaluation Rules",
        lines: renderVerificationSeparatedBlockLines(preflight.rules, renderRule),
        bodyLeadingBlankLine: preflight.rules.length > 0,
      },
      {
        heading: "Guards",
        lines: renderVerificationSeparatedBlockLines(preflight.guards, renderGuard),
        bodyLeadingBlankLine: preflight.guards.length > 0,
      },
    ],
  });
}

function renderRule(
  rule: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight["rules"][number],
): string[] {
  return [
    `### ${rule.order}. ${rule.nodeVersion} ${rule.code}`,
    `- Rule name: ${rule.ruleName}`,
    `- Kind: ${rule.kind}`,
    `- Source intake slot count: ${rule.sourceIntakeSlotCount}`,
    `- Source intake guard count: ${rule.sourceIntakeGuardCount}`,
    `- Ready source intake slot count: ${rule.readySourceIntakeSlotCount}`,
    `- Ready source intake guard count: ${rule.readySourceIntakeGuardCount}`,
    `- Expected candidate field: ${rule.expectedCandidateField}`,
    `- Evaluation question: ${rule.evaluationQuestion}`,
    `- Ready for compared evidence evaluation rule: ${rule.readyForComparedEvidenceEvaluationRule}`,
    `- Real evidence candidate satisfied: ${rule.realEvidenceCandidateSatisfied}`,
    `- Candidate value present: ${rule.candidateValuePresent}`,
    `- Candidate materialized: ${rule.candidateMaterialized}`,
    `- Candidate accepted: ${rule.candidateAccepted}`,
    `- Read only: ${rule.readOnly}`,
    `- Writes allowed: ${rule.writesAllowed}`,
    `- Mutates sibling state: ${rule.mutatesSiblingState}`,
  ];
}

function renderGuard(
  guard: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight["guards"][number],
): string[] {
  return [
    `### ${guard.order}. ${guard.nodeVersion} ${guard.code}`,
    `- Kind: ${guard.kind}`,
    `- Source rule code: ${guard.sourceRuleCode}`,
    `- Source rule ready: ${guard.sourceRuleReady}`,
    `- Guard code: ${guard.guardCode}`,
    `- Guard text: ${guard.guardText}`,
    `- Rejects missing candidate: ${guard.rejectsMissingCandidate}`,
    `- Rejects synthetic candidate: ${guard.rejectsSyntheticCandidate}`,
    `- Blocks candidate acceptance: ${guard.blocksCandidateAcceptance}`,
    `- Blocks approval grant: ${guard.blocksApprovalGrant}`,
    `- Blocks signed approval: ${guard.blocksSignedApproval}`,
    `- Blocks runtime payload: ${guard.blocksRuntimePayload}`,
    `- Blocks writes: ${guard.blocksWrites}`,
    `- Blocks sibling mutation: ${guard.blocksSiblingMutation}`,
    `- Ready for compared evidence evaluation guard: ${guard.readyForComparedEvidenceEvaluationGuard}`,
    `- Read only: ${guard.readOnly}`,
    `- Writes allowed: ${guard.writesAllowed}`,
    `- Mutates sibling state: ${guard.mutatesSiblingState}`,
  ];
}
