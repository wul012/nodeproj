import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestTypes.js";

export function renderControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackageMarkdown(
  requestPackage: ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage,
): string {
  const lines: string[] = [
    "# Controlled read-only shard preview candidate document material request package",
    "",
    `- Candidate document material request package version: ${requestPackage.candidateDocumentMaterialRequestPackageVersion}`,
    `- Source candidate document intake packet version: ${requestPackage.sourceCandidateDocumentIntakePacketVersion}`,
    `- Candidate document material request package state: ${requestPackage.candidateDocumentMaterialRequestPackageState}`,
    `- Ready for candidate document material request package: ${requestPackage.readyForCandidateDocumentMaterialRequestPackage}`,
    `- Ready for reviewed real candidate document submission: ${requestPackage.readyForReviewedRealCandidateDocumentSubmission}`,
    `- Ready for candidate document material intake: ${requestPackage.readyForCandidateDocumentMaterialIntake}`,
    `- Ready for candidate payload import: ${requestPackage.readyForCandidatePayloadImport}`,
    `- Ready for candidate evaluation: ${requestPackage.readyForCandidateEvaluation}`,
    `- Material request item count: ${requestPackage.materialRequestItemCount}`,
    `- Material acceptance check count: ${requestPackage.materialAcceptanceCheckCount}`,
    `- Source intake slot count: ${requestPackage.sourceIntakeSlotCount}`,
    `- Source intake guard count: ${requestPackage.sourceIntakeGuardCount}`,
    `- Ready material request item count: ${requestPackage.readyMaterialRequestItemCount}`,
    `- Ready material acceptance check count: ${requestPackage.readyMaterialAcceptanceCheckCount}`,
    `- Required material field count: ${requestPackage.requiredMaterialFieldCount}`,
    `- Requested material field count: ${requestPackage.requestedMaterialFieldCount}`,
    `- Reviewed real candidate document material present: ${requestPackage.reviewedRealCandidateDocumentMaterialPresent}`,
    `- Real candidate document count: ${requestPackage.realCandidateDocumentCount}`,
    `- Synthetic candidate document count: ${requestPackage.syntheticCandidateDocumentCount}`,
    `- Staged candidate document count: ${requestPackage.stagedCandidateDocumentCount}`,
    `- Imported candidate payload count: ${requestPackage.importedCandidatePayloadCount}`,
    `- Evaluated candidate payload count: ${requestPackage.evaluatedCandidatePayloadCount}`,
    `- Candidate document material intake allowed: ${requestPackage.candidateDocumentMaterialIntakeAllowed}`,
    `- Candidate payload import allowed: ${requestPackage.candidatePayloadImportAllowed}`,
    `- Candidate evaluation allowed: ${requestPackage.candidateEvaluationAllowed}`,
    `- Execution allowed: ${requestPackage.executionAllowed}`,
    `- Write routing allowed: ${requestPackage.writeRoutingAllowed}`,
    `- Imports runtime payload: ${requestPackage.importsRuntimePayload}`,
    `- Accepts synthetic evidence: ${requestPackage.acceptsSyntheticEvidence}`,
    `- Contains secret value: ${requestPackage.containsSecretValue}`,
    `- Gate count: ${requestPackage.gateCount}`,
    `- Passed gate count: ${requestPackage.passedGateCount}`,
    `- Blocked reason codes: ${requestPackage.blockedReasonCodes.join(", ") || "none"}`,
    `- Source candidate document intake packet digest: ${requestPackage.sourceCandidateDocumentIntakePacketDigest}`,
    `- Candidate document material request package digest: ${requestPackage.candidateDocumentMaterialRequestPackageDigest}`,
    "",
    "## Material Request Items",
  ];

  for (const item of requestPackage.requestItems) {
    lines.push(
      "",
      `### ${item.order}. ${item.nodeVersion} ${item.code}`,
      `- Item name: ${item.itemName}`,
      `- Kind: ${item.kind}`,
      `- Source intake slot codes: ${item.sourceIntakeSlotCodes.join(", ") || "none"}`,
      `- Source intake guard codes: ${item.sourceIntakeGuardCodes.join(", ") || "none"}`,
      `- Source ready: ${item.sourceReady}`,
      `- Material fields: ${item.materialFields.join(", ") || "none"}`,
      `- Material field count: ${item.materialFieldCount}`,
      `- Material instruction: ${item.materialInstruction}`,
      `- Acceptance criterion: ${item.acceptanceCriterion}`,
      `- Ready for candidate document material request item: ${item.readyForCandidateDocumentMaterialRequestItem}`,
      `- Requires reviewed real candidate document: ${item.requiresReviewedRealCandidateDocument}`,
      `- Reviewed real candidate document material present: ${item.reviewedRealCandidateDocumentMaterialPresent}`,
      `- Real candidate document count: ${item.realCandidateDocumentCount}`,
      `- Imported candidate payload count: ${item.importedCandidatePayloadCount}`,
      `- Evaluated candidate payload count: ${item.evaluatedCandidatePayloadCount}`,
      `- Read only: ${item.readOnly}`,
      `- Writes allowed: ${item.writesAllowed}`,
      `- Mutates sibling state: ${item.mutatesSiblingState}`,
    );
  }

  lines.push("", "## Material Acceptance Checks");

  for (const check of requestPackage.acceptanceChecks) {
    lines.push(
      "",
      `### ${check.order}. ${check.nodeVersion} ${check.code}`,
      `- Kind: ${check.kind}`,
      `- Source request item code: ${check.sourceRequestItemCode}`,
      `- Source request item ready: ${check.sourceRequestItemReady}`,
      `- Check text: ${check.checkText}`,
      `- Rejects missing material: ${check.rejectsMissingMaterial}`,
      `- Rejects synthetic material: ${check.rejectsSyntheticMaterial}`,
      `- Quarantines unreviewed material: ${check.quarantinesUnreviewedMaterial}`,
      `- Blocks material intake: ${check.blocksMaterialIntake}`,
      `- Blocks candidate payload import: ${check.blocksCandidatePayloadImport}`,
      `- Blocks candidate evaluation: ${check.blocksCandidateEvaluation}`,
      `- Blocks candidate acceptance: ${check.blocksCandidateAcceptance}`,
      `- Blocks approval grant: ${check.blocksApprovalGrant}`,
      `- Blocks signed approval: ${check.blocksSignedApproval}`,
      `- Blocks runtime payload: ${check.blocksRuntimePayload}`,
      `- Blocks writes: ${check.blocksWrites}`,
      `- Blocks sibling mutation: ${check.blocksSiblingMutation}`,
      `- Ready for candidate document material request check: ${check.readyForCandidateDocumentMaterialRequestCheck}`,
      `- Read only: ${check.readOnly}`,
      `- Writes allowed: ${check.writesAllowed}`,
      `- Mutates sibling state: ${check.mutatesSiblingState}`,
    );
  }

  return lines.join("\n");
}
