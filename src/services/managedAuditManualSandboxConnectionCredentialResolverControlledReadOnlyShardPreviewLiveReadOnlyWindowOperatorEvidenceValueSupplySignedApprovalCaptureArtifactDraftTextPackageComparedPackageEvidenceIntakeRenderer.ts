import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";
import {
  renderVerificationReportMarkdown,
  renderVerificationSeparatedBlockLines,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeMarkdown(
  intake:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package compared package evidence intake",
    meta: [
      ["Signed approval capture artifact draft text package compared package evidence intake version", `${intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion}`],
      ["Source signed approval capture artifact draft text package comparison acceptance precheck version", `${intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion}`],
      ["Artifact draft text package compared package evidence intake state", `${intake.artifactDraftTextPackageComparedPackageEvidenceIntakeState}`],
      ["Ready for manual compared package evidence intake contract", `${intake.readyForManualComparedPackageEvidenceIntakeContract}`],
      ["Ready for real compared package evidence intake", `${intake.readyForRealComparedPackageEvidenceIntake}`],
      ["Ready for signed approval artifact draft text package comparison acceptance precheck", `${intake.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck}`],
      ["Slot count", `${intake.slotCount}`],
      ["Guard count", `${intake.guardCount}`],
      ["Source acceptance checkpoint count", `${intake.sourceAcceptanceCheckpointCount}`],
      ["Source acceptance guard count", `${intake.sourceAcceptanceGuardCount}`],
      ["Ready slot count", `${intake.readySlotCount}`],
      ["Ready guard count", `${intake.readyGuardCount}`],
      ["Expected real compared package evidence slot count", `${intake.expectedRealComparedPackageEvidenceSlotCount}`],
      ["Real compared package evidence count", `${intake.realComparedPackageEvidenceCount}`],
      ["Manual compared package evidence materialized count", `${intake.manualComparedPackageEvidenceMaterializedCount}`],
      ["Synthetic compared package evidence count", `${intake.syntheticComparedPackageEvidenceCount}`],
      ["Actual draft text package acceptance evidence count", `${intake.actualDraftTextPackageAcceptanceEvidenceCount}`],
      ["Compared draft text package count", `${intake.comparedDraftTextPackageCount}`],
      ["Accepted draft text package count", `${intake.acceptedDraftTextPackageCount}`],
      ["Approval grant present", `${intake.approvalGrantPresent}`],
      ["Signed approval present", `${intake.signedApprovalPresent}`],
      ["Execution allowed", `${intake.executionAllowed}`],
      ["Write routing allowed", `${intake.writeRoutingAllowed}`],
      ["Starts services", `${intake.startsServices}`],
      ["Mutates sibling state", `${intake.mutatesSiblingState}`],
      ["Imports runtime payload", `${intake.importsRuntimePayload}`],
      ["Accepts synthetic evidence", `${intake.acceptsSyntheticEvidence}`],
      ["Contains secret value", `${intake.containsSecretValue}`],
      ["Gate count", `${intake.gateCount}`],
      ["Passed gate count", `${intake.passedGateCount}`],
      ["Blocked reason codes", `${intake.blockedReasonCodes.join(", ") || "none"}`],
      ["Signed approval capture artifact draft text package compared package evidence intake digest", `${intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest}`],
    ],
    sections: [
      {
        heading: "Evidence Slots",
        lines: renderVerificationSeparatedBlockLines(intake.slots, renderSlot),
        bodyLeadingBlankLine: intake.slots.length > 0,
      },
      {
        heading: "Guards",
        lines: renderVerificationSeparatedBlockLines(intake.guards, renderGuard),
        bodyLeadingBlankLine: intake.guards.length > 0,
      },
    ],
  });
}

function renderSlot(
  slot: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake["slots"][number],
): string[] {
  return [
    `### ${slot.order}. ${slot.nodeVersion} ${slot.code}`,
    `- Slot name: ${slot.slotName}`,
    `- Kind: ${slot.kind}`,
    `- Slot mode: ${slot.slotMode}`,
    `- Source acceptance checkpoint count: ${slot.sourceAcceptanceCheckpointCount}`,
    `- Source acceptance guard count: ${slot.sourceAcceptanceGuardCount}`,
    `- Ready source acceptance checkpoint count: ${slot.readySourceAcceptanceCheckpointCount}`,
    `- Ready source acceptance guard count: ${slot.readySourceAcceptanceGuardCount}`,
    `- Required real evidence: ${slot.requiredRealEvidence}`,
    `- Manual evidence field: ${slot.manualEvidenceField}`,
    `- Ready for manual compared package evidence intake slot: ${slot.readyForManualComparedPackageEvidenceIntakeSlot}`,
    `- Manual compared package evidence materialized: ${slot.manualComparedPackageEvidenceMaterialized}`,
    `- Real compared package evidence present: ${slot.realComparedPackageEvidencePresent}`,
    `- Synthetic compared package evidence present: ${slot.syntheticComparedPackageEvidencePresent}`,
    `- Compared package accepted: ${slot.comparedPackageAccepted}`,
    `- Approval grant present: ${slot.approvalGrantPresent}`,
    `- Read only: ${slot.readOnly}`,
    `- Writes allowed: ${slot.writesAllowed}`,
    `- Mutates sibling state: ${slot.mutatesSiblingState}`,
  ];
}

function renderGuard(
  guard: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake["guards"][number],
): string[] {
  return [
    `### ${guard.order}. ${guard.nodeVersion} ${guard.code}`,
    `- Kind: ${guard.kind}`,
    `- Source slot code: ${guard.sourceSlotCode}`,
    `- Source slot ready: ${guard.sourceSlotReady}`,
    `- Guard code: ${guard.guardCode}`,
    `- Guard text: ${guard.guardText}`,
    `- Rejects missing real compared package evidence: ${guard.rejectsMissingRealComparedPackageEvidence}`,
    `- Rejects synthetic compared package evidence: ${guard.rejectsSyntheticComparedPackageEvidence}`,
    `- Blocks compared package acceptance: ${guard.blocksComparedPackageAcceptance}`,
    `- Blocks approval grant: ${guard.blocksApprovalGrant}`,
    `- Blocks signed approval: ${guard.blocksSignedApproval}`,
    `- Blocks runtime payload: ${guard.blocksRuntimePayload}`,
    `- Blocks writes: ${guard.blocksWrites}`,
    `- Blocks sibling mutation: ${guard.blocksSiblingMutation}`,
    `- Ready for manual compared package evidence intake guard: ${guard.readyForManualComparedPackageEvidenceIntakeGuard}`,
    `- Read only: ${guard.readOnly}`,
    `- Writes allowed: ${guard.writesAllowed}`,
    `- Mutates sibling state: ${guard.mutatesSiblingState}`,
  ];
}
