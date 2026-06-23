import type {
  ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestTypes.js";
import {
  renderVerificationReportMarkdown,
  renderVerificationSeparatedBlockLines,
} from "./verificationReportBuilder.js";

type CandidateDocumentRequestPackage = ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage;

export function renderControlledReadOnlyShardPreviewCandidateDocumentRequestPackageMarkdown(
  requestPackage: CandidateDocumentRequestPackage,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview candidate document request package",
    meta: [
      ["Candidate document request package version", requestPackage.candidateDocumentRequestPackageVersion],
      ["Source candidate intake version", requestPackage.sourceCandidateIntakeVersion],
      ["Candidate document request package state", requestPackage.candidateDocumentRequestPackageState],
      ["Ready for candidate document request package", requestPackage.readyForCandidateDocumentRequestPackage],
      ["Ready for real compared package evidence candidate document", requestPackage.readyForRealComparedPackageEvidenceCandidateDocument],
      ["Ready for candidate document intake", requestPackage.readyForCandidateDocumentIntake],
      ["Ready for candidate payload import", requestPackage.readyForCandidatePayloadImport],
      ["Ready for candidate evaluation", requestPackage.readyForCandidateEvaluation],
      ["Ready for approval grant", requestPackage.readyForApprovalGrant],
      ["Ready for signed approval", requestPackage.readyForSignedApproval],
      ["Request item count", requestPackage.requestItemCount],
      ["Acceptance check count", requestPackage.acceptanceCheckCount],
      ["Source intake slot count", requestPackage.sourceIntakeSlotCount],
      ["Source intake guard count", requestPackage.sourceIntakeGuardCount],
      ["Ready request item count", requestPackage.readyRequestItemCount],
      ["Ready acceptance check count", requestPackage.readyAcceptanceCheckCount],
      ["Required candidate field count", requestPackage.requiredCandidateFieldCount],
      ["Requested candidate field count", requestPackage.requestedCandidateFieldCount],
      ["Real candidate document count", requestPackage.realCandidateDocumentCount],
      ["Synthetic candidate document count", requestPackage.syntheticCandidateDocumentCount],
      ["Staged candidate document count", requestPackage.stagedCandidateDocumentCount],
      ["Imported candidate payload count", requestPackage.importedCandidatePayloadCount],
      ["Evaluated candidate payload count", requestPackage.evaluatedCandidatePayloadCount],
      ["Accepted candidate payload count", requestPackage.acceptedCandidatePayloadCount],
      ["Candidate document request allowed", requestPackage.candidateDocumentRequestAllowed],
      ["Candidate document intake allowed", requestPackage.candidateDocumentIntakeAllowed],
      ["Candidate payload import allowed", requestPackage.candidatePayloadImportAllowed],
      ["Candidate evaluation allowed", requestPackage.candidateEvaluationAllowed],
      ["Execution allowed", requestPackage.executionAllowed],
      ["Write routing allowed", requestPackage.writeRoutingAllowed],
      ["Starts services", requestPackage.startsServices],
      ["Mutates sibling state", requestPackage.mutatesSiblingState],
      ["Imports runtime payload", requestPackage.importsRuntimePayload],
      ["Accepts synthetic evidence", requestPackage.acceptsSyntheticEvidence],
      ["Contains secret value", requestPackage.containsSecretValue],
      ["Gate count", requestPackage.gateCount],
      ["Passed gate count", requestPackage.passedGateCount],
      ["Blocked reason codes", requestPackage.blockedReasonCodes.join(", ") || "none"],
      ["Source candidate intake digest", requestPackage.sourceCandidateIntakeDigest],
      ["Candidate document request package digest", requestPackage.candidateDocumentRequestPackageDigest],
    ],
    sections: [
      {
        heading: "Request Items",
        lines: renderVerificationSeparatedBlockLines(requestPackage.requestItems, renderRequestItem),
        bodyLeadingBlankLine: requestPackage.requestItems.length > 0,
      },
      {
        heading: "Acceptance Checks",
        lines: renderVerificationSeparatedBlockLines(requestPackage.acceptanceChecks, renderAcceptanceCheck),
        bodyLeadingBlankLine: requestPackage.acceptanceChecks.length > 0,
      },
    ],
  });
}

function renderRequestItem(
  item: CandidateDocumentRequestPackage["requestItems"][number],
): string[] {
  return [
    `### ${item.order}. ${item.nodeVersion} ${item.code}`,
    `- Item name: ${item.itemName}`,
    `- Kind: ${item.kind}`,
    `- Source slot codes: ${item.sourceSlotCodes.join(", ") || "none"}`,
    `- Source guard codes: ${item.sourceGuardCodes.join(", ") || "none"}`,
    `- Source ready: ${item.sourceReady}`,
    `- Candidate fields: ${item.candidateFields.join(", ") || "none"}`,
    `- Candidate field count: ${item.candidateFieldCount}`,
    `- Request instruction: ${item.requestInstruction}`,
    `- Acceptance criterion: ${item.acceptanceCriterion}`,
    `- Ready for candidate document request item: ${item.readyForCandidateDocumentRequestItem}`,
    `- Requires real candidate document: ${item.requiresRealCandidateDocument}`,
    `- Real candidate document count: ${item.realCandidateDocumentCount}`,
    `- Synthetic candidate document count: ${item.syntheticCandidateDocumentCount}`,
    `- Imported candidate payload count: ${item.importedCandidatePayloadCount}`,
    `- Evaluated candidate payload count: ${item.evaluatedCandidatePayloadCount}`,
    `- Accepted candidate payload count: ${item.acceptedCandidatePayloadCount}`,
    `- Read only: ${item.readOnly}`,
    `- Writes allowed: ${item.writesAllowed}`,
    `- Mutates sibling state: ${item.mutatesSiblingState}`,
  ];
}

function renderAcceptanceCheck(
  check: CandidateDocumentRequestPackage["acceptanceChecks"][number],
): string[] {
  return [
    `### ${check.order}. ${check.nodeVersion} ${check.code}`,
    `- Kind: ${check.kind}`,
    `- Source item code: ${check.sourceItemCode}`,
    `- Source item ready: ${check.sourceItemReady}`,
    `- Check text: ${check.checkText}`,
    `- Rejects missing candidate document: ${check.rejectsMissingCandidateDocument}`,
    `- Rejects synthetic candidate document: ${check.rejectsSyntheticCandidateDocument}`,
    `- Quarantines unreviewed candidate document: ${check.quarantinesUnreviewedCandidateDocument}`,
    `- Blocks candidate payload import: ${check.blocksCandidatePayloadImport}`,
    `- Blocks candidate evaluation: ${check.blocksCandidateEvaluation}`,
    `- Blocks candidate acceptance: ${check.blocksCandidateAcceptance}`,
    `- Blocks approval grant: ${check.blocksApprovalGrant}`,
    `- Blocks signed approval: ${check.blocksSignedApproval}`,
    `- Blocks runtime payload: ${check.blocksRuntimePayload}`,
    `- Blocks writes: ${check.blocksWrites}`,
    `- Blocks sibling mutation: ${check.blocksSiblingMutation}`,
    `- Ready for candidate document request check: ${check.readyForCandidateDocumentRequestCheck}`,
    `- Read only: ${check.readOnly}`,
    `- Writes allowed: ${check.writesAllowed}`,
    `- Mutates sibling state: ${check.mutatesSiblingState}`,
  ];
}
