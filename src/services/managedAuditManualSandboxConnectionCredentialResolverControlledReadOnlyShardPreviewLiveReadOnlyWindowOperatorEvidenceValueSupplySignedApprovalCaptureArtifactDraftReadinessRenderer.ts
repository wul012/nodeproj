import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessTypes.js";
import {
  renderVerificationBlockedReasonLines,
  renderVerificationReportMarkdown,
  trimVerificationTrailingBlankLine,
} from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessMarkdown(
  readiness: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview live read-only window operator evidence value supply signed approval capture artifact draft readiness",
    meta: [
      ["Signed approval capture artifact draft readiness version", readiness.signedApprovalCaptureArtifactDraftReadinessVersion],
      ["Source signed approval capture artifact draft preflight version", readiness.sourceSignedApprovalCaptureArtifactDraftPreflightVersion],
      ["Artifact draft readiness state", readiness.artifactDraftReadinessState],
      ["Ready for signed approval artifact draft readiness", readiness.readyForSignedApprovalArtifactDraftReadiness],
      ["Ready for manual signed approval draft review", readiness.readyForManualSignedApprovalDraftReview],
      ["Ready for signed approval artifact draft", readiness.readyForSignedApprovalArtifactDraft],
      ["Ready for signed approval capture", readiness.readyForSignedApprovalCapture],
      ["Ready for operator value supply", readiness.readyForOperatorValueSupply],
      ["Ready for operator value submission", readiness.readyForOperatorValueSubmission],
      ["Ready for evidence import", readiness.readyForEvidenceImport],
      ["Ready for runtime payload", readiness.readyForRuntimePayload],
      ["Ready for live execution", readiness.readyForLiveExecution],
      ["Ready for production execution", readiness.readyForProductionExecution],
      ["Readiness lane count", readiness.readinessLaneCount],
      ["Readiness control count", readiness.readinessControlCount],
      ["Identity readiness lane count", readiness.identityReadinessLaneCount],
      ["Digest binding readiness lane count", readiness.digestBindingReadinessLaneCount],
      ["Signature envelope readiness lane count", readiness.signatureEnvelopeReadinessLaneCount],
      ["Source evidence readiness lane count", readiness.sourceEvidenceReadinessLaneCount],
      ["Value binding readiness lane count", readiness.valueBindingReadinessLaneCount],
      ["Policy readiness lane count", readiness.policyReadinessLaneCount],
      ["Execution lock readiness lane count", readiness.executionLockReadinessLaneCount],
      ["Archive closeout readiness lane count", readiness.archiveCloseoutReadinessLaneCount],
      ["Ready readiness lane count", readiness.readyReadinessLaneCount],
      ["Ready readiness control count", readiness.readyReadinessControlCount],
      ["Digest binding readiness control count", readiness.digestBindingReadinessControlCount],
      ["Signature envelope readiness control count", readiness.signatureEnvelopeReadinessControlCount],
      ["Policy readiness control count", readiness.policyReadinessControlCount],
      ["Execution lock readiness control count", readiness.executionLockReadinessControlCount],
      ["Archive closeout readiness control count", readiness.archiveCloseoutReadinessControlCount],
      ["Manual draft materialized count", readiness.manualDraftMaterializedCount],
      ["Draft artifact created", readiness.draftArtifactCreated],
      ["Draft artifact materialized count", readiness.draftArtifactMaterializedCount],
      ["Draft signature payload count", readiness.draftSignaturePayloadCount],
      ["Approval captured", readiness.approvalCaptured],
      ["Approval grant present", readiness.approvalGrantPresent],
      ["Signed approval present", readiness.signedApprovalPresent],
      ["Source signed approval capture artifact draft preflight digest", readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest],
      ["Source signed approval capture artifact preflight digest", readiness.sourceSignedApprovalCaptureArtifactPreflightDigest],
      ["Source signed approval capture preflight digest", readiness.sourceSignedApprovalCapturePreflightDigest],
      ["Source signed approval template digest", readiness.sourceSignedApprovalTemplateDigest],
      ["Source approval packet review digest", readiness.sourceApprovalPacketReviewDigest],
      ["Passed gates", `${readiness.passedGateCount}/${readiness.gateCount}`],
      ["Imports runtime payload", readiness.importsRuntimePayload],
      ["Accepts synthetic evidence", readiness.acceptsSyntheticEvidence],
      ["Contains secret value", readiness.containsSecretValue],
      ["Signed approval capture artifact draft readiness digest", readiness.signedApprovalCaptureArtifactDraftReadinessDigest],
    ],
    trailingNewline: false,
    sections: [
      { heading: "Gates", lines: renderEntries(readiness.gates), bodyLeadingBlankLine: false },
      {
        heading: "Readiness Lanes",
        lines: trimVerificationTrailingBlankLine(readiness.lanes.flatMap(renderLane)),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Readiness Controls",
        lines: trimVerificationTrailingBlankLine(readiness.controls.flatMap(renderControl)),
        bodyLeadingBlankLine: false,
      },
      {
        heading: "Blocked Reasons",
        lines: renderVerificationBlockedReasonLines(readiness.blockedReasonCodes),
        bodyLeadingBlankLine: false,
      },
    ],
  });
}

function renderLane(
  lane:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane,
): string[] {
  return [
    `### ${lane.order}. ${lane.nodeVersion} ${lane.code}`,
    `- Lane name: ${lane.laneName}`,
    `- Kind: ${lane.kind}`,
    `- Lane mode: ${lane.laneMode}`,
    `- Source draft field: ${lane.sourceDraftFieldCode}`,
    `- Source draft field name: ${lane.sourceDraftFieldName}`,
    `- Source draft field ready: ${lane.sourceDraftFieldReady}`,
    `- Source draft field still preflight-only: ${lane.sourceDraftFieldStillPreflightOnly}`,
    `- Source draft guard: ${lane.sourceDraftGuardCode}`,
    `- Source draft guard ready: ${lane.sourceDraftGuardReady}`,
    `- Source draft guard blocks unsigned draft: ${lane.sourceDraftGuardBlocksUnsignedDraft}`,
    `- Source draft guard blocks auto capture: ${lane.sourceDraftGuardBlocksAutoCapture}`,
    `- Required source field: ${lane.requiredSourceFieldName}`,
    `- Required source field covered: ${lane.requiredSourceFieldCovered}`,
    `- Readiness purpose: ${lane.readinessPurpose}`,
    `- Manual draft review required: ${lane.manualDraftReviewRequired}`,
    `- Manual draft materialized: ${lane.manualDraftMaterialized}`,
    `- Ready for manual signed approval draft readiness lane: ${lane.readyForManualSignedApprovalDraftReadinessLane}`,
    `- Ready for signed approval artifact draft: ${lane.readyForSignedApprovalArtifactDraft}`,
    `- Ready for signed approval capture: ${lane.readyForSignedApprovalCapture}`,
    `- Ready for operator value supply: ${lane.readyForOperatorValueSupply}`,
    `- Ready for evidence import: ${lane.readyForEvidenceImport}`,
    `- Ready for runtime payload: ${lane.readyForRuntimePayload}`,
    `- Writes allowed: ${lane.writesAllowed}`,
    `- Starts services: ${lane.startsServices}`,
    `- Mutates sibling state: ${lane.mutatesSiblingState}`,
    "",
  ];
}

function renderControl(
  control:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl,
): string[] {
  return [
    `### ${control.order}. ${control.nodeVersion} ${control.code}`,
    `- Kind: ${control.kind}`,
    `- Source readiness lane: ${control.sourceReadinessLaneCode}`,
    `- Source readiness lane ready: ${control.sourceReadinessLaneReady}`,
    `- Blocker code: ${control.blockerCode}`,
    `- Control text: ${control.controlText}`,
    `- Rejects missing manual draft review: ${control.rejectsMissingManualDraftReview}`,
    `- Blocks auto materialization: ${control.blocksAutoMaterialization}`,
    `- Blocks signed approval capture: ${control.blocksSignedApprovalCapture}`,
    `- Blocks runtime payload: ${control.blocksRuntimePayload}`,
    `- Blocks writes: ${control.blocksWrites}`,
    `- Blocks sibling mutation: ${control.blocksSiblingMutation}`,
    `- Ready for manual signed approval draft readiness control: ${control.readyForManualSignedApprovalDraftReadinessControl}`,
    `- Ready for signed approval artifact draft: ${control.readyForSignedApprovalArtifactDraft}`,
    `- Ready for signed approval capture: ${control.readyForSignedApprovalCapture}`,
    `- Ready for operator value supply: ${control.readyForOperatorValueSupply}`,
    `- Ready for evidence import: ${control.readyForEvidenceImport}`,
    `- Ready for runtime payload: ${control.readyForRuntimePayload}`,
    `- Writes allowed: ${control.writesAllowed}`,
    `- Starts services: ${control.startsServices}`,
    `- Mutates sibling state: ${control.mutatesSiblingState}`,
    "",
  ];
}
