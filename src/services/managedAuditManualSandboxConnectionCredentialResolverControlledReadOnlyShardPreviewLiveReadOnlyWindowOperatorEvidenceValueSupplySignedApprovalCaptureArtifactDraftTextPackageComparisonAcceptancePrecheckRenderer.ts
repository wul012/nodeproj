import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";
import {
  renderVerificationReportMarkdown,
  renderVerificationSeparatedBlockLines,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckMarkdown(
  precheck:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package comparison acceptance precheck",
    meta: [
      ["Signed approval capture artifact draft text package comparison acceptance precheck version", `${precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion}`],
      ["Source signed approval capture artifact draft text package comparison preflight version", `${precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion}`],
      ["Artifact draft text package comparison acceptance precheck state", `${precheck.artifactDraftTextPackageComparisonAcceptancePrecheckState}`],
      ["Ready for signed approval artifact draft text package comparison acceptance precheck", `${precheck.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck}`],
      ["Ready for offline signed approval draft text package acceptance precheck", `${precheck.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck}`],
      ["Ready for offline signed approval draft text package comparison", `${precheck.readyForOfflineSignedApprovalDraftTextPackageComparison}`],
      ["Checkpoint count", `${precheck.checkpointCount}`],
      ["Guard count", `${precheck.guardCount}`],
      ["Source comparison lane count", `${precheck.sourceComparisonLaneCount}`],
      ["Source acceptance control count", `${precheck.sourceAcceptanceControlCount}`],
      ["Ready checkpoint count", `${precheck.readyCheckpointCount}`],
      ["Ready guard count", `${precheck.readyGuardCount}`],
      ["Actual draft text package acceptance evidence count", `${precheck.actualDraftTextPackageAcceptanceEvidenceCount}`],
      ["Submitted draft text package count", `${precheck.submittedDraftTextPackageCount}`],
      ["Compared draft text package count", `${precheck.comparedDraftTextPackageCount}`],
      ["Accepted draft text package count", `${precheck.acceptedDraftTextPackageCount}`],
      ["Rejected draft text package count", `${precheck.rejectedDraftTextPackageCount}`],
      ["Signed draft text count", `${precheck.signedDraftTextCount}`],
      ["Draft signature payload count", `${precheck.draftSignaturePayloadCount}`],
      ["Approval captured", `${precheck.approvalCaptured}`],
      ["Approval grant present", `${precheck.approvalGrantPresent}`],
      ["Execution allowed", `${precheck.executionAllowed}`],
      ["Write routing allowed", `${precheck.writeRoutingAllowed}`],
      ["Starts services", `${precheck.startsServices}`],
      ["Mutates sibling state", `${precheck.mutatesSiblingState}`],
      ["Imports runtime payload", `${precheck.importsRuntimePayload}`],
      ["Accepts synthetic evidence", `${precheck.acceptsSyntheticEvidence}`],
      ["Contains secret value", `${precheck.containsSecretValue}`],
      ["Gate count", `${precheck.gateCount}`],
      ["Passed gate count", `${precheck.passedGateCount}`],
      ["Blocked reason codes", `${precheck.blockedReasonCodes.join(", ") || "none"}`],
      ["Signed approval capture artifact draft text package comparison acceptance precheck digest", `${precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest}`],
    ],
    sections: [
      {
        heading: "Checkpoints",
        lines: renderVerificationSeparatedBlockLines(precheck.checkpoints, renderCheckpoint),
        bodyLeadingBlankLine: precheck.checkpoints.length > 0,
      },
      {
        heading: "Guards",
        lines: renderVerificationSeparatedBlockLines(precheck.guards, renderGuard),
        bodyLeadingBlankLine: precheck.guards.length > 0,
      },
    ],
  });
}

function renderCheckpoint(
  checkpoint: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck["checkpoints"][number],
): string[] {
  return [
    `### ${checkpoint.order}. ${checkpoint.nodeVersion} ${checkpoint.code}`,
    `- Checkpoint name: ${checkpoint.checkpointName}`,
    `- Kind: ${checkpoint.kind}`,
    `- Checkpoint mode: ${checkpoint.checkpointMode}`,
    `- Source comparison lane count: ${checkpoint.sourceComparisonLaneCount}`,
    `- Source acceptance control count: ${checkpoint.sourceAcceptanceControlCount}`,
    `- Ready source comparison lane count: ${checkpoint.readySourceComparisonLaneCount}`,
    `- Ready source acceptance control count: ${checkpoint.readySourceAcceptanceControlCount}`,
    `- Acceptance precheck question: ${checkpoint.acceptancePrecheckQuestion}`,
    `- Required acceptance evidence: ${checkpoint.requiredAcceptanceEvidence}`,
    `- Ready for offline signed approval draft text package acceptance precheck checkpoint: ${checkpoint.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint}`,
    `- Draft text package accepted: ${checkpoint.draftTextPackageAccepted}`,
    `- Approval grant present: ${checkpoint.approvalGrantPresent}`,
    `- Read only: ${checkpoint.readOnly}`,
    `- Writes allowed: ${checkpoint.writesAllowed}`,
    `- Mutates sibling state: ${checkpoint.mutatesSiblingState}`,
  ];
}

function renderGuard(
  guard: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck["guards"][number],
): string[] {
  return [
    `### ${guard.order}. ${guard.nodeVersion} ${guard.code}`,
    `- Kind: ${guard.kind}`,
    `- Source checkpoint code: ${guard.sourceCheckpointCode}`,
    `- Source checkpoint ready: ${guard.sourceCheckpointReady}`,
    `- Guard code: ${guard.guardCode}`,
    `- Guard text: ${guard.guardText}`,
    `- Rejects missing acceptance evidence: ${guard.rejectsMissingAcceptanceEvidence}`,
    `- Blocks draft text package acceptance: ${guard.blocksDraftTextPackageAcceptance}`,
    `- Blocks approval grant: ${guard.blocksApprovalGrant}`,
    `- Blocks runtime payload: ${guard.blocksRuntimePayload}`,
    `- Blocks writes: ${guard.blocksWrites}`,
    `- Blocks sibling mutation: ${guard.blocksSiblingMutation}`,
    `- Ready for offline signed approval draft text package acceptance precheck guard: ${guard.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard}`,
    `- Read only: ${guard.readOnly}`,
    `- Writes allowed: ${guard.writesAllowed}`,
    `- Mutates sibling state: ${guard.mutatesSiblingState}`,
  ];
}
