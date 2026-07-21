import { resolveShardArtifactState, type ShardArtifactState } from "./shardArtifactState.js";
import { createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControls, createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLanes, } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightBuilder.js";
import { createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightBlockedReasons, createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightGates, } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightValidator.js";
import type { ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight, } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";
import type { ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight, ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl, ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlKind, ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane, ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind, } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";

type SubmissionPreflight = ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight;
type ComparisonLane = ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane;
type AcceptanceControl = ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl;
type ComparisonResult = ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight;

interface ComparisonContext extends ShardArtifactState {
  source: SubmissionPreflight;
  lanes: ComparisonResult["lanes"];
  controls: ComparisonResult["controls"];
  gates: ComparisonResult["gates"];
  blockedReasons: ComparisonResult["blockedReasonCodes"];
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight(
  submissionPreflight: SubmissionPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight {
  const lanes = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLanes(submissionPreflight);
  const controls = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControls(lanes);
  const gates = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightGates(submissionPreflight, lanes, controls);
  const blockedReasonCodes = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightBlockedReasons(gates);
  const state = resolveShardArtifactState(blockedReasonCodes, comparisonDigestInput(submissionPreflight, lanes, controls, gates));
  return comparisonResult({
    source: submissionPreflight,
    lanes,
    controls,
    gates,
    blockedReasons: blockedReasonCodes,
    ...state,
  });
}

function comparisonDigestInput(source: SubmissionPreflight, lanes: ComparisonResult["lanes"], controls: ComparisonResult["controls"], gates: ComparisonResult["gates"]) {
  return {
    signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: "Node v1311",
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: source.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest: source.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest: source.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest: source.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest: source.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest: source.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: source.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: source.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: source.sourceApprovalPacketReviewDigest,
    lanes: lanes.map((lane) => [
      lane.order,
      lane.nodeVersion,
      lane.code,
      lane.kind,
      lane.laneMode,
      lane.sourceSubmissionSlotCode,
      lane.sourceComparisonControlCode,
    ]),
    controls: controls.map((control) => [
      control.order,
      control.nodeVersion,
      control.code,
      control.kind,
      control.sourceComparisonLaneCode,
      control.guardCode,
    ]),
    gates,
  };
}

function comparisonResult(context: ComparisonContext): ComparisonResult {
  const { source, lanes, controls, gates, blockedReasons, ready, digest } = context;
  return {
    signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion: "Node v1311",
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: source.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion,
    artifactDraftTextPackageComparisonPreflightState: ready
      ? "ready-for-signed-approval-artifact-draft-text-package-comparison-preflight"
      : "blocked",
    readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight: ready,
    readyForOfflineSignedApprovalDraftTextPackageComparison: ready,
    readyForManualSignedApprovalDraftTextPackageSubmission: source.readyForManualSignedApprovalDraftTextPackageSubmission,
    readyForOfflineSignedApprovalDraftTextPackageReview: source.readyForOfflineSignedApprovalDraftTextPackageReview,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    comparisonLaneCount: lanes.length,
    acceptanceControlCount: controls.length,
    identityComparisonLaneCount: countLanes(lanes, "identity-comparison-lane"),
    digestBindingComparisonLaneCount: countLanes(lanes, "digest-binding-comparison-lane"),
    signatureEnvelopeComparisonLaneCount: countLanes(lanes, "signature-envelope-comparison-lane"),
    sourceEvidenceComparisonLaneCount: countLanes(lanes, "source-evidence-comparison-lane"),
    valueBindingComparisonLaneCount: countLanes(lanes, "value-binding-comparison-lane"),
    policyComparisonLaneCount: countLanes(lanes, "policy-comparison-lane"),
    executionLockComparisonLaneCount: countLanes(lanes, "execution-lock-comparison-lane"),
    archiveCloseoutComparisonLaneCount: countLanes(lanes, "archive-closeout-comparison-lane"),
    digestModeComparisonLaneCount: lanes.filter((lane) => lane.laneMode === "digest-recheck-lane").length,
    readyComparisonLaneCount: lanes.filter((lane) => lane.readyForOfflineSignedApprovalDraftTextPackageComparisonLane).length,
    readyAcceptanceControlCount: controls.filter((control) => control.readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl).length,
    digestBindingAcceptanceControlCount: countControls(controls, "digest-binding-acceptance-control"),
    signatureEnvelopeAcceptanceControlCount: countControls(controls, "signature-envelope-acceptance-control"),
    policyAcceptanceControlCount: countControls(controls, "policy-acceptance-control"),
    executionLockAcceptanceControlCount: countControls(controls, "execution-lock-acceptance-control"),
    archiveCloseoutAcceptanceControlCount: countControls(controls, "archive-closeout-acceptance-control"),
    expectedDraftTextPackageComparisonLaneCount: lanes.length,
    actualDraftTextPackageComparisonCount: 0,
    submittedDraftTextPackageCount: 0,
    comparedDraftTextPackageCount: 0,
    acceptedDraftTextPackageCount: 0,
    rejectedDraftTextPackageCount: 0,
    signedDraftTextCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest: source.signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest: source.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest: source.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest: source.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest: source.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: source.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: source.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: source.sourceApprovalPacketReviewDigest,
    lanes,
    controls,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes: blockedReasons,
    signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest: digest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countLanes(lanes: readonly ComparisonLane[], kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind): number {
  return lanes.filter((lane) => lane.kind === kind).length;
}

function countControls(controls: readonly AcceptanceControl[], kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlKind): number {
  return controls.filter((control) => control.kind === kind).length;
}
