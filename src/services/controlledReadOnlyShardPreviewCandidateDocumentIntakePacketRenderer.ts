import type {
  ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketTypes.js";

export function renderControlledReadOnlyShardPreviewCandidateDocumentIntakePacketMarkdown(
  packet: ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket,
): string {
  const lines: string[] = [
    "# Controlled read-only shard preview candidate document intake packet",
    "",
    `- Candidate document intake packet version: ${packet.candidateDocumentIntakePacketVersion}`,
    `- Source candidate document submission precheck version: ${packet.sourceCandidateDocumentSubmissionPrecheckVersion}`,
    `- Candidate document intake packet state: ${packet.candidateDocumentIntakePacketState}`,
    `- Ready for candidate document intake packet: ${packet.readyForCandidateDocumentIntakePacket}`,
    `- Ready for reviewed real candidate document intake: ${packet.readyForReviewedRealCandidateDocumentIntake}`,
    `- Ready for candidate payload import: ${packet.readyForCandidatePayloadImport}`,
    `- Ready for candidate evaluation: ${packet.readyForCandidateEvaluation}`,
    `- Intake slot count: ${packet.intakeSlotCount}`,
    `- Intake guard count: ${packet.intakeGuardCount}`,
    `- Source checkpoint count: ${packet.sourceCheckpointCount}`,
    `- Source validator count: ${packet.sourceValidatorCount}`,
    `- Ready intake slot count: ${packet.readyIntakeSlotCount}`,
    `- Ready intake guard count: ${packet.readyIntakeGuardCount}`,
    `- Required candidate field count: ${packet.requiredCandidateFieldCount}`,
    `- Intake candidate field count: ${packet.intakeCandidateFieldCount}`,
    `- Reviewed real candidate document present: ${packet.reviewedRealCandidateDocumentPresent}`,
    `- Real candidate document count: ${packet.realCandidateDocumentCount}`,
    `- Synthetic candidate document count: ${packet.syntheticCandidateDocumentCount}`,
    `- Staged candidate document count: ${packet.stagedCandidateDocumentCount}`,
    `- Imported candidate payload count: ${packet.importedCandidatePayloadCount}`,
    `- Evaluated candidate payload count: ${packet.evaluatedCandidatePayloadCount}`,
    `- Accepted candidate payload count: ${packet.acceptedCandidatePayloadCount}`,
    `- Candidate document submission allowed: ${packet.candidateDocumentSubmissionAllowed}`,
    `- Candidate document intake allowed: ${packet.candidateDocumentIntakeAllowed}`,
    `- Candidate payload import allowed: ${packet.candidatePayloadImportAllowed}`,
    `- Candidate evaluation allowed: ${packet.candidateEvaluationAllowed}`,
    `- Execution allowed: ${packet.executionAllowed}`,
    `- Write routing allowed: ${packet.writeRoutingAllowed}`,
    `- Imports runtime payload: ${packet.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${packet.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${packet.containsSecretValue}`,
    `- Gate count: ${packet.gateCount}`,
    `- Passed gate count: ${packet.passedGateCount}`,
    `- Blocked reason codes: ${packet.blockedReasonCodes.join(", ") || "none"}`,
    `- Source candidate document submission precheck digest: ${packet.sourceCandidateDocumentSubmissionPrecheckDigest}`,
    `- Candidate document intake packet digest: ${packet.candidateDocumentIntakePacketDigest}`,
    "",
    "## Intake Slots",
  ];

  for (const slot of packet.slots) {
    lines.push(
      "",
      `### ${slot.order}. ${slot.nodeVersion} ${slot.code}`,
      `- Slot name: ${slot.slotName}`,
      `- Kind: ${slot.kind}`,
      `- Source checkpoint codes: ${slot.sourceCheckpointCodes.join(", ") || "none"}`,
      `- Source validator codes: ${slot.sourceValidatorCodes.join(", ") || "none"}`,
      `- Source ready: ${slot.sourceReady}`,
      `- Candidate fields: ${slot.candidateFields.join(", ") || "none"}`,
      `- Candidate field count: ${slot.candidateFieldCount}`,
      `- Intake instruction: ${slot.intakeInstruction}`,
      `- Guard criterion: ${slot.guardCriterion}`,
      `- Ready for candidate document intake slot: ${slot.readyForCandidateDocumentIntakeSlot}`,
      `- Requires reviewed real candidate document: ${slot.requiresReviewedRealCandidateDocument}`,
      `- Reviewed real candidate document present: ${slot.reviewedRealCandidateDocumentPresent}`,
      `- Real candidate document count: ${slot.realCandidateDocumentCount}`,
      `- Imported candidate payload count: ${slot.importedCandidatePayloadCount}`,
      `- Evaluated candidate payload count: ${slot.evaluatedCandidatePayloadCount}`,
      `- Read only: ${slot.readOnly}`,
      `- Writes allowed: ${slot.writesAllowed}`,
      `- Mutates sibling state: ${slot.mutatesSiblingState}`,
    );
  }

  lines.push("", "## Intake Guards");

  for (const guard of packet.guards) {
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
      `- Ready for candidate document intake guard: ${guard.readyForCandidateDocumentIntakeGuard}`,
      `- Read only: ${guard.readOnly}`,
      `- Writes allowed: ${guard.writesAllowed}`,
      `- Mutates sibling state: ${guard.mutatesSiblingState}`,
    );
  }

  return lines.join("\n");
}
