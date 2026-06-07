import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_CONTROLS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControlCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_LANES,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLaneCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLanes(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane[] {
  const fieldsByCode = new Map(preflight.fields.map((field) => [field.code, field]));
  const guardsByCode = new Map(preflight.guards.map((guard) => [guard.code, guard]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_LANES
    .map((laneTemplate, index) => {
      const sourceField = fieldsByCode.get(laneTemplate.sourceDraftFieldCode);
      const sourceGuard = guardsByCode.get(laneTemplate.sourceDraftGuardCode);
      const sourceDraftFieldReady =
        preflight.readyForSignedApprovalArtifactDraftPreflight
        && (sourceField?.readyForSignedApprovalArtifactDraftPreflightField ?? false);
      const sourceDraftFieldStillPreflightOnly =
        sourceField !== undefined
        && !sourceField.readyForSignedApprovalArtifactDraft
        && !sourceField.draftArtifactCreated
        && !sourceField.draftSignaturePayloadPresent;
      const sourceDraftGuardReady =
        preflight.readyForSignedApprovalArtifactDraftPreflight
        && (sourceGuard?.readyForSignedApprovalArtifactDraftPreflightGuard ?? false);
      const sourceDraftGuardBlocksUnsignedDraft = sourceGuard?.blocksUnsignedDraft ?? false;
      const sourceDraftGuardBlocksAutoCapture = sourceGuard?.blocksAutoCapture ?? false;
      const requiredSourceFieldCovered = sourceField?.fieldName === laneTemplate.requiredSourceFieldName;
      const readyForManualSignedApprovalDraftReadinessLane =
        sourceDraftFieldReady
        && sourceDraftFieldStillPreflightOnly
        && sourceDraftGuardReady
        && sourceDraftGuardBlocksUnsignedDraft
        && sourceDraftGuardBlocksAutoCapture
        && requiredSourceFieldCovered
        && laneTemplate.readinessPurpose.length > 0;

      return {
        order: index + 1,
        nodeVersion: laneTemplate.nodeVersion,
        code: laneTemplate.code,
        laneName: laneTemplate.laneName,
        kind: laneTemplate.kind,
        laneMode: laneTemplate.laneMode,
        sourceDraftFieldCode: laneTemplate.sourceDraftFieldCode,
        sourceDraftFieldName: sourceField?.fieldName ?? "",
        sourceDraftFieldReady,
        sourceDraftFieldStillPreflightOnly,
        sourceDraftGuardCode: laneTemplate.sourceDraftGuardCode,
        sourceDraftGuardReady,
        sourceDraftGuardBlocksUnsignedDraft,
        sourceDraftGuardBlocksAutoCapture,
        requiredSourceFieldName: laneTemplate.requiredSourceFieldName,
        requiredSourceFieldCovered,
        readinessPurpose: laneTemplate.readinessPurpose,
        manualDraftReviewRequired: true,
        manualDraftMaterialized: false,
        readyForManualSignedApprovalDraftReadinessLane,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControls(
  lanes:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessLane[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessControl[] {
  const lanesByCode = new Map(lanes.map((lane) => [lane.code, lane]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_CONTROLS
    .map((controlTemplate, index) => {
      const sourceLane = lanesByCode.get(controlTemplate.sourceReadinessLaneCode);
      const sourceReadinessLaneReady =
        sourceLane?.readyForManualSignedApprovalDraftReadinessLane ?? false;
      const rejectsMissingManualDraftReview =
        controlTemplate.blockerCode.startsWith("REJECT_DRAFT_READINESS_")
        && controlTemplate.controlText.startsWith("Block draft readiness");
      const readyForManualSignedApprovalDraftReadinessControl =
        sourceReadinessLaneReady
        && rejectsMissingManualDraftReview
        && controlTemplate.controlText.length > 0;

      return {
        order: index + 1,
        nodeVersion: controlTemplate.nodeVersion,
        code: controlTemplate.code,
        kind: controlTemplate.kind,
        sourceReadinessLaneCode: controlTemplate.sourceReadinessLaneCode,
        sourceReadinessLaneReady,
        blockerCode: controlTemplate.blockerCode,
        controlText: controlTemplate.controlText,
        rejectsMissingManualDraftReview,
        blocksAutoMaterialization: true,
        blocksSignedApprovalCapture: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForManualSignedApprovalDraftReadinessControl,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
