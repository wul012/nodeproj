import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";
import {
  renderVerificationReportMarkdown,
  trimVerificationTrailingBlankLine,
} from "./verificationReportBuilder.js";

type ComparisonPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight;
type ComparisonLane =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane;
type AcceptanceControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl;

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightMarkdown(
  preflight: ComparisonPreflight,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft text package comparison preflight",
    meta: [],
    sections: [
      {
        heading: "Summary",
        lines: [
          `- Signed approval capture artifact draft text package comparison preflight version: ${preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion}`,
          `- Source signed approval capture artifact draft text package submission preflight version: ${preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion}`,
          `- Artifact draft text package comparison preflight state: ${preflight.artifactDraftTextPackageComparisonPreflightState}`,
          `- Ready for offline signed approval draft text package comparison: ${preflight.readyForOfflineSignedApprovalDraftTextPackageComparison}`,
          `- Comparison lane count: ${preflight.comparisonLaneCount}`,
          `- Acceptance control count: ${preflight.acceptanceControlCount}`,
          `- Compared draft text package count: ${preflight.comparedDraftTextPackageCount}`,
          `- Accepted draft text package count: ${preflight.acceptedDraftTextPackageCount}`,
          `- Gate count: ${preflight.gateCount}`,
          `- Passed gate count: ${preflight.passedGateCount}`,
          `- Blocked reason codes: ${preflight.blockedReasonCodes.join(", ") || "none"}`,
          `- Execution allowed: ${preflight.executionAllowed}`,
          `- Mutates sibling state: ${preflight.mutatesSiblingState}`,
        ],
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Comparison lanes",
        lines: preflight.lanes.flatMap(renderLane),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Acceptance controls",
        lines: trimVerificationTrailingBlankLine(preflight.controls.flatMap(renderControl)),
        bodyLeadingBlankLine: false,
      },
    ],
  });
}

function renderLane(lane: ComparisonLane): string[] {
  return [
    `### ${lane.order}. ${lane.nodeVersion} ${lane.code}`,
    `- Lane name: ${lane.comparisonLaneName}`,
    `- Kind: ${lane.kind}`,
    `- Lane mode: ${lane.laneMode}`,
    `- Source submission slot code: ${lane.sourceSubmissionSlotCode}`,
    `- Source comparison control code: ${lane.sourceComparisonControlCode}`,
    `- Source submission slot ready: ${lane.sourceSubmissionSlotReady}`,
    `- Source comparison control ready: ${lane.sourceComparisonControlReady}`,
    `- Ready for offline comparison lane: ${lane.readyForOfflineSignedApprovalDraftTextPackageComparisonLane}`,
    `- Required comparison evidence: ${lane.requiredComparisonEvidence}`,
    `- Digest recheck question: ${lane.digestRecheckQuestion}`,
    `- Acceptance question: ${lane.acceptanceQuestion}`,
    `- Draft text package compared: ${lane.draftTextPackageCompared}`,
    `- Draft text package accepted: ${lane.draftTextPackageAccepted}`,
    `- Read only: ${lane.readOnly}`,
    `- Mutates sibling state: ${lane.mutatesSiblingState}`,
    "",
  ];
}

function renderControl(control: AcceptanceControl): string[] {
  return [
    `### ${control.order}. ${control.nodeVersion} ${control.code}`,
    `- Kind: ${control.kind}`,
    `- Source comparison lane code: ${control.sourceComparisonLaneCode}`,
    `- Source comparison lane ready: ${control.sourceComparisonLaneReady}`,
    `- Guard code: ${control.guardCode}`,
    `- Guard text: ${control.guardText}`,
    `- Rejects uncompared lane: ${control.rejectsUncomparedLane}`,
    `- Blocks draft text package comparison: ${control.blocksDraftTextPackageComparison}`,
    `- Blocks draft text package acceptance: ${control.blocksDraftTextPackageAcceptance}`,
    `- Blocks runtime payload: ${control.blocksRuntimePayload}`,
    `- Blocks writes: ${control.blocksWrites}`,
    `- Blocks sibling mutation: ${control.blocksSiblingMutation}`,
    `- Ready for acceptance control: ${control.readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl}`,
    "",
  ];
}
