import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateMarkdown(
  candidate:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate,
): string {
  const lines: string[] = [
    "# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package compared evidence candidate",
    "",
    `- Signed approval capture artifact draft text package compared evidence candidate version: ${candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion}`,
    `- Source signed approval capture artifact draft text package compared evidence evaluation preflight version: ${candidate.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion}`,
    `- Artifact draft text package compared evidence candidate state: ${candidate.artifactDraftTextPackageComparedEvidenceCandidateState}`,
    `- Ready for compared evidence candidate blueprint contract: ${candidate.readyForComparedEvidenceCandidateBlueprintContract}`,
    `- Ready for real compared package evidence candidate intake: ${candidate.readyForRealComparedPackageEvidenceCandidateIntake}`,
    `- Ready for compared evidence evaluation preflight contract: ${candidate.readyForComparedEvidenceEvaluationPreflightContract}`,
    `- Blueprint section count: ${candidate.blueprintSectionCount}`,
    `- Blueprint blocker count: ${candidate.blueprintBlockerCount}`,
    `- Source evaluation rule count: ${candidate.sourceEvaluationRuleCount}`,
    `- Source evaluation guard count: ${candidate.sourceEvaluationGuardCount}`,
    `- Ready blueprint section count: ${candidate.readyBlueprintSectionCount}`,
    `- Ready blueprint blocker count: ${candidate.readyBlueprintBlockerCount}`,
    `- Candidate field count: ${candidate.candidateFieldCount}`,
    `- Expected candidate field count from preflight: ${candidate.expectedCandidateFieldCountFromPreflight}`,
    `- Real compared package evidence candidate value count: ${candidate.realComparedPackageEvidenceCandidateValueCount}`,
    `- Synthetic compared package evidence candidate value count: ${candidate.syntheticComparedPackageEvidenceCandidateValueCount}`,
    `- Materialized compared package evidence candidate value count: ${candidate.materializedComparedPackageEvidenceCandidateValueCount}`,
    `- Accepted compared package evidence candidate value count: ${candidate.acceptedComparedPackageEvidenceCandidateValueCount}`,
    `- Approval grant present: ${candidate.approvalGrantPresent}`,
    `- Signed approval present: ${candidate.signedApprovalPresent}`,
    `- Candidate blueprint materialization allowed: ${candidate.candidateBlueprintMaterializationAllowed}`,
    `- Candidate evaluation allowed: ${candidate.candidateEvaluationAllowed}`,
    `- Execution allowed: ${candidate.executionAllowed}`,
    `- Write routing allowed: ${candidate.writeRoutingAllowed}`,
    `- Starts services: ${candidate.startsServices}`,
    `- Mutates sibling state: ${candidate.mutatesSiblingState}`,
    `- Imports runtime payload: ${candidate.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${candidate.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${candidate.containsSecretValue}`,
    `- Gate count: ${candidate.gateCount}`,
    `- Passed gate count: ${candidate.passedGateCount}`,
    `- Blocked reason codes: ${candidate.blockedReasonCodes.join(", ") || "none"}`,
    `- Source signed approval capture artifact draft text package compared evidence evaluation preflight digest: ${candidate.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest}`,
    `- Signed approval capture artifact draft text package compared evidence candidate digest: ${candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest}`,
    "",
    "## Candidate Sections",
  ];

  for (const section of candidate.sections) {
    lines.push(
      "",
      `### ${section.order}. ${section.nodeVersion} ${section.code}`,
      `- Section name: ${section.sectionName}`,
      `- Kind: ${section.kind}`,
      `- Source evaluation rule count: ${section.sourceEvaluationRuleCount}`,
      `- Ready source evaluation rule count: ${section.readySourceEvaluationRuleCount}`,
      `- Source evaluation guard count: ${section.sourceEvaluationGuardCount}`,
      `- Ready source evaluation guard count: ${section.readySourceEvaluationGuardCount}`,
      `- Candidate fields: ${section.candidateFields.join(", ")}`,
      `- Candidate field count: ${section.candidateFieldCount}`,
      `- Candidate question: ${section.candidateQuestion}`,
      `- Ready for compared evidence candidate blueprint section: ${section.readyForComparedEvidenceCandidateBlueprintSection}`,
      `- Real candidate value count: ${section.realCandidateValueCount}`,
      `- Synthetic candidate value count: ${section.syntheticCandidateValueCount}`,
      `- Materialized candidate value count: ${section.materializedCandidateValueCount}`,
      `- Accepted candidate value count: ${section.acceptedCandidateValueCount}`,
      `- Blocked by missing real candidate: ${section.blockedByMissingRealCandidate}`,
      `- Read only: ${section.readOnly}`,
      `- Writes allowed: ${section.writesAllowed}`,
      `- Mutates sibling state: ${section.mutatesSiblingState}`,
    );
  }

  lines.push("", "## Candidate Blockers");

  for (const blocker of candidate.blockers) {
    lines.push(
      "",
      `### ${blocker.order}. ${blocker.nodeVersion} ${blocker.code}`,
      `- Kind: ${blocker.kind}`,
      `- Source section code: ${blocker.sourceSectionCode}`,
      `- Source section ready: ${blocker.sourceSectionReady}`,
      `- Blocker text: ${blocker.blockerText}`,
      `- Rejects missing candidate: ${blocker.rejectsMissingCandidate}`,
      `- Rejects synthetic candidate: ${blocker.rejectsSyntheticCandidate}`,
      `- Blocks candidate materialization: ${blocker.blocksCandidateMaterialization}`,
      `- Blocks candidate acceptance: ${blocker.blocksCandidateAcceptance}`,
      `- Blocks approval grant: ${blocker.blocksApprovalGrant}`,
      `- Blocks signed approval: ${blocker.blocksSignedApproval}`,
      `- Blocks runtime payload: ${blocker.blocksRuntimePayload}`,
      `- Blocks writes: ${blocker.blocksWrites}`,
      `- Blocks sibling mutation: ${blocker.blocksSiblingMutation}`,
      `- Ready for compared evidence candidate blueprint blocker: ${blocker.readyForComparedEvidenceCandidateBlueprintBlocker}`,
      `- Read only: ${blocker.readOnly}`,
      `- Writes allowed: ${blocker.writesAllowed}`,
      `- Mutates sibling state: ${blocker.mutatesSiblingState}`,
    );
  }

  return `${lines.join("\n")}\n`;
}
