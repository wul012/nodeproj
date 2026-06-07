import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControls,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLanes,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness {
  const lanes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLanes(
      preflight,
    );
  const controls =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControls(
      lanes,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessGates(
      preflight,
      lanes,
      controls,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftReadiness = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftReadinessDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftReadinessVersion: "Node v1136",
    sourceSignedApprovalCaptureArtifactDraftPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: preflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: preflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: preflight.sourceApprovalPacketReviewDigest,
    lanes: lanes.map((lane) => [
      lane.order,
      lane.nodeVersion,
      lane.code,
      lane.kind,
      lane.laneMode,
      lane.sourceDraftFieldCode,
      lane.sourceDraftGuardCode,
      lane.requiredSourceFieldName,
    ]),
    controls: controls.map((control) => [
      control.order,
      control.nodeVersion,
      control.code,
      control.kind,
      control.sourceReadinessLaneCode,
      control.blockerCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftReadinessVersion: "Node v1136",
    sourceSignedApprovalCaptureArtifactDraftPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftPreflightVersion,
    artifactDraftReadinessState: readyForSignedApprovalArtifactDraftReadiness
      ? "ready-for-signed-approval-artifact-draft-readiness"
      : "blocked",
    readyForSignedApprovalArtifactDraftReadiness,
    readyForManualSignedApprovalDraftReview: readyForSignedApprovalArtifactDraftReadiness,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    readinessLaneCount: lanes.length,
    readinessControlCount: controls.length,
    identityReadinessLaneCount: countLanes(lanes, "identity-readiness-lane"),
    digestBindingReadinessLaneCount: countLanes(lanes, "digest-binding-readiness-lane"),
    signatureEnvelopeReadinessLaneCount: countLanes(lanes, "signature-envelope-readiness-lane"),
    sourceEvidenceReadinessLaneCount: countLanes(lanes, "source-evidence-readiness-lane"),
    valueBindingReadinessLaneCount: countLanes(lanes, "value-binding-readiness-lane"),
    policyReadinessLaneCount: countLanes(lanes, "policy-readiness-lane"),
    executionLockReadinessLaneCount: countLanes(lanes, "execution-lock-readiness-lane"),
    archiveCloseoutReadinessLaneCount: countLanes(lanes, "archive-closeout-readiness-lane"),
    readyReadinessLaneCount:
      lanes.filter((lane) => lane.readyForManualSignedApprovalDraftReadinessLane).length,
    readyReadinessControlCount:
      controls.filter((control) => control.readyForManualSignedApprovalDraftReadinessControl).length,
    digestBindingReadinessControlCount: countControls(controls, "digest-binding-readiness-control"),
    signatureEnvelopeReadinessControlCount: countControls(controls, "signature-envelope-readiness-control"),
    policyReadinessControlCount: countControls(controls, "policy-readiness-control"),
    executionLockReadinessControlCount: countControls(controls, "execution-lock-readiness-control"),
    archiveCloseoutReadinessControlCount: countControls(controls, "archive-closeout-readiness-control"),
    manualDraftMaterializedCount: 0,
    draftArtifactCreated: false,
    draftArtifactMaterializedCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: preflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: preflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: preflight.sourceApprovalPacketReviewDigest,
    lanes,
    controls,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftReadinessDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countLanes(
  lanes:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneKind,
): number {
  return lanes.filter((lane) => lane.kind === kind).length;
}

function countControls(
  controls:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlKind,
): number {
  return controls.filter((control) => control.kind === kind).length;
}
