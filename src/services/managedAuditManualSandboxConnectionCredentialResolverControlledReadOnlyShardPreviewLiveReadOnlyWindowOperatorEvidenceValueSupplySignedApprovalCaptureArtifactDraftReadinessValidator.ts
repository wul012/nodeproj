import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessGates(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
  lanes:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane[],
  controls:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessGates {
  const digestLanes = lanes.filter((lane) => lane.laneMode === "digest-pin");

  return {
    sourceArtifactDraftPreflightReady: preflight.readyForSignedApprovalArtifactDraftPreflight,
    readinessLaneCountComplete:
      lanes.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_VERSIONS.length,
    readinessControlCountComplete:
      controls.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_VERSIONS.length,
    laneVersionsSequential: lanes.every((lane, index) =>
      lane.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_VERSIONS[index]),
    controlVersionsSequential: controls.every((control, index) =>
      control.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_VERSIONS[index]),
    sourceDraftFieldsReady: lanes.every((lane) => lane.sourceDraftFieldReady),
    sourceDraftGuardsReady: lanes.every((lane) => lane.sourceDraftGuardReady),
    allLanesReady: lanes.every((lane) => lane.readyForManualSignedApprovalDraftReadinessLane),
    allControlsReady: controls.every((control) => control.readyForManualSignedApprovalDraftReadinessControl),
    allLanePurposesDeclared: lanes.every((lane) => lane.readinessPurpose.length > 0),
    allControlTextsDeclared: controls.every((control) => control.controlText.length > 0),
    allSourceFieldsCovered: lanes.every((lane) => lane.requiredSourceFieldCovered),
    allSourceGuardsCovered: controls.every((control) => control.sourceReadinessLaneReady),
    allDigestBindingsPresent:
      digestLanes.length === 5
      && digestLanes.every((lane) => lane.readyForManualSignedApprovalDraftReadinessLane)
      && DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactPreflightDigest)
      && DIGEST_PATTERN.test(preflight.sourceSignedApprovalCapturePreflightDigest)
      && DIGEST_PATTERN.test(preflight.sourceSignedApprovalTemplateDigest)
      && DIGEST_PATTERN.test(preflight.sourceApprovalPacketReviewDigest),
    sourceDraftPreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.signedApprovalCaptureArtifactDraftPreflightDigest),
    sourceArtifactPreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCaptureArtifactPreflightDigest),
    sourceCapturePreflightDigestPresent:
      DIGEST_PATTERN.test(preflight.sourceSignedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent: DIGEST_PATTERN.test(preflight.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent: DIGEST_PATTERN.test(preflight.sourceApprovalPacketReviewDigest),
    sourcePreflightStillReadinessOnly:
      preflight.readyForSignedApprovalArtifactDraftPreflight
      && preflight.artifactDraftPreflightState === "ready-for-signed-approval-artifact-draft-preflight",
    sourceStillDoesNotCreateDraft:
      !preflight.draftArtifactCreated && preflight.draftArtifactMaterializedCount === 0,
    sourceStillNoSignaturePayload:
      preflight.draftSignaturePayloadCount === 0 && !preflight.containsSecretValue,
    sourceStillNoApprovalGrant: !preflight.approvalGrantPresent,
    sourceStillNoSignedApproval: !preflight.signedApprovalPresent,
    manualDraftReviewAllowedButNotMaterialized:
      preflight.readyForSignedApprovalArtifactDraftPreflight
      && lanes.every((lane) => lane.readyForManualSignedApprovalDraftReadinessLane)
      && lanes.every((lane) => !lane.manualDraftMaterialized),
    signedApprovalDraftStillDisabled:
      !preflight.readyForSignedApprovalArtifactDraft
      && lanes.every((lane) => !lane.readyForSignedApprovalArtifactDraft)
      && controls.every((control) => !control.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !preflight.readyForSignedApprovalCapture
      && lanes.every((lane) => !lane.readyForSignedApprovalCapture)
      && controls.every((control) => !control.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !preflight.readyForOperatorValueSupply
      && lanes.every((lane) => !lane.readyForOperatorValueSupply)
      && controls.every((control) => !control.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !preflight.readyForEvidenceImport
      && lanes.every((lane) => !lane.readyForEvidenceImport)
      && controls.every((control) => !control.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !preflight.readyForRuntimePayload
      && lanes.every((lane) => !lane.readyForRuntimePayload)
      && controls.every((control) => !control.readyForRuntimePayload),
    liveExecutionStillBlocked: !preflight.readyForLiveExecution,
    productionExecutionStillBlocked: !preflight.readyForProductionExecution,
    allLanesReadOnly: lanes.every((lane) => lane.readOnly),
    allControlsReadOnly: controls.every((control) => control.readOnly),
    allControlsBlockMissingManualDraftReview:
      controls.every((control) => control.rejectsMissingManualDraftReview),
    allControlsBlockAutoMaterialization:
      controls.every((control) => control.blocksAutoMaterialization),
    allControlsBlockSignedApprovalCapture:
      controls.every((control) => control.blocksSignedApprovalCapture),
    allControlsBlockRuntimePayload: controls.every((control) => control.blocksRuntimePayload),
    allControlsBlockWrites: controls.every((control) => control.blocksWrites),
    allControlsBlockSiblingMutation: controls.every((control) => control.blocksSiblingMutation),
    noSideEffectsAllowed:
      !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && lanes.every((lane) => !lane.writesAllowed && !lane.startsServices && !lane.mutatesSiblingState)
      && controls.every((control) => !control.writesAllowed && !control.startsServices
        && !control.mutatesSiblingState),
    requiresHumanDraftAuthoring: true,
    requiresDigestRecheckBeforeCapture: true,
    requiresSiblingNonMutationEvidence: true,
    nextStepRequiresManualDraftArtifactPackage: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessBlockedReasons(
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceArtifactDraftPreflightReady, "SOURCE_ARTIFACT_DRAFT_PREFLIGHT_NOT_READY"],
    [gates.readinessLaneCountComplete, "ARTIFACT_DRAFT_READINESS_LANE_COUNT_INCOMPLETE"],
    [gates.readinessControlCountComplete, "ARTIFACT_DRAFT_READINESS_CONTROL_COUNT_INCOMPLETE"],
    [gates.laneVersionsSequential, "ARTIFACT_DRAFT_READINESS_LANE_VERSIONS_NOT_SEQUENTIAL"],
    [gates.controlVersionsSequential, "ARTIFACT_DRAFT_READINESS_CONTROL_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourceDraftFieldsReady, "ARTIFACT_DRAFT_READINESS_SOURCE_FIELDS_NOT_READY"],
    [gates.sourceDraftGuardsReady, "ARTIFACT_DRAFT_READINESS_SOURCE_GUARDS_NOT_READY"],
    [gates.allLanesReady, "ARTIFACT_DRAFT_READINESS_LANES_NOT_READY"],
    [gates.allControlsReady, "ARTIFACT_DRAFT_READINESS_CONTROLS_NOT_READY"],
    [gates.allLanePurposesDeclared, "ARTIFACT_DRAFT_READINESS_LANE_PURPOSES_MISSING"],
    [gates.allControlTextsDeclared, "ARTIFACT_DRAFT_READINESS_CONTROL_TEXTS_MISSING"],
    [gates.allSourceFieldsCovered, "ARTIFACT_DRAFT_READINESS_SOURCE_FIELDS_NOT_COVERED"],
    [gates.allSourceGuardsCovered, "ARTIFACT_DRAFT_READINESS_SOURCE_GUARDS_NOT_COVERED"],
    [gates.allDigestBindingsPresent, "ARTIFACT_DRAFT_READINESS_DIGEST_BINDINGS_MISSING"],
    [gates.sourceDraftPreflightDigestPresent, "ARTIFACT_DRAFT_READINESS_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING"],
    [gates.sourceArtifactPreflightDigestPresent, "ARTIFACT_DRAFT_READINESS_SOURCE_ARTIFACT_DIGEST_MISSING"],
    [gates.sourceCapturePreflightDigestPresent, "ARTIFACT_DRAFT_READINESS_SOURCE_CAPTURE_DIGEST_MISSING"],
    [gates.sourceTemplateDigestPresent, "ARTIFACT_DRAFT_READINESS_SOURCE_TEMPLATE_DIGEST_MISSING"],
    [gates.sourceReviewDigestPresent, "ARTIFACT_DRAFT_READINESS_SOURCE_REVIEW_DIGEST_MISSING"],
    [gates.sourcePreflightStillReadinessOnly, "ARTIFACT_DRAFT_READINESS_SOURCE_NOT_PREFLIGHT_ONLY"],
    [gates.sourceStillDoesNotCreateDraft, "ARTIFACT_DRAFT_READINESS_SOURCE_DRAFT_CREATED"],
    [gates.sourceStillNoSignaturePayload, "ARTIFACT_DRAFT_READINESS_SOURCE_SIGNATURE_PAYLOAD_PRESENT"],
    [gates.sourceStillNoApprovalGrant, "ARTIFACT_DRAFT_READINESS_SOURCE_APPROVAL_GRANT_PRESENT"],
    [gates.sourceStillNoSignedApproval, "ARTIFACT_DRAFT_READINESS_SOURCE_SIGNED_APPROVAL_PRESENT"],
    [gates.manualDraftReviewAllowedButNotMaterialized, "ARTIFACT_DRAFT_READINESS_MANUAL_REVIEW_NOT_READY"],
    [gates.signedApprovalDraftStillDisabled, "ARTIFACT_DRAFT_READINESS_SIGNED_APPROVAL_DRAFT_ENABLED"],
    [gates.signedApprovalCaptureStillDisabled, "ARTIFACT_DRAFT_READINESS_SIGNED_APPROVAL_CAPTURE_ENABLED"],
    [gates.operatorValueSupplyStillDisabled, "ARTIFACT_DRAFT_READINESS_OPERATOR_VALUE_SUPPLY_ENABLED"],
    [gates.evidenceImportStillBlocked, "ARTIFACT_DRAFT_READINESS_EVIDENCE_IMPORT_ENABLED"],
    [gates.runtimePayloadStillBlocked, "ARTIFACT_DRAFT_READINESS_RUNTIME_PAYLOAD_ENABLED"],
    [gates.liveExecutionStillBlocked, "ARTIFACT_DRAFT_READINESS_LIVE_EXECUTION_ENABLED"],
    [gates.productionExecutionStillBlocked, "ARTIFACT_DRAFT_READINESS_PRODUCTION_EXECUTION_ENABLED"],
    [gates.allLanesReadOnly, "ARTIFACT_DRAFT_READINESS_LANE_NOT_READ_ONLY"],
    [gates.allControlsReadOnly, "ARTIFACT_DRAFT_READINESS_CONTROL_NOT_READ_ONLY"],
    [gates.allControlsBlockMissingManualDraftReview, "ARTIFACT_DRAFT_READINESS_MISSING_REVIEW_NOT_BLOCKED"],
    [gates.allControlsBlockAutoMaterialization, "ARTIFACT_DRAFT_READINESS_AUTO_MATERIALIZATION_NOT_BLOCKED"],
    [gates.allControlsBlockSignedApprovalCapture, "ARTIFACT_DRAFT_READINESS_CAPTURE_NOT_BLOCKED"],
    [gates.allControlsBlockRuntimePayload, "ARTIFACT_DRAFT_READINESS_RUNTIME_PAYLOAD_NOT_BLOCKED"],
    [gates.allControlsBlockWrites, "ARTIFACT_DRAFT_READINESS_WRITES_NOT_BLOCKED"],
    [gates.allControlsBlockSiblingMutation, "ARTIFACT_DRAFT_READINESS_SIBLING_MUTATION_NOT_BLOCKED"],
    [gates.noSideEffectsAllowed, "ARTIFACT_DRAFT_READINESS_SIDE_EFFECTS_ALLOWED"],
    [gates.requiresHumanDraftAuthoring, "ARTIFACT_DRAFT_READINESS_HUMAN_AUTHORING_NOT_REQUIRED"],
    [gates.requiresDigestRecheckBeforeCapture, "ARTIFACT_DRAFT_READINESS_DIGEST_RECHECK_NOT_REQUIRED"],
    [gates.requiresSiblingNonMutationEvidence, "ARTIFACT_DRAFT_READINESS_SIBLING_NON_MUTATION_NOT_REQUIRED"],
    [gates.nextStepRequiresManualDraftArtifactPackage, "ARTIFACT_DRAFT_READINESS_NEXT_STEP_NOT_MANUAL_PACKAGE"],
  ]);
}
