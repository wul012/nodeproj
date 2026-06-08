import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeTypes.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeMarkdown(
  intake:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake,
): string {
  const lines: string[] = [
    "# Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package compared evidence candidate intake",
    "",
    `- Signed approval capture artifact draft text package compared evidence candidate intake version: ${intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion}`,
    `- Source signed approval capture artifact draft text package compared evidence candidate version: ${intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion}`,
    `- Artifact draft text package compared evidence candidate intake state: ${intake.artifactDraftTextPackageComparedEvidenceCandidateIntakeState}`,
    `- Ready for compared evidence candidate intake preflight contract: ${intake.readyForComparedEvidenceCandidateIntakePreflightContract}`,
    `- Ready for real compared package evidence candidate document intake: ${intake.readyForRealComparedPackageEvidenceCandidateDocumentIntake}`,
    `- Ready for compared evidence candidate blueprint contract: ${intake.readyForComparedEvidenceCandidateBlueprintContract}`,
    `- Intake slot count: ${intake.intakeSlotCount}`,
    `- Intake guard count: ${intake.intakeGuardCount}`,
    `- Source blueprint section count: ${intake.sourceBlueprintSectionCount}`,
    `- Source blueprint blocker count: ${intake.sourceBlueprintBlockerCount}`,
    `- Ready intake slot count: ${intake.readyIntakeSlotCount}`,
    `- Ready intake guard count: ${intake.readyIntakeGuardCount}`,
    `- Required candidate field count: ${intake.requiredCandidateFieldCount}`,
    `- Source candidate field count: ${intake.sourceCandidateFieldCount}`,
    `- Real candidate document count: ${intake.realCandidateDocumentCount}`,
    `- Synthetic candidate document count: ${intake.syntheticCandidateDocumentCount}`,
    `- Staged candidate document count: ${intake.stagedCandidateDocumentCount}`,
    `- Imported candidate payload count: ${intake.importedCandidatePayloadCount}`,
    `- Evaluated candidate payload count: ${intake.evaluatedCandidatePayloadCount}`,
    `- Accepted candidate payload count: ${intake.acceptedCandidatePayloadCount}`,
    `- Approval grant present: ${intake.approvalGrantPresent}`,
    `- Signed approval present: ${intake.signedApprovalPresent}`,
    `- Candidate document intake allowed: ${intake.candidateDocumentIntakeAllowed}`,
    `- Candidate payload import allowed: ${intake.candidatePayloadImportAllowed}`,
    `- Candidate evaluation allowed: ${intake.candidateEvaluationAllowed}`,
    `- Execution allowed: ${intake.executionAllowed}`,
    `- Write routing allowed: ${intake.writeRoutingAllowed}`,
    `- Starts services: ${intake.startsServices}`,
    `- Mutates sibling state: ${intake.mutatesSiblingState}`,
    `- Imports runtime payload: ${intake.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${intake.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${intake.containsSecretValue}`,
    `- Gate count: ${intake.gateCount}`,
    `- Passed gate count: ${intake.passedGateCount}`,
    `- Blocked reason codes: ${intake.blockedReasonCodes.join(", ") || "none"}`,
    `- Source signed approval capture artifact draft text package compared evidence candidate digest: ${intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest}`,
    `- Signed approval capture artifact draft text package compared evidence candidate intake digest: ${intake.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest}`,
    "",
    "## Intake Slots",
  ];

  for (const slot of intake.slots) {
    lines.push(
      "",
      `### ${slot.order}. ${slot.nodeVersion} ${slot.code}`,
      `- Slot name: ${slot.slotName}`,
      `- Kind: ${slot.kind}`,
      `- Source section kind: ${slot.sourceSectionKind}`,
      `- Source section code: ${slot.sourceSectionCode}`,
      `- Source section ready: ${slot.sourceSectionReady}`,
      `- Source blocker ready: ${slot.sourceBlockerReady}`,
      `- Candidate fields: ${slot.candidateFields.join(", ")}`,
      `- Candidate field count: ${slot.candidateFieldCount}`,
      `- Intake question: ${slot.intakeQuestion}`,
      `- Ready for compared evidence candidate intake slot: ${slot.readyForComparedEvidenceCandidateIntakeSlot}`,
      `- Requires real candidate document: ${slot.requiresRealCandidateDocument}`,
      `- Real candidate document count: ${slot.realCandidateDocumentCount}`,
      `- Synthetic candidate document count: ${slot.syntheticCandidateDocumentCount}`,
      `- Imported candidate payload count: ${slot.importedCandidatePayloadCount}`,
      `- Evaluated candidate payload count: ${slot.evaluatedCandidatePayloadCount}`,
      `- Accepted candidate payload count: ${slot.acceptedCandidatePayloadCount}`,
      `- Read only: ${slot.readOnly}`,
      `- Writes allowed: ${slot.writesAllowed}`,
      `- Mutates sibling state: ${slot.mutatesSiblingState}`,
    );
  }

  lines.push("", "## Intake Guards");

  for (const guard of intake.guards) {
    lines.push(
      "",
      `### ${guard.order}. ${guard.nodeVersion} ${guard.code}`,
      `- Kind: ${guard.kind}`,
      `- Source slot code: ${guard.sourceSlotCode}`,
      `- Source slot ready: ${guard.sourceSlotReady}`,
      `- Guard text: ${guard.guardText}`,
      `- Rejects missing candidate document: ${guard.rejectsMissingCandidateDocument}`,
      `- Rejects synthetic candidate document: ${guard.rejectsSyntheticCandidateDocument}`,
      `- Quarantines unreviewed candidate document: ${guard.quarantinesUnreviewedCandidateDocument}`,
      `- Blocks candidate payload import: ${guard.blocksCandidatePayloadImport}`,
      `- Blocks candidate evaluation: ${guard.blocksCandidateEvaluation}`,
      `- Blocks candidate acceptance: ${guard.blocksCandidateAcceptance}`,
      `- Blocks approval grant: ${guard.blocksApprovalGrant}`,
      `- Blocks signed approval: ${guard.blocksSignedApproval}`,
      `- Blocks runtime payload: ${guard.blocksRuntimePayload}`,
      `- Blocks writes: ${guard.blocksWrites}`,
      `- Blocks sibling mutation: ${guard.blocksSiblingMutation}`,
      `- Ready for compared evidence candidate intake guard: ${guard.readyForComparedEvidenceCandidateIntakeGuard}`,
      `- Read only: ${guard.readOnly}`,
      `- Writes allowed: ${guard.writesAllowed}`,
      `- Mutates sibling state: ${guard.mutatesSiblingState}`,
    );
  }

  return `${lines.join("\n")}\n`;
}
